import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import MyTabs from './src/Components/MyTabs';
import Registarion from './src/Components/RegistrationScreen';
import LoginSreen from './src/Components/LogInSreen';

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer detachInactiveScreens={true}>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={Registarion}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginSreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
