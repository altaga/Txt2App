import React, {useState, useEffect} from 'react';
import {
  Animated,
  Button,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  SectionList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  AppState,
  BackHandler,
  Dimensions,
  HapticFeedback,
  Linking,
  NativeModules,
  PermissionsAndroid,
  Platform,
  Settings,
  Share,
  ToastAndroid,
  Vibration,
  Keyboard,
  PixelRatio,
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
  Slider,
  Switch,
} from 'react-native';

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await fetch(
        'https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/board-of-directors/jensen-huang.jpg',
      );
      setImageUrl(response.url);
    } catch (err) {
      Alert.alert('Error', 'Failed to load image');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !imageUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load image</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.title}>Jensen Huang</Text>
      <Text style={styles.subtitle}>CEO of NVIDIA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150, // To make the image circular, adjust as needed for square aspect ratio
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    color: '#008000', // Green color for the title
  },
  errorText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default App;
