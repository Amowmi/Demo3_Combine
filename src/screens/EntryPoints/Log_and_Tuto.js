import Logging from '../Logging';
import StartPage from '../StartPage';
import LoadingPage from '../LoadingPage';
import Login from '../Login';
import { createStackNavigator } from '@react-navigation/stack';

Stack = createStackNavigator();
export default function Log_and_Tuto() {
  
    return (
    
      
        <Stack.Navigator initialRouteName="Login" >

          <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/> 
          <Stack.Screen name="Logging" component={Logging} options={{headerShown: false,}}/>
          <Stack.Screen name="StartPage" component={StartPage} options={{headerShown: false,}}/>
          <Stack.Screen name="Loading" component={LoadingPage} options={{headerShown: false,}}/>

        </Stack.Navigator>
      
      
    );
  }