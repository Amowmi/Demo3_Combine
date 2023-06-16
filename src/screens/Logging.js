//create account
import React , { useState } from 'react';
import { StyleSheet, Text, View , Image, TextInput, TouchableOpacity, button} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logging() {
    const [accounts, setAccounts] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
 
    const navigation = useNavigation();

    const handleUsernameChange = (text) => {
        setUsername(text);
    };
    
    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleCreatAccountPress = async () => {

        const existingAccount = accounts.find(
            (account) => account.username === username
        );
        if (existingAccount) {
        console.log('帳號已存在');
        return;
        }
        // 將新帳號加入帳號陣列
        const temp = accounts;
        temp.push({username: username, password: password })
        setAccounts(temp);

        // 清空輸入框
        setUsername('');
        setPassword('');

        try {
            await AsyncStorage.setItem('accounts', JSON.stringify(accounts));
            navigation.navigate('StartPage');
        } 
        catch (error) {
        console.log('存儲帳號失敗:', error);
        }
        // try {
        //     await AsyncStorage.setItem('username', username);
        //     await AsyncStorage.setItem('password', password);
        //     //console.log(password);
        //     navigation.navigate('StartPage');
        // }
        // catch (error) {
        //     console.log('存儲數據失敗:', error);
        // }
        
    };

    const handleLoggingPress = () => {
        navigation.navigate('Login');
    };
    /*
    
    */

    return (
        <View style = {styles.backgroundColor}>
            <Image 
            style = {styles.image}
            source={require('../../assets/Logging/wallistic.png')}></Image>
            <Text style = {styles.title}>Welcome to wallistic!</Text>
            <Text style = {styles.subtitle1}>Create an account  {'\n'}to preview wallpapers!</Text>

            <View style = {styles.button_set} >
                <Text style={styles.button_name}>Username</Text>
                <TextInput style={styles.button} value={accounts.username}  onChangeText={handleUsernameChange}>
                    <Text style={styles.buttonText}></Text>
                </TextInput>
                <Text style={styles.button_name}>E-mail</Text>
                <TextInput style={styles.button} >
                    <Text style={styles.buttonText}></Text>
                </TextInput>
                <Text style={styles.button_name}>Password</Text>
                <TextInput style={styles.button} value={accounts.password} onChangeText={handlePasswordChange}  secureTextEntry={true}>
                    <Text style={styles.buttonText}></Text>
                </TextInput>
                <Text style={styles.button_name}>Password again</Text>
                <TextInput style={styles.button} >
                    <Text style={styles.buttonText}></Text>
                </TextInput>
            </View>
            <Text style = {styles.subtitle2} > By Creating account,you confirm that you accept our Terms of Use & Privacy Policy</Text>
            <View>
                <TouchableOpacity style={styles.create_account} onPress={handleCreatAccountPress}> 
                    <Text style = {styles.create_account_buttom} >Create Account</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footer_word}> Already have an account?</Text>

                <TouchableOpacity onPress={handleLoggingPress}>
                    <Text style = {styles.logging_word}>  Logging</Text>
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
        alignItems: 'left',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center'
    },

    button_name: {
        margin: 0,
        color: '#666666',
        textAlign: 'left',
        width: 345,
        marginTop: 20,
        justifyContent: 'center',
        alignItems:'center'
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
        
        justifyContent: 'center',
        //backgroundColor:'#AD6DD6',
        color:'#ffffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer_word: {
       
    },
    logging:{
        //backgroundColor:'#AD6DD6',
        
    },
    logging_word: {
        color: '#AD6DD6',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    }

});