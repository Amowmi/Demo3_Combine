//第一次創帳號選擇要不要看解說那頁
import React , { useState } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function StartPage() {

    const {isDarkMode} = useSelector(state => state.Mode.isDarkMode);
    const handleTutorialPress = () => {
        navigation.getParent().navigate('TutorialScreens');
    };
    const handleSkipPress = () => {
        navigation.getParent().navigate('FunctionScreens');
    };
    const navigation = useNavigation();
    return (
        <View style = {[styles.background,isDarkMode ? GlobalStyle.Surface_dark : GlobalStyle.Surface_light]}>
           <Image style = {styles.image}source={require('../../assets/Logging/wallistic.png')}></Image>
            <View>
                <Text style = {styles.title}>Wallistic</Text>
            </View>
            <View>
                <Text style = {styles.subtitle1}>Account created!</Text>
            </View>
            <View>
                <Text style = {styles.subtitle2}>It’s your first time here! Would you{'\n'} like to go through a short tutorial?</Text>
            </View>
            <View style = {styles.buttom_sets}>
               
                <TouchableOpacity  style={styles.create_account} onPress={handleTutorialPress} >
                    <Text style = {styles.create_account_buttom}>Tutorial</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.create_account} onPress={handleSkipPress}>
                    <Text style = {styles.create_account_buttom}>Skip tutorial</Text>
                </TouchableOpacity>
            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        alignItems: 'center',
    },
    body: {
        flex: 1,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    image: {
        marginTop: 228,
        width: 108,
        height: 108,
        borderRadius: 15,
    },
    title: {
        left: 7,
        //top: 0,
        fontSize: 22,
        marginTop: 20,
        //漸層
       // backgroundImage: linear-gradient(180deg, #6D6DD6 0%, #884ED3 100%),
        
    },
    subtitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        color: '#000000',
        textAlign: 'center',
    },
    subtitle2: {
        fontSize: 12,
        marginTop: 15,
        color: '#000000',
        textAlign: 'center',
    },
    
    create_account: {
        backgroundColor:'#6D6DD6',
        width: 155.83,
        height: 27,
        borderRadius: 100,
        marginTop: 20,
        justifyContent: 'center',
        alignItems:'center'
    },

    create_account_buttom: {
        
        //backgroundColor:'#AD6DD6',
        color:'#ffffff',
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});