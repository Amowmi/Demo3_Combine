import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

const HomeItem = (props) => {
    return(
        <View style={styles.container}>
            <Image source={{uri:props.photo.URL}}  
                style={styles.image}/>
            <Image source={require('../../assets/img/lock_screen.png')}  
                style={styles.lockScreen}/>
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

});

export default HomeItem;
