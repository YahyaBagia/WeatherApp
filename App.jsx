import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import NavBar from "./src/Components/NavBar/NavBar";

import CityListScreen from "./src/Screens/CityListScreen";
import CityDetailsScreen from "./src/Screens/CityDetailsScreen";
import { Colors } from "./src/Common/Const";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.Primary,
    accent: Colors.Primary,
  },
};

const App = () => (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ header: (props) => <NavBar {...props} /> }}
      >
        <Stack.Screen name="CityListScreen" component={CityListScreen} />
        <Stack.Screen name="CityDetailsScreen" component={CityDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style="light" />
  </PaperProvider>
);

export default App;
