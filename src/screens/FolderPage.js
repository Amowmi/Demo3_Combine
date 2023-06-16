
import React, { useState } from 'react';
import { StyleSheet, Text, View ,Pressable,SafeAreaView,FlatList,Modal,TouchableHighlight,TextInput} from 'react-native';
import  ItemLList from '../components/ItemList';
import GlobalStyle from '../utils/GlobalStyle'
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const DATA = [
    {id:3},{id:4},{id:5},{id:0}
  ];
const isDarkMode = true;



const FolderPage   = ()=>{
    const navigation = useNavigation();
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
        setIsOpen(!isOpen);
    }
    const navigateHandler = () => {
        navigation.navigate('PreviewScreen');
    };

    

    return(
        <View style={isDarkMode ? styles.all_dark : styles.all}>
            <Modal transparent visible={isOpen}  >
                <Pressable  onPress={OnAddPress} style={styles.modal2}>
                    <View style={styles.modal}>
                        <Text style={[styles.title, GlobalStyle.Primary_Linear_p_font]}>Create Folder</Text>
                        <TouchableHighlight style={[styles.container,styles.add]}><Text style={styles.addfont}>+</Text></TouchableHighlight>
                        <TextInput placeholderTextColor = '#969696' placeholderTextStyle = 'bold' style={styles.input} placeholder='Name of Folder'/>
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
                    <Pressable
                        onPress={navigateHandler}
                        style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
                        ><Text>
                        Go to Edit Screen
                        </Text>
                    </Pressable>
                </View>
            </View>
            <SafeAreaView style={styles.files}>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <  ItemLList data={DATA} id={item.id} PressHandler = {OnAddPress}/>}
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
        height:74,
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
        backgroundColor: isDarkMode ? '#636363':'#FFFFFF',
        borderRadius:12
    },
    files:{
        marginTop:10,
        marginBottom:70,
    },
    all:{
        flex:1,
        paddingLeft:20,
        backgroundColor: '#FFFFFF',
    },
    all_dark:{
        flex:1,
        paddingLeft:20,
        backgroundColor: '#1E1E1E',
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