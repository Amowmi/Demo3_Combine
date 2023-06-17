import { View } from 'react-native';
import React, { useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import FolderPage from '../FolderPage';
import PreviewScreen from '../PreviewScreen';
import EditingScreen from '../EditingScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';




Stack = createStackNavigator();
export default function FolderBox() {
  const navigation = useNavigation();
  onPressHandler_Download = () =>{

  };
  return (
    <PaperProvider>
        <Stack.Navigator  initialRouteName=" ">
          <Stack.Screen name=" " component={FolderPage} options={{headerShown: false,}}/>
          <Stack.Screen name='PreviewScreen' component={PreviewScreen} options={{headerShown: false}}/>
          <Stack.Screen name='EditingScreen' component={EditingScreen} options={{ title: '...', headerShown:false,}}/>
        </Stack.Navigator>
    </PaperProvider>
  );
}