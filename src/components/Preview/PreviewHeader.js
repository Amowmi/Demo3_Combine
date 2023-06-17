import React from 'react';
import GlobalStyle from '../../utils/GlobalStyle';
import SelectMode from './Icons/SelectMode';
import BackButton from '../Edit/backButton';
import { useSelector } from 'react-redux';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';



const PreviewHeader = (props) => {
    const {isDarkMode,previewMode} = useSelector(state => state.Mode);
    const currentFolder = useSelector(state => state.Folder.currentFolder);
    const folderList = useSelector(state => state.Folder.folderList);
    console.log('preview mode :' , previewMode);
    console.log('current folder :', currentFolder);
    console.log('folderlist:',folderList);
        return (

            <View style={styles.header}>
                <View style={[styles.fullW, GlobalStyle.Primary_Linear_p]}>
                    <View style={styles.headerPurple}>
                        <BackButton style={{width: 60}} onPress={props.PressHandler_back}/>
                        <Text style={styles.textPurple}>
                            {folderList[currentFolder].name}
                        </Text>
                        <SelectMode PressHandler = {props.PressHandler_select}/>

                    </View>
                </View>
                
                <View style={styles.headerWhite}>
                    <Text style={previewMode=='Original'? styles.textWhiteFocus : styles.textWhite}>
                        .
                    </Text>
                    <Text style={previewMode=='Home'? styles.textWhiteFocus : styles.textWhite}>
                        .
                    </Text>
                    <Text style={previewMode=='Lock'? styles.textWhiteFocus : styles.textWhite}>
                        .
                    </Text>
                </View>
            </View>
        
            
    )

}

const styles = StyleSheet.create({
    header: {
        width:'100%',
        height: 121,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerPurple: {
        width:'95%',
        height: 91,
        paddingTop: 45,
        marginLeft: 20.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerWhite: {
        width:'100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        
        flexDirection: 'row'
    },
    textPurple:{
        fontSize: 24,
        fontWeight:'bold',
        color:'#ffffff',
        //marginRight: 80
    },
    textWhite:{
        fontSize:  35,
        fontWeight:'bold',
        paddingBottom: 60,
        margin: 2,
        color: '#888888'
    },
    textWhiteFocus:{
        fontSize:  35,
        fontWeight:'bold',
        paddingBottom: 60,
        margin: 2,
        color: '#8569F6',
    },
    fullW:{
        width:'100%'
    }
})

export default PreviewHeader;