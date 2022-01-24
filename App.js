import * as React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer, createNavigationContainerRef  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';



const navigationRef = createNavigationContainerRef()

function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={Tab1} />
      <Tab.Screen name="Tab2" initialParams={{ itemId: 100 }} component={Tab2} />
    </Tab.Navigator>
  );
}

function Tab1 ({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }} >{itemId}</Text>
      <Button onPress={() => navigation.navigate('Tab2', {
          itemId: otherParam,
        })} title="Tell me..." />
    </SafeAreaView>
  );
}


function Tab2({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }} >{itemId}</Text>
      <Button onPress={() => navigation.navigate('Tab1')} title="LoL..." />
    </View>
  );
}

const Tab = createBottomTabNavigator();

const navOptionHandler = () =>( {
  headerShown: false
})

const Stack = createNativeStackNavigator();

function Tab1Stack() {
  return (
    <Stack.Navigator initialRouteName='Tab1'>
      <Stack.Screen name='Home' initialParams={{ itemId: 'Please click Show Me a Joke in the Drawer...' }} component={Tab1} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

function Tab2Stack() {
  return (
    <Stack.Navigator initialRouteName='Screen'>
      <Stack.Screen name='Sceen' component={Tab2} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

function TabNavigator (){
  return (
    <Tab.Navigator>
        <Tab.Screen name="Tab1" component={Tab1Stack} />
        <Tab.Screen name="Tab2" component={Tab2Stack} />
    </Tab.Navigator>
  )
}

const getDataUsingGet = (navigation) => {
  //GET request
  fetch('https://v2.jokeapi.dev/joke/Any?safe-mode', {
    method: 'GET',
    //Request Type
  })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      //Success
      console.log(responseJson);
      setupVal = responseJson['setup']? responseJson['setup']:responseJson['joke']
      deliveryVal = responseJson['delivery']? responseJson['delivery']:responseJson['joke']
      console.log('SetupVal:: ' + setupVal);
      navigation.navigate('Tab1', {
        itemId: setupVal,
        otherParam: deliveryVal,
      });
      //console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      //Error
      alert(JSON.stringify(error));
      console.error(error);
    });
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Show me a Joke" drawerContent={props => {
          return (
          <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Show me a Joke" onPress={() => getDataUsingGet(props.navigation)} />
          </DrawerContentScrollView>
          )
        }}>
        <Drawer.Screen name="MenuTab" component={TabNavigator} options={navOptionHandler} /> 
          <Stack.Group screenOptions={{ presentation: 'Tab1' }}>
            <Stack.Screen name="Tab1" initialParams={{ itemId: 100 }} component={Tab1} />
            <Stack.Screen name="Tab2" initialParams={{ itemId: 100 }} component={Tab2} />
          </Stack.Group> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


