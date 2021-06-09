import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { List, Divider, Text } from "react-native-paper";
import axios from "axios";

import { OpenWeatherMapAPI, WeatherAPI } from "../Common/Const";
import ScreenWrapper from "../Components/ScreenWrapper/ScreenWrapper";

const HomeScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const { data } = await axios.get(WeatherAPI, {
      params: {
        lat: 23.68,
        lon: 90.35,
        cnt: 50,
        units: "metric",
        appid: OpenWeatherMapAPI,
      },
    });
    const { message, cod, count, list } = data;
    setData(list);
    console.log(list);
    console.log(typeof list);
  };

  const renderItem = ({ item }) => <CityListItem item={item} />;

  return (
    <ScreenWrapper>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </ScreenWrapper>
  );
};

const CityListItem = ({ item }) => {
  const { name = "", weather = [], main = {} } = item;
  const { temp } = main;
  const [wthr = {}] = weather;
  const { main: weatherType = "" } = wthr;
  return (
    <>
      <List.Item
        title={name}
        description={weatherType}
        right={() => (
          <Text style={{ fontSize: 33, textAlignVertical: "center" }}>
            {temp}°c
          </Text>
        )}
        style={{ backgroundColor: "white" }}
        descriptionStyle={{ marginTop: 12 }}
      />
      <Divider />
    </>
  );
};

export default HomeScreen;
