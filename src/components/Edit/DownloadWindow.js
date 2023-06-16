import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import GlobalStyle from '../../utils/GlobalStyle';
import Medium_Buttons from './CustomButton';
import Icon_Button from './IconButton';


export default function DownloadWindow(props) {
  const [value, setValue] = React.useState(0);
  const DownloadSheet = React.useRef();

  if(props.isDownload == true){
    DownloadSheet.current.open();
    console.log('DOWNLOAD');
  }

  React.useEffect(() => {
    DownloadSheet.current.close();
  }, []);

  return (
      <RBSheet
        customStyles={{ container: styles.DownloadSheet }}
        height={440}
        openDuration={250}
        ref={DownloadSheet}
        >
        <View style={styles.DownloadBody}>
          <View style={styles.DownloadTop}>
            <Image style={styles.DownlaodImg}
            source={require('../assets/felix1.jpg')}
            />
            <View style={styles.DownloadSide}>
                <Text style={styles.DownloadTitle}>{'Image downloaded to \nyour device!'} </Text>
                <Medium_Buttons 
                    onPressFunction={onDownloadHandler}
                    labelArray={{fontSize: 8, flex: -1, lineHeight: 22, marginHorizontal: 0, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0}}
                    title={'Go To Folders'}
                    styleArray={{height: 23, width: 90, marginHorizontal: 10}}
                />
            </View>
          </View>
          <View style={styles.DownloadIcons}>
            <Text style={{fontSize: 30}}>App icons</Text>
          </View>
          <TouchableOpacity
            style={styles.DownloadBtn}
          >
            <Icon_Button
            onPressFunction={() => {
                DownloadSheet.current.close();
                
            }}
            iconChoice={'home'}
            />
          </TouchableOpacity>
        </View>
      </RBSheet>

  );
}

const styles = StyleSheet.create({
  DownloadTitle: {
    fontSize: 20,
    fontWeight: '600',
    ...GlobalStyle.Primary_Linear_p_font,
    padding: 10
  },
  DownloadBody: {
    padding: 24,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#dce3e1',
    marginTop: 0,
    marginBottom: 0
  },
  
  DownloadText: {
    fontSize: 13,
    fontWeight: '600',
    ...GlobalStyle.Primary_Linear_p_font
  },
  DownloadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 14,
    borderWidth: 1,
    borderColor: '#dce3e1',
    backgroundColor: '#fff',
    marginTop: 30,
    height: 40
  },
  DownloadBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  DownloadSheet: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 0,
    paddingBottom: 0
  },
  DownlaodImg: {
    width: '30%',
    height: '75%'
  },
  DownloadTop:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: '70%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',

  },
  DownloadIcons:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    
  },
  DownloadSide: {
    alignItems:'flex-start',
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10

  }
});