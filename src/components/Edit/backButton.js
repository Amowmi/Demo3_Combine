import * as React from 'react';
import { Appbar } from 'react-native-paper';
import GlobalStyle from '../../utils/GlobalStyle';

function Edit_Header(props) {
    const navigateHandler = () => {
        navigation.navigate('PreviewScreen');
      };
    return(
        <Appbar.BackAction 
            onPress={props.onPress} 
            {...GlobalStyle.Primary_Linear_p_font}
            size={18}
           
        />
    );
        
};

export default Edit_Header;

