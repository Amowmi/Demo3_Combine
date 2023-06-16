import React , { useEffect} from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';

export default function Loading() {
    const navigation = useNavigation();
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.getParent().navigate('FunctionScreens');
        }, 3000); // 3秒後跳轉
    
        return () => clearTimeout(timeout); // 清除計時器，防止內存洩漏
      }, []);
    return (
        <View style = {styles.backgroundColor}>
           <Image style = {styles.image}source={require('../../assets/Logging/wallistic.png')}></Image>
            <View>
                <Text style = {styles.title}>Wallistic</Text>
            </View>
            <View>
                <Text style = {styles.subtitle2}>provides the most realistic preview {'\n'} of your wallpapers</Text>
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
    
    subtitle2: {
        fontSize: 12,
        marginTop: 15,
        color: '#000000',
        textAlign: 'center',
    },
    

});