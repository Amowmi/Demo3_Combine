import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import GlobalStyle from '../../utils/GlobalStyle';

const colors = [
  '#f44336',
  '#f4ab36',
  '#fde176',
  '#75da69',
  '#69c7da',
  '#C6B8FF',
  '#f2a4b5',
  '#86e2c2',
  '#8b86e2',
  '#94939c',
  '#000000',
  '#e2e0dd',
];

const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;

export default function ColorPicker(props) {
  const [ColorValue, setColorValue] = React.useState(0);
  const ColorSheet = React.useRef();

  if(props.isBackground == true){
    ColorSheet.current.open();
    console.log('BACKGROUND');
  }

  React.useEffect(() => {
    ColorSheet.current.close();
  }, []);

  return (
      <RBSheet
        customStyles={{ container: styles.Colorsheet }}
        height={440}
        openDuration={250}
        ref={ColorSheet}
        >
        <View style={styles.ColorsheetHeader}>
          <Text style={styles.ColorsheetHeaderTitle}>Select Background color</Text>
        </View>
        <View style={styles.ColorsheetBody}>
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

  );
}

const styles = StyleSheet.create({
  ColorsheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  ColorsheetHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
    ...GlobalStyle.Primary_Linear_p_font
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
    backgroundColor: 'white',
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
    borderWidth: 1,
    borderColor: '#fff',
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
});