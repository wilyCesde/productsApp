import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2C2C2",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "#34434D",
    fontWeight: "bold",
  },
  subtitle: {
    margin: 12,
    fontSize: 18,
    color: "gray",
  },
  text: {
    margin: 15,
    fontSize: 14,
    color: "gray",
  },
  textInput: {
    textAlign: "center",
    padding: 10,
    width: "80%",
    height: 50,
    margin: 5,
    borderRadius: 30,
    borderColor: "#34434D",
    backgroundColor: "#D9D9D9",
  },
  button: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#D9D9D9",
    borderRadius: 30,
    padding: 10,
    margin: 5,
    width: "40%",
  },
  item: {
    width: "95%",
    textAlign: "left",
    borderWidth: 2,
    borderColor: "34434D",
    paddingHorizontal: 2,
    margin: 5,
  },
});

export { styles };
