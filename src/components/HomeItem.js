import React from 'react';
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { useNavigation ,useRoute} from '@react-navigation/native';
import GlobalStyle from '../utils/GlobalStyle';
import { setCurPreview } from '../actions/Actions';
import { useDispatch} from 'react-redux';
import { log } from 'react-native-reanimated';

const HomeItem = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const navigateHandler_edit = () => {
        dispatch(setCurPreview(props.URL));
        navigation.getParent().navigate('EditingScreen');
      };

    return(
        <View style={styles.container}>
            <Image source={{uri:props.photo.URL}}  
                style={styles.image}/>
            <Image source={require('../../assets/img/lock_screen.png')}  
                style={styles.lockScreen}/>
            <Pressable onPress={navigateHandler_edit}   style={[
                GlobalStyle.Primary_Linear_p,
                styles.button,
                ]}>
                <Text style={[GlobalStyle.Global_font, styles.buttonText]}>Edit Image</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        zIndex:1,
        width: 277.01,
        height: 600,
        borderRadius: 26,
    },
    lockScreen: {
        zIndex:2,
        position: 'absolute',
        width: 277.01,
        height: 600,
        borderRadius: 26,
    },
    button: {
        zIndex:3,
        position:'absolute',
        top:65,
        left:20,
        width:74,
        height:18,
        borderRadius: 37.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize:10,
        fontWeight:'bold',
        color:'#FFFFFF',
    }

});

export default HomeItem;
