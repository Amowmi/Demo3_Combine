import { StyleSheet} from 'react-native';

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
        //fontFamily: 'Raleway'
    },
    Global_font: {
        //fontFamily: 'Raleway'
    },
  });