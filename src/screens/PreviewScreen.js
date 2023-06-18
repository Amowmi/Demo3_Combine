import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Button, Modal, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import React, { useState ,useEffect} from 'react';

import Card from '../components/Preview/Card';
import PreviewHeader from '../components/Preview/PreviewHeader';
import { PaperProvider } from 'react-native-paper';
import { Pressable } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPreviewMode, addImageToFolder, checkFolderEmpty, updateRecently,readstoredPreview } from '../actions/Actions'
import { useSelector } from 'react-redux';

import Dialog from 'react-native-dialog';
//import Dialog from 'react-native-paper';
import Icon_Button from '../components/Edit/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PreviewScreen(){
  const [appState, setAppState] = useState(AppState.currentState);
  const dispatch = useDispatch();
  
  // Call the function to store data
  const PREVIEW = useSelector(state => state.Preview);

useEffect(() => {
  
  
  // try{
  //   AsyncStorage.setItem(
  //       'previews',
  //       JSON.stringify(PREVIEW))
  //  }catch(error){}
  async function storeDataInStorage() {
    try {
      await AsyncStorage.setItem('previews',  JSON.stringify(PREVIEW));
      console.log('Data stored successfully');
      console.log(JSON.stringify(PREVIEW));
    } catch (error) {
      // Handle errors, if any
      console.log('Error storing data:', error);
    }
  }
    // 监听 AppState 的状态变化
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App 从后台或非活动状态切换到活动状态
        // 在这里保存数据到 async storage
        storeDataInStorage();
      } else if (nextAppState === 'background') {
        // App 进入后台状态
        // 在这里保存数据到 async storage
        storeDataInStorage();
      }
      setAppState(nextAppState);
    };
  
    // 添加 AppState 变化事件监听
    AppState.addEventListener('change', handleAppStateChange);
  
    // 清除事件监听器

  }, [appState]);

  //for store
  useEffect(() => {
    const storedpreviews = async () => {
      try {
        const data = await AsyncStorage.getItem('previews');
        // Handle the retrieved data
        if (data) {
          // Data exists in async storage
          console.log('Retrieved data:', data);
             dispatch(readstoredPreview(JSON.parse(data)));
          // Further processing or updating state, if needed

        } else {
          // Data doesn't exist in async storage
          console.log('No data found in async storage');
        }
      } catch (error) {
        // Handle errors, if any
        console.log('Error retrieving data:', error);
      }
    };

    // Call the function to retrieve data during component mount
    storedpreviews();
  }, []);
  const currentFolder = useSelector(state => state.Folder.currentFolder);
  console.log('go in preview, currentFolder :', currentFolder);
  const CARD = useSelector(state => state.Preview.previewList[currentFolder]);
  



  const {isDarkMode,previewMode} = useSelector(state => state.Mode);
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const OnSelectPress = () =>{
    setIsOpen(!isOpen);
  };
  const onOriginalPress = () => {
    setIsOpen(!isOpen);
    dispatch(setPreviewMode('Original'));
  };
  const onHomePress = () => {
    setIsOpen(!isOpen);
    dispatch(setPreviewMode('Home'))
  };
  const onLockPress = () => {
    setIsOpen(!isOpen);
    dispatch(setPreviewMode('Lock'))
  };

  const navigateHandler_edit = () => {
    navigation.navigate('EditingScreen');
  };
  const navigateHandler_back = () => {
    navigation.navigate(' '); //Go to Folder
  };


  // const CARD = [{cardIndex : '0', cardURL : 'https://i.pinimg.com/564x/89/5c/8c/895c8cb5f0c7fa326169d0ce51759b46.jpg'},
  //               {cardIndex : '1', cardURL : 'https://i.pinimg.com/564x/bd/45/26/bd452671542fdcee8ae641a7be5c5cb1.jpg'},
  //               {cardIndex : '2', cardURL : 'https://i.pinimg.com/564x/f3/6d/6d/f36d6d18240ccae47ad3932c9935ea2d.jpg'},
  //               {cardIndex : '3', cardURL : 'https://i.pinimg.com/564x/5c/17/50/5c175030707be929f1bb79d032725da6.jpg'},
  //               {cardIndex : '4', cardURL : 'https://i.pinimg.com/564x/f1/50/f6/f150f6e236de0506f009be91f1896013.jpg'},
  //               {cardIndex : '5', cardURL : 'https://i.pinimg.com/564x/78/1c/45/781c4575dfd4c2781c3ff4c38d7418a8.jpg'},
  //               {cardIndex : '6', cardURL : 'https://i.pinimg.com/564x/83/ee/85/83ee85e48293da7db203cb336a34e061.jpg'},
  //               {cardIndex : '7', cardURL : 'https://i.pinimg.com/564x/4b/58/f3/4b58f34182fdabf1e38f660d0ba20498.jpg'}];
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleDialogVisibilityChange = (visible) => {
    setDialogVisible(visible);
  };
  const ID = currentFolder;
  const addCardHandler = () => { //
    handleDialogVisibilityChange(false);
    dispatch(checkFolderEmpty(ID, inputText));
    dispatch(addImageToFolder(ID, inputText));

    setInputText('');
  };
  
  const showPlusDialog = () => {
    handleDialogVisibilityChange(true);
  };
  
  const hidePlusDialog = () => {
    handleDialogVisibilityChange(false);
    setInputText('');
  };

  const handleInputChange = (text) => {
    setInputText(text);
  };

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
      <View style = {[styles.container,isDarkMode ? GlobalStyle.Surface_dark : GlobalStyle.Surface_light]}>
        <PreviewHeader PressHandler_select={OnSelectPress} PressHandler_back={navigateHandler_back} />
        <SafeAreaView style = {[styles.scrollView,isDarkMode ? GlobalStyle.Surface_dark : GlobalStyle.Surface_light]}>

          <FlatList 
            keyExtractor={(item,cardURL)=>cardURL}
            data={CARD} numColumns={2}  
            columnWrapperStyle={{justifyContent:'space-between', paddingHorizontal:20}}
            renderItem={({item}) => <Pressable style={{flex: 1}}><Card URL={item.URL} loved={item.loved} folder={currentFolder} date={item.date} style={{flex: 0.5}}/></Pressable> } />
        </SafeAreaView>
        {currentFolder===0?null:<View style={styles.plus}>
              <Icon_Button
              onPressFunction={showPlusDialog}
              iconColor={'#8569F6'}
              iconChoice={'plus'}
              />
              <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Add your image link:</Dialog.Title>
                <Dialog.Input value={inputText} onChangeText={handleInputChange} />
                <Dialog.Button label="Cancel" onPress={hidePlusDialog} />
                <Dialog.Button label="Add" onPress={addCardHandler} />
              </Dialog.Container>
            </View>}
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
      width: '100%',
      height: '100%'
    },
    modal2:{ // Modal Background
      flex:1,
      width: '100%',
      height: 200,
      alignItems:'center',
      backgroundColor:'#888888',
      opacity:0.9
    },
    modal:{ // Modal
      opacity:1,
      width:'100%',
      height:180,
      justifyContent:'center',
      backgroundColor:'#fff',
      alignItems:'center',
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
    plus: {
      justifyContent:'center',
      alignItems:'center',
      height:60,
    },
    
  });
  