import React from 'react';
import { StyleSheet, Image, Text, View, Button,Pressable } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import GlobalStyle from '../../utils/GlobalStyle';
import Heart from './Icons/Heart';
import Share from './Icons/Share';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setCurPreview } from '../../actions/Actions';


const Card = (props) => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateHandler_edit = () => {
    dispatch(setCurPreview(props.URL));
    navigation.navigate('EditingScreen');
  };
  const {isDarkMode,previewMode} = useSelector(state => state.Mode);
    return (
      <PaperProvider>
        <View style={styles.view}>
          <Pressable  onPress = {navigateHandler_edit}>
            <Image style={previewMode=='Lock'? styles.tinyLogoOverlayL : styles.invisible}
                    source={require('../../../assets/img/lock.png')}>

            </Image>
            <Image style={previewMode=='Home'? styles.tinyLogoOverlay : styles.invisible}
                    source={require('../../../assets/img/home.png')}>

            </Image>
            <Image
              style={styles.tinyLogo}
              source={{uri: props.URL}}
            />
            <View style={styles.imageDescription}>
              <Text style={[styles.imageDescriptionText, GlobalStyle.Primary_Linear_p_font]}> 2023 / 06 / 14    </Text>
              <View style={styles.imageDescriptionIcon}>
                <Heart loved={props.loved} URL ={props.URL} folder={props.folder} />
                <Share/>
              </View>
              
            </View>
          </Pressable>
          
          
        </View>
      </PaperProvider>
    );
}

// {/* <Pressable  /* Temporary Button to Edit */ 
// onPress={navigateHandler_edit}
// style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
// ><Text>
// Go to Edit Screen
// </Text>
// </Pressable> */}
const styles = StyleSheet.create({

  view: {
    flex: 0.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text:{
    fontSize: 25,
    fontWeight:'bold',
    color:'#ffffff'
  },
  tinyLogo: {
    zIndex: 1,
    width: 166.43,
    height: 360,
    margin: 8,
    marginBottom: 0,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  tinyLogoOverlay: {
    position:'absolute',
    left:0,
    zIndex: 2,
    width: 166.43,
    height: 360,
    resizeMode: 'contain',
    margin: 8,
    marginTop: -15,
    marginBottom: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  tinyLogoOverlayL: {
    position:'absolute',
    left:0,
    zIndex: 4,
    width: 166.43,
    height: 360,
    resizeMode: 'contain',
    margin: 8,
    marginBottom: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  invisible: {
    position:'absolute',
    zIndex: 3,
    width: 166.43,
    height: 360,
    resizeMode: 'contain',
    margin: 8,
    marginBottom: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    opacity: 0,
  },
  imageDescription: {
    width: 166.28,
    height: 30,
    margin: 8,
    marginTop: 0,
    backgroundColor: '#ffffff',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 5,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  imageDescriptionIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imageDescriptionText: {
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 2 
  }
});

export default Card;