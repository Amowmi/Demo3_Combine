import * as React from 'react';
import { StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-paper';



const SelectMode = (props) => (
    < TouchableHighlight style={styles.button}
            onPress={()=>{props.PressHandler();}}>
        <Text style={styles.text}>{props.Mode}</Text>
    </ TouchableHighlight>
);

const styles = StyleSheet.create({
    button:{
      margin: 0,
      justifyContent: 'center',
      height: 25,
      width: 60,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      borderRadius: 20,
    },
    text:{
        fontSize: 12, 
    }
  });

export default SelectMode;