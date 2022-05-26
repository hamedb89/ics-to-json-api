import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from 'moment';

const FriendsData = {
  friends: [
      { name: "Hamed", ics: "YLEJMHQOU5GCO.ics" },
    { name: "Maria", ics: "5F4ZHOGCDB3NG.ics" }
    ]
};

function FriendsScreen() {
  const data = FriendsData;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={data.friends}
        renderItem={({ item, index, separators }) => (
          <Text>{item.name}</Text>
        )}
        />
    </View>
  );
}

function TimelineScreen() {
  const [data, setData] = useState([]);

  const getTrainings = async () => {
      const response = await fetch("https://main--spontaneous-tarsier-5131b3.netlify.app/.netlify/functions/server/api", {
        method: 'POST',
        body: JSON.stringify(FriendsData),
        headers: {
          'content-type': 'application/json'
        }
      });
      const json = await response.json();
      
      setData(json);

  };

  useEffect(() => {
    getTrainings();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text>{item.friend.name} {moment(item.dtstart.value).format('DD.MM.YYYY')} {item.summary}</Text>
        )} />
    </View> 
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Timeline" component={TimelineScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}