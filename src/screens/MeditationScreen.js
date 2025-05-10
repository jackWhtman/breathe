import React, { useRef, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { styles } from "./styles/meditationScreen";
import { Picker } from "react-native-web";

const sounds_dir = [
  { name: "forest", path: "../../assets/audio/forest_ambient.mp3" },
  { name: "ocean", path: "../../assets/audio/ocean_ambiance_night.mp3" },
  { name: "river", path: "../../assets/audio/river_water.mp3" },
]

const MeditationScreen = () => {
  const [selectedTime, setSelectedTime] = useState(5);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sound, setSound] = useState();
  const [endSound, setEndSound] = useState();
  const [selectedSound, setSelectedSound] = useState(sounds_dir[0].path);
  console.log(selectedSound)
  const timerRef = useRef(null);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require(selectedSound));
    await sound.setIsLoopingAsync(true);
    setSound(sound);
    const { sound: endSound } = await Audio.Sound.createAsync(
      require("../../assets/audio/zen_tone.mp3")
    );
    setEndSound(endSound);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(selectedTime * 60);
    stopEndSound();
    playSound();
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          stopTimer();
        }
        return prev - 1;
      });
    }, 100);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    stopSound();
    playEndSound();
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setTimer(0);
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };
  const playEndSound = async () => {
    if (endSound) {
      await endSound.playAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  const stopEndSound = async () => {
    if (endSound) {
      await endSound.stopAsync();
    }
  };

  useEffect(() => {
    loadSound();
    let intervalId = timerRef.current;
    () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    setTimer(time * 60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meditation Timer</Text>

      {!isTimerRunning && (
        <>
          <Text style={styles.label}>Choose Meditation Minutes</Text>
          <View style={styles.timeButtonsContainer}>
            {[5, 10, 15, 20, 30].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.minutesButton,
                  {
                    backgroundColor:
                      selectedTime === time ? "#FF7F50" : "#FFB07C",
                  },
                ]}
                onPress={() => selectTime(time)}
              >
                <Text style={styles.buttonText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Picker
            selectedValue={selectedSound}
            onValueChange={(itemValue) => { console.log(itemValue); setSelectedSound(itemValue) }}
            style={{ backgroundColor: "#FFF", marginVertical: 10 }}
          >
            {sounds_dir.map((soundObj) => (
              <Picker.Item
                label={soundObj.name}
                value={soundObj.path}
                key={soundObj.name}
              />
            ))}
          </Picker>
        </>
      )}

      <Text style={styles.timerText}>{formatTime(timer)}</Text>

      <View style={styles.buttonsContainer}>
        {!isTimerRunning ? (
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>Start Meditation</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={styles.buttonText}>Stop Meditation</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MeditationScreen;
