import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F0", // Soft background color
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7F50", // Coral color for header
    marginBottom: 20,
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    color: "#FF7F50", // Coral color for labels
    marginBottom: 10,
  },
  timeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  minutesButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of the width and height to make it round
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 400,
    color: "#FF7F50", // Coral color for timer text
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    gap: 15,
    marginBottom: 50,
  },
  button: {
    width: 150, // Adjusted width for better fit
    height: 50, // Adjusted height for better fit
    borderRadius: 25, // Slightly rounded corners
    backgroundColor: "#FF7F50", // Background color
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow direction
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#FF7F50",
  },
});
