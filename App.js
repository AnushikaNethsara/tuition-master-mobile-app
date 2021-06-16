import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "./src/consts/colors";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import BottomNavigator from "./src/views/navigation/BottomNavigator";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import ViewLessonScreen from "./src/views/screens/ViewLessonScreen";
import Signup from "./src/views/screens/Signup";
import Login from "./src/views/screens/Login";
import Player from "./src/views/screens/Example";
import EditAccount from "./src/views/screens/EditAccountScreen"

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="ViewLessonScreen" component={ViewLessonScreen} />
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="SignUpScreen" component={Signup} />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="EditAccountScreen" component={EditAccount} />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
