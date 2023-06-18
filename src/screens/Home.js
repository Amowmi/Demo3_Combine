import React from 'react';
import { FlatList, StyleSheet, Text, View, Pressable, TouchableHighlight } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import HomeItem from '../components/HomeItem';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurFolder } from '../actions/Actions';



// const HomeList= ([
// {HomePreview:<HomeItem />},
// {HomePreview:<HomeItem />},
// {HomePreview:<HomeItem />},
// {HomePreview:<HomeItem />},
// {HomePreview:<HomeItem />},
// {HomePreview:<HomeItem />},
// {HomePreview:<HomeItem />},
// ]);

const Home = () => {

    const HomeList = useSelector(state => state.Preview.previewList[0]);
    const {isDarkMode,previewMode} = useSelector(state => state.Mode);
    dispatch = useDispatch();

    //dispatch(setCurFolder(0));

    const navigation = useNavigation();
    const handleFolderPress = () => {
        navigation.getParent().navigate('FolderBox');
    };

    return(
        <View style={[styles.container, isDarkMode ? GlobalStyle.Surface_dark: GlobalStyle.Surface_light]}>
            <Text style={[
                GlobalStyle.Global_title,
                isDarkMode ? GlobalStyle.Primary_Linear_p_light_font : GlobalStyle.Primary_Linear_p_font,
                styles.text
            ]}>
                Wallistic
            </Text>
            <FlatList  
                horizontal
                data={HomeList}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <View style={styles.item}><HomeItem photo ={item} /></View>}
            />
            <TouchableHighlight onPress={handleFolderPress}   underlayColor="#7D7DFF"
                style={[GlobalStyle.Primary_Linear_p,
                styles.button,
                ]}>
                <Text style={[GlobalStyle.Global_font, styles.buttonText]}>Go To Folders</Text>
            </TouchableHighlight>
                
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        marginTop:50,
        fontWeight: 'bold',
    },
    item: {
        marginHorizontal:15,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80,
        width:200,
        height:35,
        borderRadius: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color:'#ffffff',
    },
});

export default Home;
