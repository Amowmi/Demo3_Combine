import * as React from 'react';
import { StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-paper';



const BackButton = (props) => (
    < TouchableHighlight style={styles.button}
            onPress={()=>{props.PressHandler();}}>
        <Text style={styles.text}>{'<'}</Text>
    </ TouchableHighlight>
);

const styles = StyleSheet.create({
    button:{
      color: '#fff',
      margin: 0,
      justifyContent: 'center',
      height: 25,
      width: 25,
      alignItems: 'center',
      borderRadius: 20,
      marginRight: 110,
    },
    text:{
        fontSize: 18, 
        color: '#fff',
        fontWeight: 'bold'
    }
  });

export default BackButton;