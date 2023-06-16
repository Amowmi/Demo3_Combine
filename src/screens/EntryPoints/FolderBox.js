import { View } from 'react-native';
import React, { useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import FolderPage from '../FolderPage';
import PreviewScreen from '../PreviewScreen';
import Medium_Buttons from '../../components/Edit/CustomButton';
import Edit_Header from '../../components/Edit/backButton';
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
        <Stack.Navigator  initialRouteName="FolderPage">
          <Stack.Screen name="FolderPage" component={FolderPage} options={{headerShown: true,}}/>
          <Stack.Screen name='PreviewScreen' component={PreviewScreen} options={{headerShown: false}}/>
          <Stack.Screen
            name='EditingScreen'
            component={EditingScreen}
            options={({navigation}) => ({ 
              title: '...', 
              headerStyle: {height: 70, borderColor: '#fff'},
              headerLeft: () => (
              <View style={{ marginRight: -10, marginLeft: 3 }}>
                <Edit_Header  onPress={() => 
                  navigation.navigate('PreviewScreen')}/* Back Button */  />  
                
              </View>
              ),
              headerRight: () => (
                <View style={{ marginRight: 20, marginLeft: -10 }}>
                  <Medium_Buttons  // Download Button
                  onPressFunction={onPressHandler_Download}
                  labelArray={{fontSize: 8, flex: -1, lineHeight: 22, marginHorizontal: 0, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0}}
                  title={'Download'}
                  styleArray={{height: 23, width: 60}}
                />
                </View>
              )
            })}
          />

        </Stack.Navigator>
    </PaperProvider>
  );
}