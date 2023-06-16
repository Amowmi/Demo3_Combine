import Tutorial1 from '../Tutorial1';
import Tutorial2 from '../Tutorial2';
import Tutorial3 from '../Tutorial3';
import Tutorial4 from '../Tutorial4';
import Tutorial5 from '../Tutorial5';
import Tutorial6 from '../Tutorial6';

import { createStackNavigator } from '@react-navigation/stack';

Stack = createStackNavigator();
export default function TutorialScreens() {
    return (
        <Stack.Navigator initialRouteName="Tutorial1" >
          <Stack.Screen name="Tutorial6" component={Tutorial6} options={{headerShown: false,}}/>
          <Stack.Screen name="Tutorial5" component={Tutorial5} options={{headerShown: false,}}/>
          <Stack.Screen name="Tutorial4" component={Tutorial4} options={{headerShown: false,}}/>
          <Stack.Screen name="Tutorial3" component={Tutorial3} options={{headerShown: false,}}/>
          <Stack.Screen name="Tutorial2" component={Tutorial2} options={{headerShown: false,}}/>
          <Stack.Screen name="Tutorial1" component={Tutorial1} options={{headerShown: false,}}/>
        </Stack.Navigator>
    );
  }