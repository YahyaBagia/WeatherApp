import React from "react";
import { Appbar } from "react-native-paper";
import { Colors } from "../../Common/Const";

const NavBar = ({ navigation, scene, previous }) => {
  const { title = "WeatherApp" } = scene.descriptor.options;

  return (
    <Appbar.Header>
      {previous && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content
        title={title}
        titleStyle={{ textAlign: "center" }}
        style={{ alignItems: "stretch", paddingHorizontal: 0 }}
      />
      {previous && <Appbar.Action icon={"circle"} color={Colors.Primary} />}
    </Appbar.Header>
  );
};

export default NavBar;
