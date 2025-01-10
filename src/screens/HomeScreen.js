import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to MyMeditationApp</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default HomeScreen;
