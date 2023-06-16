import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import 'react-native-gesture-handler';
import { Gesture, GestureDetector, GestureHandlerRootView, PanGesture, PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';

import Animated, { withTiming, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';


const AnimatedImage = Animated.createAnimatedComponent(Image)
export default function AllInOneImage(props){
  //original values

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
  if(props.isReset == true){
    console.log('RESET')
  }
  
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
  // .onEnd((e) => {
  //   if (position.value > END_POSITION / 2) {
  //     position.value = withTiming(END_POSITION, { duration: 100 });
  //     onLeft.value = false;
  //   } else {
  //     position.value = withTiming(0, { duration: 100 });
  //     onLeft.value = true;
  //   }
  //   if (verticalPosition.value > END_VERTICAL_POSITION / 2) {
  //     verticalPosition.value = withTiming(END_VERTICAL_POSITION, { duration: 100 });
  //     onTop.value = false;
  //   } else {
  //     verticalPosition.value = withTiming(0, { duration: 100 });
  //     onTop.value = true;
  //   }
  // });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: props.isReset ? 0: scale.value },
      {translateX: position.value},
      {translateY: verticalPosition.value },
      {scaleX: (props.isFlipped ? -1 : 1)},
    ],
  }));
  
  return (
    <GestureHandlerRootView>
      <View style={styles.frame}>
      <GestureDetector gesture={pinchGesture} simultaneousHandlers={panGesture}>
        <GestureDetector gesture={panGesture} simultaneousHandlers={pinchGesture}>
          
            <Animated.Image 
            style={[styles.imageCard, animatedStyle]} 
            source={require('../assets/felix1.jpg')}
            resizeMode='contain'
            shouldCancelWhen
            />
          
        </GestureDetector>
      </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      frame: {
        width: 320.75,
        height: 692,
        borderRadius: 30,
        overflow: 'hidden', // Clip the image when it exceeds the frame
        marginTop: -10,
        marginBottom: 10,
        backgroundColor: 'blue'
      },
    imageCard: {
      flex: 1,
      width: '100%',
      height: '100%'
      
    },
});