import { StyleSheet, Platform } from "react-native";

export const breathingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#FF7F50",
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    borderStyle: "solid",
    borderColor: "#FF7F50",
    borderWidth: 1,

    ...Platform.select({
      ios: {
        shadowColor: "#FF7F50",
        shadowOffset: { width: 10, height: 15 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  cardInstructions: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  startButton: {
    backgroundColor: "#FF7F50",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        // Specific styles for iOS, if any (e.g., shadow, font size, etc.)
      },
      android: {
        // Adjustments for Android, if needed (e.g., elevation, padding, etc.)
      },
    }),
  },
  stopButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#FF7F50",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  breathingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  animatedCircle: {
    backgroundColor: "#FF7F5099",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  phaseText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
