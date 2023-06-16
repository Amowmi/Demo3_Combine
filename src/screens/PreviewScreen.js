import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Button, Modal, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import React, { useState } from 'react';

import Card from '../components/Preview/Card';
import PreviewHeader from '../components/Preview/PreviewHeader';
import { PaperProvider } from 'react-native-paper';
import { Pressable } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';

export default function PreviewScreen(){
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('Home');
  const OnSelectPress = () =>{
    setIsOpen(!isOpen);
  };
  const onOriginalPress = () => {
    setIsOpen(!isOpen);
    setMode('Original');
  };
  const onHomePress = () => {
    setIsOpen(!isOpen);
    setMode('Home');
  };
  const onLockPress = () => {
    setIsOpen(!isOpen);
    setMode('Lock');
  };

  const navigateHandler_edit = () => {
    navigation.navigate('EditingScreen');
  };
  const navigateHandler_back = () => {
    navigation.navigate('FolderPage');
  };


  const CARD = [{cardIndex : '0', cardURL : 'https://i.pinimg.com/564x/89/5c/8c/895c8cb5f0c7fa326169d0ce51759b46.jpg'},
                {cardIndex : '1', cardURL : 'https://i.pinimg.com/564x/bd/45/26/bd452671542fdcee8ae641a7be5c5cb1.jpg'},
                {cardIndex : '2', cardURL : 'https://i.pinimg.com/564x/f3/6d/6d/f36d6d18240ccae47ad3932c9935ea2d.jpg'},
                {cardIndex : '3', cardURL : 'https://i.pinimg.com/564x/5c/17/50/5c175030707be929f1bb79d032725da6.jpg'},
                {cardIndex : '4', cardURL : 'https://i.pinimg.com/564x/f1/50/f6/f150f6e236de0506f009be91f1896013.jpg'},
                {cardIndex : '5', cardURL : 'https://i.pinimg.com/564x/78/1c/45/781c4575dfd4c2781c3ff4c38d7418a8.jpg'},
                {cardIndex : '6', cardURL : 'https://i.pinimg.com/564x/83/ee/85/83ee85e48293da7db203cb336a34e061.jpg'},
                {cardIndex : '7', cardURL : 'https://i.pinimg.com/564x/4b/58/f3/4b58f34182fdabf1e38f660d0ba20498.jpg'}];

    return(
      <View style={{height: '100%'}}>
            <Modal transparent visible={isOpen}  >
        <Pressable  onPress={OnSelectPress} style={styles.modal2}>
          <View style={styles.modal}>
              <Text style={[styles.title, GlobalStyle.Primary_Linear_p_font]}>Select Mode</Text>
              <View style={styles.madalbutton}>
                <TouchableHighlight onPress={onOriginalPress} style={[styles.button,GlobalStyle.Primary_Linear_p]}>
                  <Text style={styles.buttonfont}>Original</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={onHomePress} style={[styles.button,GlobalStyle.Primary_Linear_p]}>
                  <Text style={styles.buttonfont}>HomeScreen</Text>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={onLockPress} style={[styles.button,GlobalStyle.Primary_Linear_p]}>
                  <Text style={styles.buttonfont}>LockScreen</Text>
                 </TouchableHighlight>
              </View>
            </View>
        </Pressable>

      </Modal>
      <View style={styles.container}>
        <PreviewHeader PressHandler_select={OnSelectPress} PressHandler_back={navigateHandler_back} Mode={mode} />
        <SafeAreaView style={styles.scrollView}>
          <Pressable  /* Temporary Button to Edit */ 
            onPress={navigateHandler_edit}
            style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
            ><Text>
            Go to Edit Screen
            </Text>
          </Pressable>
          <FlatList data={CARD} numColumns={2} key={'_'} ListFooterComponent={() => <Button title='ADD'></Button>}
                    renderItem={({item}) => <Card Mode={mode} URL={item.cardURL}/>} />
          
        </SafeAreaView>
      </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    },
    text: {
      alignContent: 'center'
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%',
      height: '100%'
    },
    modal2:{ // Modal Background
      flex:1,
      width: '100%',
      alignItems:'center',
      backgroundColor:'#888888',
      opacity:0.9
    },
    modal:{ // Modal
      opacity:1,
      width:'100%',
      height:180,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFFFFF',
    },
    title:{
      fontWeight: 'bold',
      fontSize:23,
      paddingTop: 40
    },
    button:{
      justifyContent: 'center',
      height: 30,
      width: '27%',
      alignItems: 'center',
      margin: 7,
      borderRadius: 20,
    },
    madalbutton:{
      flexDirection: 'row',
      margin:10
    },
    buttonfont: {
      color: '#ffffff'
    },
    
  });
  