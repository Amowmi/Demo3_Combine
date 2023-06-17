import React from 'react';import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';
import GlobalStyle from '../utils/GlobalStyle';
import { useSelector } from 'react-redux';

const totalPins=120;

const Profile = () => {
    
  const userName = useSelector(state => state.userName);
  
  return(
        <View style={styles.container}>
           <Text style={[
                GlobalStyle.Global_title,
                GlobalStyle.Primary_Linear_p_font,
                styles.title]} >
                Profile
            </Text>
            <Image source={require('../../assets/img/profile.jpg')}  
                style={styles.image}/>
            <View style={[
                GlobalStyle.Primary_Linear_p,
                styles.box]}></View>
            <View style={styles.box}>
                <Text style={styles.totalPins}>{totalPins}</Text>
                <Text style={{lineHeight:1}}>&nbsp;</Text>
                <Text style={styles.totalPinsText}>Total pins</Text>
            </View>
            <DataTable style={styles.table} >
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={{flex: 3}}>
                        <Text style={[GlobalStyle.Primary_Linear_p_font,styles.tableTitle]}>Name</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: 9}}>
                        <Text style={styles.tableText}>{userName}</Text>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell style={{flex: 3}}>
                        <Text style={[GlobalStyle.Primary_Linear_p_font,styles.tableTitle]}>Email</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: 9}}>
                        <Text style={styles.tableText}>Penpen@gmail.com</Text>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            <Pressable style={[
                GlobalStyle.Primary_Linear_p,
                    styles.button,
                ]}>
                <Text style={[GlobalStyle.Global_font, styles.buttonText]}>Change password</Text>
            </Pressable>    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        marginTop: 43,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        width: 277.01,
        height: 600,
        borderRadius: 26,
    },
    table: {
        paddingHorizontal: 30,
    },
    tableText: {
        fontSize: 12,
        fontWeight: 'normal'
    },
    tableTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    row: {
        backgroundColor: '#EEEEEE',
        marginVertical: 7,
        borderRadius: 10,
    },
    box: {
        zIndex:1,
        alignItems: 'center',
        width: 356,
        height: 138,
        borderRadius: 20,
    },
    totalPins:{
        marginTop:80,
        fontSize:14,
        fontWeight: 'bold',
    },
    totalPinsText:{
        lineHeight:12,
        fontSize:12,
        color:727477,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width:240,
        height:32.56,
        borderRadius: 30,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 12,
        color:'#ffffff',
    },
    image: {
        zIndex:2,
        position: 'absolute', 
        top: 168, 
        width: 110,
        height: 110,
        borderRadius: 55,
    },
    
});

export default Profile;
