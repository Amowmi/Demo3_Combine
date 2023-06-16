import React from'react';
import { StyleSheet, FlatList,SafeAreaView } from 'react-native';
import  FolderItem from './FolderItem';

const ItemList   = (props)=>{
    if(props.id!=0){
        return(
            <SafeAreaView style={styles.files}>
                <FlatList horizontal= {true}
                    data={props.data}
                    renderItem={({item}) => <  FolderItem/>}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
        )
    }
    else{
        return(
        <SafeAreaView style={styles.files}>
            <  FolderItem PressHandler = {props.PressHandler} islast={true}/>
        </SafeAreaView>)
    }

}

const styles = StyleSheet.create({
    files:{
        marginTop:20,
        marginBottom:20
    },
  });
export default ItemList