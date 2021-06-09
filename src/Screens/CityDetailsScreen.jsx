import React from "react";
import { Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Text } from "react-native-paper";

const CityDetailsScreen = ({ navigation, route }) => {
  const { params = {} } = route;
  const { item } = params;

  const { name = "", coord = {}, main = {}, wind = {}, weather = [] } = item;

  const { lat: latitude, lon: longitude } = coord;

  const { temp, temp_min, temp_max, humidity } = main;

  const { speed } = wind;

  const [wthr = {}] = weather;

  const { main: weatherType = "", icon: weatherIcon = "" } = wthr;
  const weatherImageURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        camera={{
          center: { latitude, longitude },
          zoom: 8,
          pitch: 0,
          heading: 0,
          altitude: 0,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
      <View style={{ padding: 12 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
            <Text style={{ fontSize: 17, marginTop: 4 }}>{weatherType}</Text>
            <Text style={{ fontSize: 17, marginTop: 4 }}>
              Humidity: {humidity}
            </Text>
            <Text style={{ fontSize: 17, marginTop: 4 }}>
              Wind Speed: {speed}
            </Text>
            <Text style={{ fontSize: 17, marginTop: 4 }}>
              Max. Temp: {temp_max}°c
            </Text>
            <Text style={{ fontSize: 17, marginTop: 4 }}>
              Min. Temp: {temp_min}°c
            </Text>
          </View>
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 33, textAlign: "center" }}>{temp}°c</Text>
            <Image
              source={{ uri: weatherImageURL }}
              style={{ width: 120, height: 120 }}
              resizeMode={"cover"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CityDetailsScreen;
