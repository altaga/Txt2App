import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#5bc1d1" />

      <View style={styles.content}>
        <img src={"./assets/Txt2App.png"} style={{ width: 150, height: 150,  border:"solid 3px black", borderRadius:"50%" }} />
        <Text style={styles.textContent}>{"Welcome to\nTxt 2 App!"}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5bc1d1",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  textContent: {
    fontSize: 32,
    color: "black",
    textAlign: "center",
  },
});

export default App;
