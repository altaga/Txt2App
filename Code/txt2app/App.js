 
import React, { useState, useRef } from 'react';
import { Alert, View, Text, Button, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState('');
  const timerRef = useRef();

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  const updateTime = () => {
    const date = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    setTime(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7F7" />
      <View style={styles.counterSection}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <View style={styles.buttonSection}>
        <Button title="Up" onPress={increment} color="#2F4F7F" />
        <Button title="Down" onPress={decrement} color="#2F4F7F" />
        <Button title="Time" onPress={updateTime} color="#2F4F7F" />
      </View>
      {time !== '' && (
        <View style={styles.timeSection}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterSection: {
    width: '80%',
    height: '40%',
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 32,
    color: '#2F4F7F',
    fontWeight: 'bold',
  },
  buttonSection: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  timeSection: {
    width: '80%',
    height: '15%',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  timeText: {
    fontSize: 24,
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default App;
