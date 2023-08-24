import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AssigningScreen from "./screens/AssigningScreen";
import ReturningScreen from "./screens/ReturningScreen";
import ShowBookScreen from "./screens/ShowBookScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Početna strana"
          component={HomeScreen}
          options={{
            title: "Biblioteka",
            headerStyle: {
              backgroundColor: "#c75d2c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Zaduživanje"
          component={AssigningScreen}
          options={{
            title: "Zaduživanje knjige",
            headerStyle: {
              backgroundColor: "#c75d2c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Razduživanje"
          component={ReturningScreen}
          options={{
            title: "Razduživanje knjige",
            headerStyle: {
              backgroundColor: "#c75d2c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Prikaz knjige"
          component={ShowBookScreen}
          options={{
            title: "Prikaz knjige",
            headerStyle: {
              backgroundColor: "#c75d2c",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
