import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../Profile';
import Home from '../Home';
import TutorialScreens from './TutorialScreens';
import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const Setting = () => {
  const navigation = useNavigation();
  return (
      <Drawer.Navigator screenOptions={{
        drawerType:"front",
        activeTintColor: 'red',
       }}
       initialRouteName="Home" >
        <Drawer.Screen  name="Home" component={Home} options={{title:'Home' ,headerShown:false}}/>
        <Drawer.Screen name="Account" component={Profile} options={{title:'Account',headerShown:false}}/>
        <Drawer.Screen name="Help and Support" component={TutorialScreens} options={{title:'Help and Support' ,headerShown:false}}/>
      </Drawer.Navigator>
  );
};
export default Setting;