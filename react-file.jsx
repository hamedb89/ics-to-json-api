import React, { useEffect, useState } from "react";
import { Text, View, SectionList } from "react-native";
import moment from "moment";

export default function App() {
  const [hamed, setHamed] = useState([]);
  const [maria, setMaria] = useState([]);

  // Accepts the array and key
  const groupBy = (array, key) => {
  
      // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  const getHamedsTraining = async () => {
    try {
      const response = await fetch(
        "https://main--spontaneous-tarsier-5131b3.netlify.app/.netlify/functions/server/api/YLEJMHQOU5GCO.ics"
      );
      const json = await response.json();
      const events = json.events.map( event => {
        event.athlete_name = 'Hamed';
        return event;
      } )
      setHamed(events);

    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const getMariasTraining = async () => {
    try {
      const response = await fetch(
        "https://main--spontaneous-tarsier-5131b3.netlify.app/.netlify/functions/server/api/5F4ZHOGCDB3NG.ics"
      );
      const json = await response.json();
      const events = json.events.map(event => {
        event.athlete_name = 'Maria';
        return event;
      });
      setMaria(events);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    getMariasTraining();
    getHamedsTraining();
  }, []);

  let sections = [{title: '', data: []}];
  const data = hamed.concat(maria).sort((a, b) => {
    return moment(a.dtstart.value).format('YYYYMMDD') > moment(b.dtstart.value).format('YYYYMMDD') ? 1 : -1;
  }).map(item => {
    item.date = item.dtstart.value
    return item;
  });

  const grouped = groupBy(data, 'date');
  
  sections = Object.entries(grouped).map(([key, value]) => {
    // Pretty straightforward - use key for the key and value for the value.
    // Just to clarify: unlike object destructuring, the parameter names don't matter here.
    grouped[key].title = key;
    return {title: key, data: value};
  });

  return (
    <View>
      <SectionList
        sections={sections}
        renderSectionHeader={ 
          ({ section : { title }}) => (<Text>{moment(title).format("DD.MM.YYYY")}</Text>) 
        }
        renderItem={({ item }) => (
          <Text>
            {item.athlete_name} {moment(item.dtstart.value).format("DD.MM.YYYY")} {item.summary},{" "}
          </Text>
        )}
        keyExtractor={(item, index) => item.uid + index}
      />
    </View>
  );
}
