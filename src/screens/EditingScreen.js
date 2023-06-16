import React from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, Alert} from 'react-native';
import Medium_Buttons from '../components/Edit/CustomButton';
import Icon_Button from '../components/Edit/IconButton';
import GlobalStyle from '../utils/GlobalStyle';

const isdarkMode = false;

export default function EditingScreen(){
  onPressHandler= () =>{

  }
  resetHandler= () =>{
    Alert.alert('Reset', 'Are you sure you want to reset?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', onPress: () => console.log('Reset action') }
    ]);
  }
  doneHandler = () => {
    Alert.alert('Done', 'It is saved', [{ text: 'OK' }]);
  };
  
    return(
      <View style={styles.container}>
            
            <Image
              style={styles.imageCard}
              source={require('../../assets/img/IvyPen.png')}
            />
            <View style={styles.toolBar}>
              <Medium_Buttons 
                onPressFunction={resetHandler}
                labelArray={{fontSize: 8,  flex: -1, lineHeight: 22, marginHorizontal: 0, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0}}
                title={'RESET'}
                styleArray={{height: 23}}
              />
              <Icon_Button
              onPressFunction={onPressHandler}
              iconChoice={'flip-horizontal'}
              />
              <Icon_Button
              onPressFunction={onPressHandler}
              iconChoice={'rotate-right'}
              />
              <Icon_Button
              onPressFunction={onPressHandler}
              iconChoice={'circle-outline'}
              />
              <Medium_Buttons 
              onPressFunction={doneHandler}
              labelArray={{fontSize: 8,  flex: -1, lineHeight: 22, marginHorizontal: 0, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0}}
              title={'DONE'}
              styleArray={{height: 23}}
              />
            </View> 
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isdarkMode ? '#1d1d1d': '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 0
    },
    imageCard: {
      width: 320.75,
      height: 692,
      resizeMode: 'cover',
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      marginBottom: 10
    },
    toolBar:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#dcdcdc',
      width: '100%',
      height: 30
    },
    header:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      width: '100%',
      paddingLeft: 10,
      paddingRight: 20,
      paddingTop: 16,
  
    },
    icon:{
      flex: 1,
      flexDirection: 'col',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0
    }
  });