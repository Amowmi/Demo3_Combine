import React from 'react';
import GlobalStyle from '../../utils/GlobalStyle';
import SelectMode from './Icons/SelectMode';
import BackButton from './Icons/BackButton';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';



const PreviewHeader = (props) => {
        return (

            <View style={styles.header}>
                <View style={[styles.fullW, GlobalStyle.Primary_Linear_p]}>
                    <View style={styles.headerPurple}>
                        <BackButton PressHandler = {props.PressHandler_back}/>
                        <Text style={styles.textPurple}>
                            Model
                        </Text>
                        <SelectMode PressHandler = {props.PressHandler_select} Mode={props.Mode}/>

                    </View>
                </View>
                
                <View style={styles.headerWhite}>
                    <Text style={props.Mode=='Original'? styles.textWhiteFocus : styles.textWhite}>
                        .
                    </Text>
                    <Text style={props.Mode=='Home'? styles.textWhiteFocus : styles.textWhite}>
                        .
                    </Text>
                    <Text style={props.Mode=='Lock'? styles.textWhiteFocus : styles.textWhite}>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerWhite: {
        width:'100%',
        height: 30,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textPurple:{
        fontSize: 24,
        fontWeight:'bold',
        color:'#ffffff',
        marginRight: 80
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