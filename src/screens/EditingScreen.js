import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable, Alert, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Medium_Buttons from '../components/Edit/CustomButton';
import Icon_Button from '../components/Edit/IconButton';
import GlobalStyle from '../utils/GlobalStyle';
import Edit_Header from '../components/Edit/backButton';
import Slider from '@react-native-community/slider';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


import { useNavigation } from '@react-navigation/native';

import 'react-native-gesture-handler';
import { Gesture, GestureDetector, GestureHandlerRootView, PanGesture, PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';

import Animated, { withTiming, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;
const colors = [
    '#e2e0dd',
    '#94939c',
    '#000000',
    '#f44336',
    '#f4ab36',
    '#fde176',
    '#75da69',
    '#69c7da',
    '#C6B8FF',
    '#f2a4b5',
    '#86e2c2',
    '#8b86e2',

  ];
export default function RotationScreen(props){
    const {isDarkMode,previewMode} = useSelector(state => state.Mode);
    const [isFlipped, setFlipped] = useState(false);
    const [isReset, setReset] = useState(false);
    const [isBackground, setBackground] = useState(false);
    const [isDownload, setDownload] = useState(false);
    const [distance, setDistance] = useState(5);
    const [rotate_deg, setRotation] = useState(0);
    const [value, setValue] = React.useState(0);
    const [ColorValue, setColorValue] = React.useState(0);
    

    //pinch
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    //pan
    const END_POSITION = 200;
    const onLeft = useSharedValue(true);
    const position = useSharedValue(0);
    //pan vertical movement
    const END_VERTICAL_POSITION = 200;
    const onTop = useSharedValue(true);
    const verticalPosition = useSharedValue(0);


    //RBS
    const DownloadSheet = React.useRef();
    const RotateSheet = React.useRef();
    const ColorSheet = React.useRef();

    //Color picker
    React.useEffect(() => {
        RotateSheet.current.close();
        DownloadSheet.current.close();
        ColorSheet.current.close();
    }, []);

    //download
    async function downloadImage(imageUrl) {
      try {
        const downloadResumable = FileSystem.createDownloadResumable(
          imageUrl,
          FileSystem.documentDirectory + 'image.jpg'
        );
        const { uri } = await downloadResumable.downloadAsync();
        await MediaLibrary.saveToLibraryAsync(uri);
      } catch (error) {
        console.log('fail to download:', error);
      }
    }

    onFlipHandler= () =>{
        setFlipped(!isFlipped);
    };
    
    doneHandler = () => {
        Alert.alert('Done', 'It is saved', [{ text: 'OK' }]);
    };
    onBackgroundColorHandler = () => {
        ColorSheet.current.open();
    };
    onRotateHandler = () => {
        RotateSheet.current.open();
    };
    onDownloadHandler= () =>{
        downloadImage(currentPreview);
        DownloadSheet.current.open();
        console.log('DOWNLOAD');
    };
    //IMAGE
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
        scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
        savedScale.value = scale.value;
    });
    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (onLeft.value) {
            position.value = e.translationX;
            } else {
            position.value = END_POSITION + e.translationX;
            }
            if(onTop.value){
            verticalPosition.value = e.translationY;
            } else{
            verticalPosition.value = END_VERTICAL_POSITION + e.translationY;
            }
        })
        .onEnd((e) => {
            position.value = e.translationX;
            verticalPosition.value = e.translationY;
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
          {scale: scale.value },
          {translateX: position.value},
          {translateY: verticalPosition.value },
          {scaleX: (isFlipped ? -1 : 1)},
          {rotate: rotate_deg + 'deg'},
        ],
      }));
    
      onResetHandler = () =>{
        setReset(true);
        setRotation(0);
        scale.value = 1;
        position.value = 0;
        verticalPosition.value = 0;
        setDistance(0);
      };
      resetHandler= () =>{
          Alert.alert('Reset', 'Are you sure you want to reset?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Reset', onPress: () => {
              onResetHandler()
              } }
          ]);
      };
    //COLOR PICKER
    const navigation = useNavigation();
    const currentPreview = useSelector(state => state.Preview.currentPreview);

    const handleFolderPress = () => {
      DownloadSheet.current.close();
      navigation.getParent().navigate(' ');
    };

    const handleHomerPress = () => {
      DownloadSheet.current.close();
      navigation.getParent().navigate('Home');
    };


    return(
      <View style={{ flex: 1, justifyContent: 'center'}}>
            <View style={[styles.Container, {backgroundColor: isDarkMode ? '#1d1d1d': '#fff'}]}>
              <View style={styles.header}>
                <Edit_Header onPress={() => 
                  navigation.navigate('PreviewScreen')}/* Back Button */  
                  color={isDarkMode ? '#F2E7FE' : '#4726B3'}/>  
                <Text></Text>
                <Medium_Buttons 
                  onPressFunction={onDownloadHandler}
                  labelArray={{fontSize: 8, flex: -1, lineHeight: 22, marginHorizontal: 0, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0}}
                  title={'Download'}
                  styleArray={{height: 23, width: 60}}
                />
            </View>
            <GestureHandlerRootView>
                <View style={{width: 320.75,
                    height: 692,
                    borderRadius: 30,
                    overflow: 'hidden', // Clip the image when it exceeds the frame
                    marginTop: -10,
                    marginBottom: 10,
                    backgroundColor: colors[ColorValue]}}>
                    <GestureDetector gesture={pinchGesture} simultaneousHandlers={panGesture}>
                        <GestureDetector gesture={panGesture} simultaneousHandlers={pinchGesture}>
                        
                            <Animated.Image 
                            style={[styles.AllImgImageCard, animatedStyle]} 
                            source={{uri: currentPreview}}
                            resizeMode='contain'
                            shouldCancelWhen
                            />
                            
                        
                        </GestureDetector>
                    </GestureDetector>
                </View>
            </GestureHandlerRootView>
            <View style={[styles.toolBar, isDarkMode ? GlobalStyle.On_Surface_Disabled_Darker: {backgroundColor: '#dcdcdc'}]}>
                <Medium_Buttons 
                  onPressFunction={resetHandler}
                  labelArray={{fontSize: 8,  flex: -1, lineHeight: 22, marginHorizontal: 0, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0}}
                  title={'RESET'}
                  styleArray={{height: 23}}
                />
                <Icon_Button
                onPressFunction={onFlipHandler}
                iconChoice={'flip-horizontal'}
                iconColor={isDarkMode ? '#F2E7FE' : '#4726B3'}
                />
                <Icon_Button
                onPressFunction={onRotateHandler}
                iconChoice={'rotate-right'}
                iconColor={isDarkMode ? '#F2E7FE' : '#4726B3'}
                />
                <Icon_Button
                onPressFunction={onBackgroundColorHandler}
                iconChoice={'circle-outline'}
                iconColor={isDarkMode ? '#F2E7FE' : '#4726B3'}
                />
                <Medium_Buttons 
                onPressFunction={doneHandler}
                labelArray={{fontSize: 8,  flex: -1, lineHeight: 22, marginHorizontal: 0, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0}}
                title={'DONE'}
                styleArray={{height: 23}}
                />
              </View> 
        </View>
        <RBSheet
        customStyles={{ container: styles.Colorsheet }}
        height={440}
        openDuration={250}
        ref={ColorSheet}
        >
        <View style={[styles.ColorsheetHeader, {backgroundColor: isDarkMode ? '#383838' : '#fff'}]}>
          <Text style={[styles.ColorsheetHeaderTitle,{color: isDarkMode ? '#F2E7FE' : '#4726B3'}]}>Select Background color</Text>
        </View>
        <View style={[styles.ColorsheetBody, {backgroundColor: isDarkMode ? '#383838' : '#fff'}]}>
          <View style={[styles.Colorprofile, { backgroundColor: colors[ColorValue] }]}>

          </View>
          <View style={styles.Colorgroup}>
            {colors.map((item, index) => {
              const isActive = ColorValue === index;
              return (
                <View key={item}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setColorValue(index);
                    }}>
                    <View
                      style={[
                        styles.Colorcircle,
                        isActive && { borderColor: item },
                        {backgroundColor: isDarkMode ? '#383838' : 'white'}
                      ]}>
                      <View
                        style={[styles.ColorcircleInside, { backgroundColor: item }]}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.Colorbtn}
            onPress={() => {
                ColorSheet.current.close();
            }}>
            <Text style={styles.ColorbtnText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
        <RBSheet
            customStyles={{ container: styles.DownloadSheet }}
            height={440}
            openDuration={250}
            ref={DownloadSheet}
            >
            <View style={[styles.DownloadBody, {backgroundColor: isDarkMode ? '#383838' :'#dce3e1'}]}>
            <View style={styles.DownloadTop}>
                <Image style={styles.DownlaodImg}
                source={{uri: currentPreview}}
                />
                <View style={styles.DownloadSide}>
                    <Text style={[styles.DownloadTitle, {color: isDarkMode ? '#F2E7FE':'#4726B3'}]}>{'Image downloaded to \nyour device!'} </Text>
                    <Medium_Buttons 
                        onPressFunction={handleFolderPress}
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
                style={[styles.DownloadBtn, {backgroundColor: isDarkMode ? '#B5C1BE' : '#fff'}]}
            >
                <Icon_Button
                onPressFunction={handleHomerPress}
                iconChoice={'home'}
                />
            </TouchableOpacity>
            </View>
        </RBSheet>

        <RBSheet
            customStyles={{ 
                container: [styles.RotateSheet, {backgroundColor: isDarkMode ? '#383838' : '#fff'}],
                wrapper: {
                    backgroundColor: "transparent"
                  }
                
            }}
            height={440}
            openDuration={250}
            ref={RotateSheet}
        >
            <Slider
                style={{
                  width: 200, 
                  height: 40, 
                  marginBottom: 20, 
                  backgroundColor: isDarkMode ? '#383838': '#fff'
                }}
                minimumValue={-90}
                maximumValue={90}
                minimumTrackTintColor= '#4726B3'
                maximumTrackTintColor="#4726B3"
                value={distance}
                onValueChange={(val) => {
                    setDistance(val);
                    setRotation(val);
                }}
                    
                />
        </RBSheet>
      </View>
      
    )
  }

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
    },
    toolBar:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      height: '100%'
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
    AllImgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
    AllImgFrame: {
        width: 320.75,
        height: 692,
        borderRadius: 30,
        overflow: 'hidden', // Clip the image when it exceeds the frame
        marginTop: -10,
        marginBottom: 10
    },
    AllImgImageCard: {
      flex: 1,
      width: '100%',
      height: '100%'
    
    },
    RotateSlider:{
      width: '100%',
      height: '100%'
    },
    RotateSheet:{
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        height: 65,
        alignItems: 'center',
        marginTop:0,
        

    },
    DownloadTitle: {
        fontSize: 20,
        fontWeight: '600',
        padding: 10
      },
      DownloadBody: {
        padding: 24,
        paddingTop: 0,
        paddingBottom: 0,
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
        paddingBottom: 0,
      },
      DownlaodImg: {
        width: '30%',
        height: '75%',
        borderRadius:5,
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
    
      },
      ColorsheetHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        paddingHorizontal: 24,
        paddingVertical: 14,
      },
      ColorsheetHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        
      },
      ColorsheetBody: {
        padding: 24,
        
      },
      Colorprofile: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      },
      Colorgroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 12,
      },
      Colorcircle: {
        width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
        height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
        borderRadius: 9999,
        borderWidth: CIRCLE_RING_SIZE,
        borderColor: 'transparent',
        marginRight: 8,
        marginBottom: 12,
      },
      ColorcircleInside: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: 9999,
        position: 'absolute',
        top: CIRCLE_RING_SIZE,
        left: CIRCLE_RING_SIZE,
      },
      Colortext: {
        fontSize: 13,
        fontWeight: '600',
        ...GlobalStyle.Primary_Linear_p_font
      },
      Colorbtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 14,
        borderWidth: 0,
        ...GlobalStyle.Primary_Linear_p_background
      },
      ColorbtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
      },
      Colorcontainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      Colorsheet: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      },
      Colorplaceholder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 400,
        marginTop: 0,
        padding: 24,
      },
      ColorplaceholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      overlayImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        
      },
  });

  /*
  <View style={styles.textCon}>
                <Text style={{color: 'black'}}> 0</Text>
                <Text style={{color: 'black'}}>
                    {distance + ' current'}
                </Text>
                <Text style={{color: 'black'}}> 10 </Text>
            </View>

  */