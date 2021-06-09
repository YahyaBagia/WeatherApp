import React from "react";
import { Appbar } from "react-native-paper";

const NavBar = ({ navigation, scene, previous }) => {
  const { title = "WeatherApp" } = scene.descriptor.options;

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={title}
        titleStyle={{ textAlign: "center" }}
        style={{ alignItems: "stretch", paddingHorizontal: 0 }}
      />
    </Appbar.Header>
  );
};

export default NavBar;
