import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import BreathingScreen from "./src/screens/BreathingScreen";
import MeditationScreen from "./src/screens/MeditationScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Meditate"
          component={MeditationScreen}
          options={{ headerShown: true }}
        />
        <Tab.Screen
          name="Breathe"
          component={BreathingScreen}
          options={{ headerShown: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
