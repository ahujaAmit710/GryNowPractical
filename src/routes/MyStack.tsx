import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ViewDetails from '../screens/ViewDetails';
import { RouteType } from './RouteType';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName={RouteType.HOME_SCREEN}>
        <Stack.Screen name={RouteType.HOME_SCREEN}component={HomeScreen}/>
        <Stack.Screen name={RouteType.VIEW_DETAILS} component={ViewDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack