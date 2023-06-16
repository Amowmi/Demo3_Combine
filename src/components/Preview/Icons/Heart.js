import * as React from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';

import { IconButton } from 'react-native-paper';

const Heart = () => (
    <IconButton
    icon="cards-heart-outline"
    iconColor='#8569F6'
    style={styles.button}
    size={18}
    onPress={() => console.log('Pressed')}
  />
);

const styles = StyleSheet.create({
  button:{
    margin: 0,
  }
});

export default Heart;