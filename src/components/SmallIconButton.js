import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import {Text } from 'react-native';
const SmallIconButton = (props) => (
  <IconButton
    icon={props.iconChoice}
    iconColor={'#8569F6'}
    size={17}
    onPress={props.onPressFunction}
  />
  
);

export default SmallIconButton;