import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { breathingScreenStyles as styles } from "./styles/breathingScreen";
import BreathingCard from "../components/BreathingCard";
import styled from "styled-components/native";

const BreathingWrapper = styled.View`
  border: 1px solid #ff7f50;
  background-color: ${({ size }) => (size === 100 ? "#ff7f50" : "")};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const breathingConfigs = {
  "4-7-8": { inhale: 4000, hold: 7000, exhale: 8000 },
  Box: { inhale: 4000, hold: 4000, exhale: 4000 },
  Deep: { inhale: 6000, hold: 8000, exhale: 10000 },
};

const breathingInfo = {
  "4-7-8": {
    title: "4-7-8 Breathing",
    description:
      "This technique helps reduce stress, anxiety, and helps you fall asleep faster.",
    instructions:
      "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.",
  },
  Box: {
    title: "Box Breathing",
    description:
      "Box breathing improves focus, reduces stress, and helps with emotional regulation.",
    instructions:
      "Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds.",
  },
  Deep: {
    title: "Deep Breathing",
    description: "Deep breathing helps reduce tension and promotes relaxation.",
    instructions:
      "Inhale deeply for 6 seconds, hold for 8 seconds, exhale for 10 seconds.",
  },
};

const BreathingScreen = () => {
  const [phase, setPhase] = useState("Inhale");
  const [isRunning, setIsRunning] = useState(false);
  const [breathingType, setBreathingType] = useState("4-7-8");
  const size = useSharedValue(100);
  const timerRef = useRef(null);
  const phaseIndex = useRef(0);

  const phases = ["Inhale", "Hold", "Exhale", "End"];

  const startBreathing = () => {
    setIsRunning(true);
  };

  const stopBreathing = () => {
    setIsRunning(false);
    phaseIndex.current = 0;
    size.value = 100;
  };

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const runBreathingCycle = () => {
    function cycle(inp) {
      if (!isRunning) return;
      console.log(`cycle`, isRunning, inp);
      const currentPhase = phases[phaseIndex.current];
      setPhase(currentPhase);

      const config = breathingConfigs[breathingType];
      const duration = config[currentPhase.toLowerCase()];

      if (currentPhase === "Inhale" || currentPhase === "Exhale") {
        size.value = withTiming(currentPhase === "Inhale" ? 300 : 100, {
          duration: duration,
          easing: Easing.inOut(Easing.ease),
        });
        timerRef.current = setTimeout(() => {
          phaseIndex.current = (phaseIndex.current + 1) % phases.length;
          cycle("me");
        }, duration);
      } else if (currentPhase === "Hold") {
        timerRef.current = setTimeout(() => {
          phaseIndex.current = (phaseIndex.current + 1) % phases.length;
          cycle("hold");
        }, duration);
      } else if (currentPhase === "End") {
        timerRef.current = setTimeout(() => {
          phaseIndex.current = (phaseIndex.current + 1) % phases.length;
          cycle("end");
        }, 3000);
      }
    }

    cycle();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
  }));

  useEffect(() => {
    if (isRunning) {
      runBreathingCycle();
    }
    return () => {
      clearTimers();
    };
  }, [isRunning]);

  return (
    <View style={styles.container}>
      {!isRunning ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {Object.keys(breathingInfo).map((key) => (
              <BreathingCard
                key={key}
                selected={breathingType === key}
                title={breathingInfo[key].title}
                description={breathingInfo[key].description}
                instructions={breathingInfo[key].instructions}
                onPress={() => setBreathingType(key)}
              />
            ))}
          </ScrollView>
          <TouchableOpacity onPress={startBreathing} style={styles.startButton}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.breathingContainer}>
            <BreathingWrapper size={300}>
              <Animated.View style={[animatedStyle, styles.animatedCircle]}>
                <BreathingWrapper size={100}>
                  <Text style={styles.phaseText}>
                    {phase === "End" ? "Hold" : phase}
                  </Text>
                </BreathingWrapper>
              </Animated.View>
            </BreathingWrapper>
          </View>
          <TouchableOpacity onPress={stopBreathing} style={styles.stopButton}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default BreathingScreen;
