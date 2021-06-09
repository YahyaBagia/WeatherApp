import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from "react-native-paper";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";

import { Colors, FontAssets } from "./src/Common/Const";

import NavBar from "./src/Components/NavBar/NavBar";

import CityListScreen from "./src/Screens/CityListScreen";
import CityDetailsScreen from "./src/Screens/CityDetailsScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      ...FontAssets,
    });
    setFontsLoaded(true);
  };

  const fontConfig = {
    default: {
      regular: {
        fontFamily: "Roboto-Regular",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "Roboto-Medium",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "Roboto-Light",
        fontWeight: "normal",
      },
      thin: {
        fontFamily: "Roboto-Thin",
        fontWeight: "normal",
      },
      bold: {
        fontFamily: "Roboto-Bold",
        fontWeight: "normal",
      },
    },
  };

  if (!fontsLoaded) return <AppLoading />;

  return (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: Colors.Primary,
          accent: Colors.Primary,
        },
        fonts: configureFonts(fontConfig),
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ header: (props) => <NavBar {...props} /> }}
        >
          <Stack.Screen name="CityListScreen" component={CityListScreen} />
          <Stack.Screen
            name="CityDetailsScreen"
            component={CityDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </PaperProvider>
  );
};

export default App;
