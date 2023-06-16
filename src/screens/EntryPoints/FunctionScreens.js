import Setting from './Setting'; // Home
//import FolderPage from '../folderPage';
import FolderBox from './FolderBox';

import { createStackNavigator } from '@react-navigation/stack';

import { useNavigation } from '@react-navigation/native';

Stack = createStackNavigator();
export default function FunctionScreens() {
  const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName="Setting" >
          <Stack.Screen name="Setting" component={Setting} options={{headerShown: false,}}  /* This is Home */ /> 
          <Stack.Screen name="FolderBox" component={FolderBox} options={{headerShown: false,}}/>
        </Stack.Navigator>
    );
  }