import * as React from 'react';
import { StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';


function SelectMode(props) {
    const {isDarkMode,previewMode} = useSelector(state => state.Mode);
  return(
        < TouchableHighlight style={styles.button}
        onPress={()=>{props.PressHandler();}}>
    <Text style={styles.text}>{previewMode}</Text>
    </ TouchableHighlight>
  )
    
};

const styles = StyleSheet.create({
    button:{
      justifyContent: 'center',
      height: 25,
      width: 60,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      borderRadius: 20,
      marginRight: 8
    },
    text:{
        fontSize: 12, 
    }
  });

export default SelectMode;