import * as React from 'react';

import { Button } from 'react-native-paper';
import {Text } from 'react-native';
import GlobalStyle from '../../utils/GlobalStyle';

const Medium_Buttons = (props) => (
  <Button mode="contained" 
    onPress={props.onPressFunction} 
    {...GlobalStyle.Primary_Linear_p_button}
    style={props.styleArray} 
    labelStyle={props.labelArray}
  >
    {props.title}
  </Button>
);

export default Medium_Buttons;