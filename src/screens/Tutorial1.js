//tutorial1
import React , { useState } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';

export default function Tutorial1() {
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
    const handleNextPress = () => {
        navigation.navigate('Tutorial2');
    };
    const handleBackPress = () => {
        // navigation.navigate('Home');
    };
    return (
        <View style = {styles.backgroundColor}> 
            <View>
                <TouchableOpacity style={styles.cancleButtom} onPress={handleCanclePress}>
                    <Text style = {styles.Cancle}>Ｘ</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.item1}>
                <Text style = {styles.title}>Welcome to wallistic!</Text>
            </View>
            <View>
                <Image  style = {styles.image}source={require('../../assets/Logging/tutorial1.png')}></Image>
            </View>
            <View style = {styles.textbox}>
                <Text style = {styles.text}> If you came across an image you want to pin to Wallistic, go to share, and tap on the Wallistic icon.</Text>
            </View>
            <View style={styles.bottom_sets}>
                <TouchableOpacity disabled={true} style={styles.create_bottom} onPress={handleBackPress}>
                    <Text style = {styles.BackNext}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.create_bottom}onPress={handleNextPress} >
                    <Text style = {styles.BackNext}>Next</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
                <View style={styles.nowdot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
            </View>
        </View>
       
        
    );
}

const styles = StyleSheet.create({
    backgroundColor:{
        backgroundColor:'#FFFFF3',
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
        
        top: 50,
        width: 30,
        left: -160, 
        alignItems: 'center',
        height: 30,
        borderWidth: 1, // 添加边框宽度
        borderColor: '#000000', // 添加边框颜色
        borderRadius: 20,
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
    },
    bottom_sets: {
        
        margin:25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 32,
        gap: 100,     
        justifyContent: 'center',
        alignItems:'center'  
    },
    create_bottom:{
        width: 100,
        alignItems: 'center',
        height: 30,
        backgroundColor:'#6D6DD6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:'center'
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

  