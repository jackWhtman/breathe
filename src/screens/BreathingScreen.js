import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const BreathingScreen = () => {
  const [phase, setPhase] = useState("Inhale");
  const size = useSharedValue(100);

  useEffect(() => {
    let interval;
    const breathe = () => {
      if (phase === "Inhale") {
        setPhase("Hold");
        size.value = withTiming(200, { duration: 4000 });
      } else if (phase === "Hold") {
        setPhase("Exhale");
        size.value = withTiming(100, { duration: 4000 });
      } else {
        setPhase("Inhale");
      }
    };

    interval = setInterval(breathe, 8000); // 4s inhale, 4s exhale
    return () => clearInterval(interval);
  }, [phase]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]} />
      <Text style={styles.phase}>{phase}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  circle: { backgroundColor: "#add8e6", opacity: 0.8, position: "absolute" },
  phase: { fontSize: 24, fontWeight: "bold", marginTop: 20, color: "#333" },
});

export default BreathingScreen;
