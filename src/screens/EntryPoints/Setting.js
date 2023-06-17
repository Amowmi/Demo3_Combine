import * as React from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Profile from '../Profile';
import Home from '../Home';
import TutorialScreens from './TutorialScreens';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import SettingContent from './SettingContent';

const Drawer = createDrawerNavigator();


const Setting = () => {
  const navigation = useNavigation();

  return (
      <Drawer.Navigator screenOptions={{
        drawerType:"front",
        activeTintColor: 'red',
       }}
       drawerContent={(props) => <SettingContent {...props} />} >
        <Drawer.Screen  name="Home" component={Home} options={{title:'Home' ,headerShown:false}}/>
        <Drawer.Screen name="Account" component={Profile} options={{title:'Account',headerShown:false}}/>
        <Drawer.Screen name="Help and Support" component={TutorialScreens} options={{title:'Help and Support' ,headerShown:false}} />
      </Drawer.Navigator>
  );
};
export default Setting;