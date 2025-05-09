import { Text, TouchableOpacity } from "react-native";
import { breathingScreenStyles as styles } from "../screens/styles/breathingScreen";
import styled from "styled-components/native";
const Card = styled.TouchableOpacity`
  box-shadow: 10px 10px 4px #ff7f50;
  width: 90%;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const BreathingCard = ({
  title,
  description,
  instructions,
  onPress,
  selected,
}) => (
  <Card
    onPress={onPress}
    style={[
      {
        backgroundColor: selected ? "#fd9772" : "#FFF",
        elevation: 10,
      },
    ]}
  >
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
    <Text style={styles.cardInstructions}>{instructions}</Text>
  </Card>
);

export default BreathingCard;
