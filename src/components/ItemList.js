import React from'react';
import { StyleSheet, FlatList,SafeAreaView } from 'react-native';
import  FolderItem from './FolderItem';

const ItemList = (props)=>{
    return(
            <SafeAreaView style={styles.files}>
                <FlatList horizontal= {true}
                    data={props.data}
                    renderItem={({item}) => <  FolderItem data = {item}  PressHandler = {props.PressHandler}/>}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    files:{
        marginTop:20,
        marginBottom:20
    },
  });
export default ItemList