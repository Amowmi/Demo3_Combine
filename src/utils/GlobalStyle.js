import { StyleSheet} from 'react-native';
import { useFonts } from '@expo-google-fonts/raleway';
import { useFonts as usePoppins } from '@expo-google-fonts/poppins';

/*
const [fontsLoaded] = useFonts({
    raleway: require(),
 });
const [poppinsLoaded] = useFonts({
    'poppins': require('@expo-google-fonts/poppins'),
});
*/
export default StyleSheet.create({
    CustomFontBig: {
        fontFamily: 'AbrilFatface-Regular'
    },
    CustomFontHW: {
        fontFamily: Platform.OS === 'ios' ? 'IndieFlower' : 'IndieFlower-Regular'
    },
    Primary_Linear_p: {
        backgroundColor: '#8569F6'
    },
    Surface_light:{
        backgroundColor: '#ffffff'
    },
    Surface_dark:{
        backgroundColor: '#1E1E1E'
    },
    Surface_light_font:{
        color: '#000000'
    },
    Surface_dark_font:{
        color: '#ffffff'
    },
    Primary_Linear_p_font: {
        
        color: '#4726B3'
    },
    Primary_Linear_p_button: {

        buttonColor : '#4726B3'
    },
    Primary_Linear_p_background: {

        backgroundColor : '#4726B3'
    },
    Primary_Linear_p_light_font: {
        
        color :  '#7D7DFF'
    },
    Primary_light_p: {
        
        color :  '#F2E7FE'
    },
    On_Surface_Disabled: {
        
        backgroundColor :  '#F2F2F2'
    },

    Global_title: {
        //fontFamily: 'raleway'
    },
    Global_font: {
        //fontFamily: 'poppins'
    },
  });