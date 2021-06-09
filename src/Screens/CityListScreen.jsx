import React, { useState, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { List, Divider, Text } from "react-native-paper";
import * as Notifications from "expo-notifications";
import axios from "axios";
import * as Location from "expo-location";

import { OpenWeatherMapAPI, APIs } from "../Common/Const";
import ScreenWrapper from "../Components/ScreenWrapper/ScreenWrapper";

const CityListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [tappedNotification, setTappedNotification] = useState(undefined);

  useEffect(() => {
    if (data.length === 0) {
      setCurrentLocationNotification();
      loadData();
      Notifications.addNotificationResponseReceivedListener(
        ({ notification }) => {
          console.log({ ...notification });
          setTappedNotification(notification);
          setCurrentLocationNotification();
          clearCurrentLocationInterval();
          startIntervalOfCurrentLocationNotification();
        }
      );
      startIntervalOfCurrentLocationNotification();
    }
  }, []);

  useEffect(() => {
    if (tappedNotification && data.length > 0) {
      navigation.push("CityDetailsScreen", { item: data[0] });
      setTappedNotification(undefined);
    }
  }, [tappedNotification, data]);

  let { current: repeatingTimer } = useRef(undefined);

  const startIntervalOfCurrentLocationNotification = () => {
    repeatingTimer = setInterval(() => {
      setCurrentLocationNotification();
    }, 60 * 1000);
  };

  const clearCurrentLocationInterval = () => {
    if (repeatingTimer) {
      clearInterval(repeatingTimer);
    }
  };

  const setCurrentLocationNotification = async () => {
    try {
      console.log("Loading Current Location's Weather");

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location Permission Denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      const { data } = await axios.get(APIs.CurrentLocationWeather, {
        params: {
          lat: latitude,
          lon: longitude,
          units: "metric",
          appid: OpenWeatherMapAPI,
        },
      });
      const { main } = data;
      const { temp } = main;
      await Notifications.dismissAllNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Current Temperature",
          body: `${temp}°c`,
          sticky: true,
        },
        trigger: null,
      });
    } catch (error) {
      console.log(error);
    }
    // await Utils.sleep(60);
    // setNotification();
  };

  const loadData = async () => {
    const { data } = await axios.get(APIs.CityList, {
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
  };

  const renderItem = ({ item }) => (
    <CityListItem item={item} onPress={() => onItemPress(item)} />
  );

  const onItemPress = (item) => navigation.push("CityDetailsScreen", { item });

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

const CityListItem = ({ item, onPress }) => {
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
        onPress={onPress}
      />
      <Divider />
    </>
  );
};

export default CityListScreen;
