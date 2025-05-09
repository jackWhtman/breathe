import { View, Text } from "react-native";
import { homeScreenStyles as styles } from "./styles/homeScreen";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start you journey to a peaceful life</Text>
    </View>
  );
};

export default HomeScreen;
