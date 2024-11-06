import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffeb3b" />
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}> Building your app </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffeb3b",
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
    fontSize: 32,
    color: "black",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: {
    fontSize: 24,
    color: "#fff",
  },
});

export default App;
