
import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View ,Pressable,SafeAreaView,FlatList,Modal,TouchableHighlight,TextInput, Alert} from 'react-native';
import  ItemList from '../components/ItemList';
import GlobalStyle from '../utils/GlobalStyle'
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import { setUserName,setCurFolder,setUserFolder,readstoredFolder } from '../actions/Actions';
import { addFolder, pushPreviewList } from '../actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

import BackButton from '../components/Edit/backButton';


// const DATA = [
//     {id:3},{id:4},{id:5},{id:0}
//   ];



const divdeToList = (folderList)=>{
    var DividedList = [];
    var len =  folderList.length; 

    var listnums = (len-len%6)/6;
    var listremain = len % 6;
    for(var i = 0; i < listnums; i++){
        var temp = [];
        for (var j = 0; j < 6; j++){
            temp.push(folderList[i*6+j]);
        }
        DividedList.push(temp)
    }
    if(listremain){
        var temp2 = [];
        for(var i=0;i<listremain;i++){
            temp2.push(folderList[listnums*6+i]);
        }
        temp2.push({id: -1,});
        DividedList.push(temp2);
    }
    else{
        DividedList.push([{id: -1,}]);
    }
    return DividedList;
}




const FolderPage   = ()=>{
    const [appState, setAppState] = useState(AppState.currentState);
    const dispatch = useDispatch();
    const FOLDER = useSelector(state => state.Folder);

      
      // Call the function to store data
      

    useEffect(() => {
        console.log('go store\n');
        async function storeDataInStorage() {
            try {
              await AsyncStorage.setItem('folder',  JSON.stringify(FOLDER));
              console.log('Data stored successfully');
              console.log('folderdata');
              console.log(JSON.stringify(FOLDER));
            } catch (error) {
              // Handle errors, if any
              console.log('Error storing data:', error);
            }
        }
        console.log('go store hahahaha\n');
        // 监听 AppState 的状态变化
        const handleAppStateChange = (nextAppState) => {
          if (appState.match(/inactive|background/) && nextAppState === 'active') {
            // App 从后台或非活动状态切换到活动状态
            // 在这里保存数据到 async storage
            storeDataInStorage();
          } else if (nextAppState === 'background') {
            console.log('inbackground\n');
            // App 进入后台状态
            // 在这里保存数据到 async storage
            storeDataInStorage();
          }
          setAppState(nextAppState);
        };
        console.log('write here\n');
      
        // 添加 AppState 变化事件监听
        AppState.addEventListener('change', handleAppStateChange);
        console.log('dfosfosos\n');
        // 清除事件监听器
        // return () => {
        //   AppState.removeEventListener('change', handleAppStateChange);
        // };
      }, [appState]);

    useEffect(() => {
        const storedfolders = async () => {
        try {
            const data = await AsyncStorage.getItem('folder');
            // Handle the retrieved data
            if (data) {
            // Data exists in async storage
            console.log('Retrieved data:', data);
                dispatch(readstoredFolder(JSON.parse(data)));
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
        storedfolders();
    }, []);
    //const dispatch = useDispatch();

    
    const folderList = useSelector(state => state.Folder.folderList);
    
    const {isDarkMode,previewMode} = useSelector(state => state.Mode);
    const DATA = divdeToList(folderList);
    const [inputText, setInputText] = useState('');

    const navigation = useNavigation();
    const PressHandler_back = () =>{
        navigation.getParent().navigate('Setting');
    };

    const [showAlert, setShowAlert] = useState(false);


    const showToast = () => {
        if(inputText){
            OnAddPress();
            Alert.alert('Folder Created!');
        }
        else{
            Alert.alert('Please enter Folder name');
        }
      }
    const [isOpen, setIsOpen] = useState(false);

    const OnAddPress = ()=>{
        dispatch(addFolder(inputText));
        dispatch(pushPreviewList());
        dispatch(setUserFolder(folderList));
        setIsOpen(!isOpen);
        setInputText('');
        

    }

    const OnCancelPress = ()=>{
        setIsOpen(!isOpen);
        setInputText('');
    }

    const handleInputChange = (text) => {
        setInputText(text);
      };


    

    return(
        <View style={{height: '100%', width: '100%'}}>
            <View style={styles.header}>
                    <View style={{height: 45}}></View>
                    <BackButton onPress={PressHandler_back}/>
                </View>
            <View style={[styles.all,isDarkMode ? GlobalStyle.Surface_dark : GlobalStyle.Surface_light]}>
                <Modal transparent visible={isOpen}  >
                    <Pressable  onPress={OnAddPress} style={styles.modal2}>
                        <View style={styles.modal}>
                            <Text style={[styles.title, GlobalStyle.Primary_Linear_p_font]}>Create Folder</Text>
                            <TouchableHighlight style={[styles.container,styles.add]}><Text style={styles.addfont}>+</Text></TouchableHighlight>
                            <TextInput placeholderTextColor = '#969696' placeholderTextStyle = 'bold' style={styles.input} placeholder='Name of Folder'
                            value={inputText} onChangeText={handleInputChange}/>
                            <View  style={styles.Madalbutton}>
                                <TouchableHighlight onPress={showToast} style={[styles.folderbutton,GlobalStyle.Primary_Linear_p]}>
                            <      Text style={styles.folderbuttonfont}>Create</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={OnCancelPress} style={[styles.folderbutton,GlobalStyle.Primary_Linear_p]}>
                                    <Text style={styles.folderbuttonfont}>Cancel</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Pressable>

                </Modal>
                
                <View style={styles.bar}>
                    <View style={styles.left}>
                        <Text style={[styles.title, isDarkMode ? GlobalStyle.Primary_Linear_p_light_font : GlobalStyle.Primary_Linear_p_font]}>Folders</Text>
                        <Text style={ isDarkMode ? GlobalStyle.Primary_light_p : styles.recent }>Opened Recently</Text>
                    </View>
                    <View style={styles.right}>
                        <Pressable style={[styles.selectbutton,GlobalStyle.Primary_Linear_p]}>
                            <Text style={styles.buttonfont}>select</Text>
                        </Pressable>
                    </View>
                </View>
                <SafeAreaView style={styles.files}>
                    <FlatList
                        data={DATA}
                        renderItem={({item}) => { return(<  ItemList data={item} PressHandler = {(OnAddPress)} />  )}}
                        showsHorizontalScrollIndicator={false}
                    />
                    
                </SafeAreaView>

            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    folderbuttonfont:{
        fontSize:15,
        fontWeight: 'bold',
        color:'white'
    },
    folderbutton:{
    
        height:27,
        width:120,
        borderRadius: 37.5,
        justifyContent:'center',
        alignItems:'center'
    },
    Madalbutton:{
        width:293,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        margin:10
    },
    input:{
        margin:5,
        height:33,
        width:213,
        borderRadius:10,
        paddingLeft:10,

        //color:'#969696',
        backgroundColor:'#f2f2f2'
    },
    container: {
        
        //(for debugging)
        margin:15,
        //(for debugging)
        width:74,
        height:2,
        borderRadius:15,
        alignItems:'center',
        justifyContent: 'center',
        
    },
    addfont:{
        fontSize:40,
        color:'#292d32'
    },
    add:{
        backgroundColor:'#DEDEDE',
        alignItems:'center',
    },
    modal2:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#888888',
        opacity:0.9
    },
    modal:{
        opacity:1,
        width:293,
        height:263,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: true ? '#636363':'#FFFFFF',
        
        borderRadius:12
    },
    files:{
        marginTop:10,
        marginBottom:70,
    },
    all:{
        flex:1,
        paddingLeft:20,
    },
    all_dark:{
        flex:1,
        paddingLeft:20,
    },
    title:{
        fontWeight: 'bold',
        fontSize:20
    },
    recent:{
        marginTop:4,
        fontWeight: 'semibold',
        fontSize:15,
        color:'#4726B3'
    },
    left:{
        marginTop:10,
        marginLeft:6,
        flex: 1,
        //backgroundColor: '#009900',
        flexDirection: 'column'

    },
    buttonfont:{
        fontSize:10,
        fontWeight: 'bold',
        color:'white'
    },
    selectbutton:{
        margin: 12,
        marginRight : 15,
        width:53,
        height:18,
        borderRadius: 37.5,
        justifyContent:'center',
        alignItems:'center'
    },
    right:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-end'
        //backgroundColor: '#990099',
    },
    bar:{
        height:70,
        //backgroundColor: '#999999',
        flexDirection: 'row'
    },
    testing: {
      flex: 1,
      backgroundColor: '#888888',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    header: {
        height: 90,
        paddingLeft: 10,
        width: '100%'
    },
    backButton: {
        marginTop: 45,
        color: '#FFF'
    }
  });
export default FolderPage
/**
<View style={styles.testing}>
<FolderItem></FolderItem>
</View> 


            <SafeAreaView style={styles.files}>
                <FlatList horizontal= {true}
                    data={DATA}
                    renderItem={({item}) => <  FolderItem/>}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
*/