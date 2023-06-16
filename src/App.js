
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import  {createStackNavigator} from '@react-navigation/stack';
import FunctionScreens from './screens/EntryPoints/FunctionScreens';
import Log_and_Tuto from './screens/EntryPoints/Log_and_Tuto';
import TutorialScreens from './screens/EntryPoints/TutorialScreens';



import Toast from 'react-native-toast-message';
const Stack = createStackNavigator();
const isDarkMode = true;
const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white', // 设置背景颜色
    primary: 'blue', // 设置主要颜色
    text: 'black', // 设置文本颜色
    card: '#1E1E1E', // 设置卡片颜色
    border: '#1E1E1E', // 设置边框颜色
    notification: 'yellow', // 设置通知颜色
    headerTintColor: 'white', // 设置标题栏文本颜色
    // 添加其他您想要更改的颜色属性...
  },
};
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white', // 设置背景颜色
    primary: 'blue', // 设置主要颜色
    text: 'black', // 设置文本颜色
    card: 'white', // 设置卡片颜色
    border: 'white', // 设置边框颜色
    notification: 'yellow', // 设置通知颜色
    headerTintColor: 'white', // 设置标题栏文本颜色
    // 添加其他您想要更改的颜色属性...
  },
};
export default function App() {
  return (
    <>
    <NavigationContainer theme={isDarkMode ? DarkTheme :LightTheme } >


        <Stack.Navigator initialRouteName="loginScreens" >
            <Stack.Screen
              options={{headerShown: false,}}
              name = 'loginScreens'
              component = {Log_and_Tuto}
              >
            </Stack.Screen>
            <Stack.Screen
              options={{headerShown: false,}}
              name = 'FunctionScreens'
              component = {FunctionScreens}
              >
            </Stack.Screen>
            <Stack.Screen
              options={{headerShown: false,}}
              name = 'TutorialScreens'
              component = {TutorialScreens}
              >
            </Stack.Screen>



        
        </Stack.Navigator>
      
    </NavigationContainer>
    <Toast />
    </>
      
  );
}


//<FolderPage></FolderPage>
