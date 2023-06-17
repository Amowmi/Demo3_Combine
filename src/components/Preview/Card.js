import React from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import GlobalStyle from '../../utils/GlobalStyle';
import Heart from './Icons/Heart';
import Share from './Icons/Share';
import { useSelector } from 'react-redux';

const Card = (props) => {
    
  const {isDarkMode,previewMode} = useSelector(state => state.Mode);
    return (
      <PaperProvider>
        <View style={styles.view}>
          <View>
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
                <Heart/>
                <Share/>
              </View>
              
            </View>
          </View>
          
          
        </View>
      </PaperProvider>
    );
}


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