import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image, Button, Pressable, Alert, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Medium_Buttons from '../components/Edit/CustomButton';
import Icon_Button from '../components/Edit/IconButton';
import GlobalStyle from '../utils/GlobalStyle';
import Edit_Header from '../components/Edit/backButton';
import Slider from '@react-native-community/slider';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import {setPreviewMode, SetEdit, ResetEdit} from '../actions/Actions';
import SelectMode from '../components/Preview/Icons/SelectMode';


import { useNavigation } from '@react-navigation/native';

import 'react-native-gesture-handler';
import { Gesture, GestureDetector, GestureHandlerRootView, PanGesture, PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';

import Animated, { withTiming, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;
var lockVisible = 1;
var homeVisible = 0;
var OriginalVisible = 0;
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
    const {isDarkMode, previewMode} = useSelector(state => state.Mode);
    const currentFolder = useSelector(state => state.Folder.currentFolder);
    const currentPreview = useSelector(state => state.Preview.currentPreview);
    const previewList = useSelector(state => state.Preview.previewList);
    
    const dispatch = useDispatch();
    // const {scale_Edit, positionX_Edit, positionY_Edit, isFlipped_Edit, distance_Edit, ColorValue_Edit} = useSelector(state => state.Edit);
    
    // select mode functions
    const [isOpen, setIsOpen] = useState(false);
    const OnSelectPress = () =>{
      setIsOpen(!isOpen);
    };
    const onOriginalPress = () => {
      setIsOpen(!isOpen);
      dispatch(setPreviewMode('Original'));
    };
    const onHomePress = () => {
      setIsOpen(!isOpen);
      dispatch(setPreviewMode('Home'))
    };
    const onLockPress = () => {
      setIsOpen(!isOpen);
      dispatch(setPreviewMode('Lock'))
    };
    console.log("preview mode is");
    console.log(previewMode);
    if(previewMode == 'Lock'){
      lockVisible = 1;
      homeVisible = 0;
      OriginalVisible = 0;
    }
    else if(previewMode =='Original'){
      lockVisible = 0;
      homeVisible = 0; 
      OriginalVisible = 1;
    }
    else{
      lockVisible = 0;
      homeVisible = 1;
      OriginalVisible = 0;
    }


    var previewID = 0;
    for(i = 0; i < previewList[currentFolder].length; i++){
      if(previewList[currentFolder][i].URL == currentPreview){
        previewID = i;
      }
    }
    console.log(previewList[currentFolder][previewID].ColorValue_Edit);

    
    console.log('Flip : ', previewList[currentFolder][previewID].isFlipped_Edit);
    

    const [isFlipped, setFlipped] = useState(previewList[currentFolder][previewID].isFlipped_Edit);
    const [isReset, setReset] = useState(false);
    // const [isBackground, setBackground] = useState(false);
    // const [isDownload, setDownload] = useState(false);
    const [distance, setDistance] = useState(previewList[currentFolder][previewID].distance_Edit);
    const [rotate_deg, setRotation] = useState(previewList[currentFolder][previewID].distance_Edit);
    // const [value, setValue] = React.useState(0);
    const [ColorValue, setColorValue] = useState(previewList[currentFolder][previewID].ColorValue_Edit);
    
    //pinch
    const scale = useSharedValue(previewList[currentFolder][previewID].scale_Edit);
    const savedScale = useSharedValue(previewList[currentFolder][previewID].scale_Edit);
    //pan
    const END_POSITION = 200;
    const onLeft = useSharedValue(true);
    const position = useSharedValue(previewList[currentFolder][previewID].positionX_Edit);
    //pan vertical movement
    const END_VERTICAL_POSITION = 200;
    const onTop = useSharedValue(true);
    const verticalPosition = useSharedValue(previewList[currentFolder][previewID].positionY_Edit);
    
    //distance for slider
    //setDistance(distance_Edit);
    //color
    //setColorValue(ColorValue_Edit);
    //flip
    //setFlipped(isFlipped_Edit);


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

    const onFlipHandler= () =>{
        setFlipped(!isFlipped);
    };
    
    const onBackgroundColorHandler = () => {
        ColorSheet.current.open();
    };
    const onRotateHandler = () => {
        RotateSheet.current.open();
    };
    const onDownloadHandler= () =>{
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
    
    
      const onResetHandler = () =>{
        setReset(true);
        setRotation(0);
        scale.value = 1;
        position.value = 0;
        verticalPosition.value = 0;
        setDistance(0);
      };
      const resetHandler= () =>{
          Alert.alert('Reset', 'Are you sure you want to reset?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Reset', onPress: () => {
              onResetHandler()
              } }
          ]);
      };
      const doneHandler = () => {
        //console.log('currentFolder 1  :', currentFolder);
        dispatch(SetEdit(currentFolder, currentPreview, scale.value, position.value, verticalPosition.value, isFlipped, distance, ColorValue));
        Alert.alert('Done', 'It is saved', [{ text: 'OK' }]);
        //console.log('currentFolder 2  :', currentFolder);
        //navigation.navigate('PreviewScreen');
      };
    //COLOR PICKER
    const navigation = useNavigation();
    

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
        <Modal transparent visible={isOpen}  >
          <Pressable  onPress={OnSelectPress} style={styles.modal2}>
            <View style={styles.modal}>
              <Text style={[styles.title, GlobalStyle.Primary_Linear_p_font]}>Select Mode</Text>
              <View style={styles.madalbutton}>
                <TouchableHighlight onPress={onOriginalPress} style={[styles.button,GlobalStyle.Primary_Linear_p]}>
                  <Text style={styles.buttonfont}>Original</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={onHomePress} style={[styles.button,GlobalStyle.Primary_Linear_p]}>
                  <Text style={styles.buttonfont}>HomeScreen</Text>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={onLockPress} style={[styles.button,GlobalStyle.Primary_Linear_p]}>
                  <Text style={styles.buttonfont}>LockScreen</Text>
                 </TouchableHighlight>
              </View>
            </View>
          </Pressable>
        </Modal>
            <View style={[styles.Container, {backgroundColor: isDarkMode ? '#1d1d1d': '#fff'}]}>
              <View style={styles.header}>
                <Edit_Header onPress={() =>  
                  navigation.navigate('PreviewScreen')} /* Back Button */  
                  color={isDarkMode ? '#F2E7FE' : '#4726B3'}/>  
                <Text>
                  <SelectMode PressHandler = {OnSelectPress}/>
                </Text>
                <Medium_Buttons 
                
                  onPressFunction={onDownloadHandler} /* Download Button */  
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
                    
                    <View style={styles.overlayView} >
                      <Image 
                        source={require('../../assets/img/lockTop.png')}
                        style={previewMode=='Lock'?styles.overlayImage_lock:styles.invisible}

                      />
                    </View>
                    <View style={styles.overlayView} >
                      <Image 
                        source={require('../../assets/img/home_Top.png')}
                        style={previewMode=='Home'?styles.overlayImage_home:styles.invisible}

                      />
                    </View>
                </View>
            </GestureHandlerRootView>
            <View style = {OriginalVisible? styles.toolBackground : styles.invisible}></View>
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
                container: styles.RotateSheet,
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
      zIndex:2,
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
        position: 'absolute',
        Top: 76,
        left: 35,
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
      overlayView: {
        position: 'absolute',
        alignSelf: 'center',
        
        
      },
      overlayImage_lock: {
        resizeMode: 'cover',
        flex: 1,
        height: 200,
        width: 300,
        opacity: lockVisible
      },
      overlayImage_home: {
        resizeMode: 'cover',
        flex: 1,
        height: 280,
        width: 280,
        //opacity: homeVisible
      },
      modal2:{ // Modal Background
        flex:1,
        width: '100%',
        alignItems:'center',
        backgroundColor:'#888888',
        //opacity:0.9
      },
      modal:{ // Modal
        opacity:1,
        width:'100%',
        height:180,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
      },
      title:{
        fontWeight: 'bold',
        fontSize:23,
        paddingTop: 40
      },
      button:{
        // zIndex:1,
        // position: 'absolute',
        justifyContent: 'center',
        height: 30,
        width: '27%',
        alignItems: 'center',
        margin: 7,
        borderRadius: 20,
      },
      madalbutton:{
        flexDirection: 'row',
        margin:10
      },
      buttonfont: {
        color: '#ffffff'
      },
      invisible: {
        opacity: 0,
      },
      toolBackground: {
        zIndex: 9,
        position:'absolute',
        backgroundColor:'#dcdcdc',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        top:800.5,
        height: 70
        }

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
 //, {backgroundColor: isDarkMode ? '#383838' : '#fff'}

 /*

 <View style={styles.overlayView} >
                      <Image 
                        source={require('../../assets/img/lock_Bottom.png')}
                        style={styles.overlayImage_lock}

                      />
                    </View>
  */