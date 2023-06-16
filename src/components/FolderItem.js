import React from'react';
import { StyleSheet, Text, View,ImageBackground,TouchableOpacity  } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle'


const FolderItem   = (props)=>{

    const image = require('../../assets/FolderImage/sample.jpg');
    const floderName = 'Favorites'
    if(props.islast==true){
        return(
            <TouchableOpacity
            style={[styles.container,styles.add]}
            onPress={props.PressHandler}
            >   
            <Text style={styles.addfont} >+</Text>
             </TouchableOpacity>
        )
    }
    else{
        return(
            <TouchableOpacity
              onPress={() => {}}
            >
            <View style={styles.container}>
    
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <Text style={[GlobalStyle.Primary_Linear_p,
                                styles.text]}>
                            {floderName}
                    </Text>
                </ImageBackground>
            </View>
            </TouchableOpacity>
        )
    }

}
const styles = StyleSheet.create({
    addfont:{
        fontSize:50,
        color:'#777777'
    },
    add:{
        backgroundColor:'#AAAAAA',
        alignItems:'center',
    },
    container: {
        //(for debugging)
        marginLeft:5,
        marginRight:5,
        //(for debugging)
        width:127,
        height:174,
        borderRadius:15,
        overflow: 'hidden',
        justifyContent: 'center',
        
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    text: {
      color: 'white',
      fontSize: 13,
      lineHeight: 41,
      fontWeight: 'bold',
      textAlign: 'center',
      opacity:0.9
    },
  });
  
export default FolderItem