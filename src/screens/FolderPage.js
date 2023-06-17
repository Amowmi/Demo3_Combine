
import React, { useState } from 'react';
import { StyleSheet, Text, View ,Pressable,SafeAreaView,FlatList,Modal,TouchableHighlight,TextInput} from 'react-native';
import  ItemLList from '../components/ItemList';
import GlobalStyle from '../utils/GlobalStyle'
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import { setUserName,setCurFolder } from '../actions/Actions';
import { addFolder, pushPreviewList } from '../actions/Actions';


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
    //const dispatch = useDispatch();
    const dispatch = useDispatch();
    
    const folderList = useSelector(state => state.Folder.folderList);
    const {isDarkMode,previewMode} = useSelector(state => state.Mode);
    const DATA = divdeToList(folderList);
    const [inputText, setInputText] = useState('');

    
    const showToast = () => {
        Toast.show({
        position:'bottom',
          type: 'success',
          text2: 'Successful',
          bottomOffset : 400
        });
        OnAddPress();
      }
    const [isOpen, setIsOpen] = useState(false);

    const OnAddPress = ()=>{
        dispatch(addFolder(inputText));
        dispatch(pushPreviewList());
        setIsOpen(!isOpen);
        setInputText('');
    }

    const handleInputChange = (text) => {
        setInputText(text);
      };


    

    return(
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
                            <TouchableHighlight onPress={OnAddPress} style={[styles.folderbutton,GlobalStyle.Primary_Linear_p]}>
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
                    renderItem={({item}) => { return(<  ItemLList data={item} PressHandler = {OnAddPress} />  )}}
                    showsHorizontalScrollIndicator={false}
                />
                
            </SafeAreaView>

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