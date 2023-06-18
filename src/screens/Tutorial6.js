//tutorial1
import React , { useState } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon_Button from '../components/Edit/IconButton';

export default function Tutorial1() {

    const isDarkMode = useSelector(state => state.Mode.isDarkMode);
    const navigation = useNavigation();
    const handleCanclePress = () => {
        if(navigation.getParent().getState().routeNames[2]=='Help and Support'){
            navigation.navigate('Home');
        }
        else{
            navigation.getParent().navigate('FunctionScreens');
        }
        
        console.log();
        console.log('press');
    };
    const handleReadyPress = () => {
        navigation.navigate('Home');
    };
    const handleBackPress = () => {
        navigation.navigate('Tutorial5');
    };
    return (
        <View style = {[styles.background,isDarkMode ? GlobalStyle.Surface_dark : GlobalStyle.Surface_light]}> 
            <View>
            <TouchableOpacity style={styles.cancleButtom} onPress={handleCanclePress}>
                <Icon_Button 
                iconColor={'#8569F6'}
                iconChoice={'close-circle-outline'}/>
            </TouchableOpacity>
            </View>
                <Text style = {[GlobalStyle.Global_title,styles.title,
                    isDarkMode ? GlobalStyle.Primary_Linear_p_light_font : GlobalStyle.Primary_Linear_p_font]}>
                    Wallistic</Text>
            <View>
                <Image  style = {styles.image}source={require('../../assets/Logging/tutorial6.png')}></Image>
            </View>
            <View style = {styles.textbox}>
                <Text style = {[styles.text,isDarkMode?GlobalStyle.Surface_dark_font:GlobalStyle.Surface_light_font]}> Tap on an image to enter the editing page. Make adjustments to see how the image presents on your device.</Text>
            </View>
            <View style={styles.bottom_sets}>
                <TouchableOpacity style={styles.create_bottom} onPress={handleBackPress}>
                    <Text style = {styles.BackNext}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.create_bottom}onPress={handleReadyPress} >
                    <Text style = {styles.BackNext}>Ready</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.nowdot} />
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
    cancleButtom:{
        top: 25,
        width: 30,
        left: -160, 
        alignItems: 'center',
        height: 30,
    },
    Cancle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 22,
    },

    title: {
        top: 20,
        fontSize: 22,
        margin: 20,
        fontWeight: 'bold',
        //漸層
       // backgroundImage: linear-gradient(180deg, #6D6DD6 0%, #884ED3 100%),
        
    },
    image:{
        marginTop: 20,
        height: 456,
        width: 214,
        borderRadius: 20,
    },
    textbox:{
        width: 214,
    },
    text:{
        marginTop:30,
        textAlign: 'center',
        position: 'absolute',
        zIndex: 2,
    },
    bottom_sets: {
        
        margin:25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 32,
        gap: 100,   
        marginTop: 130      
    },
    create_bottom:{
        width: 100,
        alignItems: 'center',
        height: 30,
        backgroundColor:'#6D6DD6',
        borderRadius: 20,
    },
    BackNext:{
        fontSize: 20,
        color: '#ffffff',
        
        flexDirection: 'row',
        borderRadius: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 35, 
      },
    nowdot:{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#6D6DD6',
        marginHorizontal: 5,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#DDDDDD',
        marginHorizontal: 5,
      },
  });

  