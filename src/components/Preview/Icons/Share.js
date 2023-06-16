import * as React from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import { IconButton } from 'react-native-paper';

const Share = () => (
    <IconButton
    icon="send-circle-outline"
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

export default Share;