import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import ModeSwitch from '../../components/ModeSwitch';


const SettingContent = (props) => {
    return (
        <DrawerContentScrollView {...props} >
            <DrawerItemList {...props} />
            <View style={styles.darkModeContainer}>
            <DrawerItem label="Dark Mode" style={styles.darkModeLabel}/><ModeSwitch />
            </View>
        </DrawerContentScrollView>
    );
  };

  const styles = StyleSheet.create({
    darkModeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 0,
      paddingRight:16,
    },
    darkModeLabel: {
      flex: 1,
    },
  });
export default SettingContent;