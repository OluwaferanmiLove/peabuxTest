import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@screens/home/Home';
import {colors} from '@theme/colors';
import AddPills from '@screens/addPill/AddPill';

const Stack = createStackNavigator();

const BaseApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.mainBg},
        }}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'AddPills'} component={AddPills} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BaseApp;
