//選擇要登入還是創帳號那頁
import React , { useState } from 'react';
import { StyleSheet, Text, View , Image, TextInput, TouchableOpacity, button, Alert} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserName } from '../actions/Actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
 
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleCreatAccountPress = () => {
        navigation.navigate('Logging');
    };

    const handleLoggingPress = async()=> {
        const savedAccount = await AsyncStorage.getItem('accounts');
        const parsedAccount = JSON.parse(savedAccount);
        //console.log('尚未有帳號密碼的頁面');
        if (username===''|| password ===''){
            Alert.alert('Error!', 'Please enter username and password', [{ text: 'OK' }]); // Error Alert
        }
        else if (parsedAccount.find((account) => account.username === username  &&
        parsedAccount.find((account) => account.password === password)) )
        {
            dispatch(setUserName(username));
            navigation.getParent().navigate('Loading');
        }
        else{
            Alert.alert('Error!', 'Please try again', [{ text: 'OK' }]); // Error Alert
        }
        //navigation.navigate('Loading');
    };

    const handleUsernameChange = (text) => {
        setUsername(text);
    };
    
    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    //log out 還沒寫，應該要寫在setting 那裡
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    return (
        <View style = {styles.backgroundColor}>
            <Image 
            style = {styles.image}
            source={require('../../assets/Logging/wallistic.png')}></Image>
            <Text style = {styles.title}>Welcome to wallistic!</Text>
            <Text style = {styles.subtitle1}>Login and enjoy {'\n'}selecting a wallpaper!</Text>

            <View style = {styles.button_set}>
                <Text style={styles.button_name}>Username</Text>
                <TextInput style={styles.button} value={username} onChangeText={handleUsernameChange}>
                    <Text style={styles.buttonText}></Text>
                </TextInput>
               
                <Text style={styles.button_name} >Password</Text>
                <TextInput style={styles.button} value={password} onChangeText={handlePasswordChange} secureTextEntry={true}>
                    <Text style={styles.buttonText}></Text>
                </TextInput>
            </View>
           
            <View>
                <TouchableOpacity style={styles.create_account} onPress={handleLoggingPress}> 
                    <Text style = {styles.create_account_buttom} >Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footer_word}> Don’t have an account?</Text>

                <TouchableOpacity onPress={handleCreatAccountPress}>
                    <Text style = {styles.logging_word}> Create Account</Text>
                </TouchableOpacity>

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

    title: {
        left: 7,
        //top: 0,
        fontSize: 22,
        marginTop: 20,
        //漸層
       // backgroundImage: linear-gradient(180deg, #6D6DD6 0%, #884ED3 100%),
        
    },
    subtitle1: {
       
        fontSize: 16,
        marginTop: 15,
        color: '#666666',
        textAlign: 'center',
    },
    subtitle2: {
        marginHorizontal: 20,
        fontSize: 14,
        marginTop: 20,
        color: '#666666',
        textAlign: 'center',
    },
    image: {
        marginTop: 60,
        width: 108,
        height: 108,
        borderRadius: 100,
    },
   
    button_set: {
        flexDirection: 'col',
       
        //backgroundColor: '#DDDDDD',
        width: 345,
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#EEEEEE',
        width: 345,
        height: 50,
        borderRadius: 5,
    },

    button_name: {
        margin: 0,
        color: '#666666',
        textAlign: 'left',
        width: 345,
        marginTop: 20,
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    create_account: {
        backgroundColor:'#6D6DD6',
        width: 317,
        height: 43,
        borderRadius: 100,
        marginTop: 20,
        justifyContent: 'center',
        alignItems:'center'
    },
    create_account_buttom: {
        color:'#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 280,
        flexDirection: 'row',
        alignItems: 'center',
    },
   
    logging_word: {
        color: '#AD6DD6',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    }

});