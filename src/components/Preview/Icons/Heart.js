import * as React from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import { IconButton } from 'react-native-paper';
import {ToggleLove} from '../../../actions/Actions';
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Heart = (props) => {
  const dispatch = useDispatch();
  onPress = () =>{
    dispatch(ToggleLove(props.loved,props.folder,props.URL));
  }
  
  
  return(
    <IconButton
    icon= {props.loved ? 'cards-heart':"cards-heart-outline"}
    iconColor='#8569F6'
    style={styles.button}
    size={18}
    onPress={onPress}
  />
);}

const styles = StyleSheet.create({
  button:{
    margin: 0,
  }
});

export default Heart;