import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import {Text } from 'react-native';
const Icon_Button = (props) => (
  <IconButton
    icon={props.iconChoice}
    iconColor={props.iconColor}
    size={26}
    onPress={props.onPressFunction}
  />
  
);

export default Icon_Button;