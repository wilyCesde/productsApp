import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 52,
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
    backgroundColor: "#fff",
  },
  button: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 30,
    padding: 10,
    margin: 5,
    width: "40%",
  },
  item: {
    width: "95%",
    textAlign: "left",
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 2,
    margin: 5,
  },
});

export { styles };
