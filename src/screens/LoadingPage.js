import React , { useEffect} from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Loading() {
    const navigation = useNavigation();
    const isDarkMode = useSelector(state => state.Mode.isDarkMode);
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.getParent().navigate('FunctionScreens');
        }, 1500); // 1.5秒後跳轉
    
        return () => clearTimeout(timeout); // 清除計時器，防止內存洩漏
      }, []);
    return (
        <View style = {[styles.background,isDarkMode ? GlobalStyle.Surface_dark : GlobalStyle.Surface_light]}>
           <Image style = {styles.image}source={require('../../assets/Logging/wallistic.png')}></Image>
            <View>
                <Text style = {[isDarkMode ? GlobalStyle.Primary_Linear_p_light_font : GlobalStyle.Primary_Linear_p_font]}>Wallistic</Text>
            </View>
            <View >
                <Text style = {[styles.subtitle2, isDarkMode ? GlobalStyle.Surface_dark_font : GlobalStyle.Surface_light_font]}>provides the most realistic preview {'\n'} of your wallpapers</Text>
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
        justifyContent: 'center',
    },

    image: {
        marginTop: 228,
        width: 108,
        height: 108,
        borderRadius: 15,
    },
    title: {
        left: 7,
        fontSize: 22,
        marginTop: 20,
       
        //漸層
       // backgroundImage: linear-gradient(180deg, #6D6DD6 0%, #884ED3 100%),
        
    },
    
    subtitle2: {
        fontSize: 12,
        marginTop: 15,
        textAlign: 'center',
    },
    

});