import re

# Import necessary modules to ensure the app render and compiles correctly
imports = "import { Animated, Button, View, Text, Image, TextInput, ScrollView, FlatList, SectionList, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable, AppState, BackHandler, Dimensions, HapticFeedback, Linking, NativeModules, PermissionsAndroid, Platform, Settings, Share, ToastAndroid, Vibration, Keyboard, PixelRatio, LayoutAnimation, SafeAreaView, StyleSheet, ActivityIndicator, Alert, Modal, RefreshControl, Slider, Switch } from 'react-native';"

def emptyprompt():
    # If the user doesn't provide a prompt, use a default one to ensure the model receives an app description properly.
    return '''
    App Description: This app displays the image of Jensen Huang, the CEO of NVIDIA, from the official NVIDIA website. The app is designed to be simple and easy to use, with a focus on displaying the image in a clear and concise manner.
    
    App Features:
    
    A single screen app that displays the image of Jensen Huang
    The image is fetched from the API: https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/board-of-directors/jensen-huang.jpg
    The app uses the Image component from React Native to display the image
    The app handles errors and loading states for the image
    The app displays a loading indicator while the image is being fetched
    The app displays an error message if an error occurs while fetching the image
    The app allows the user to view the image in a clear and concise manner
    App Design:
    
    The app has a simple and clean design, with a focus on displaying the image
    The app uses a white background to make the image stand out
    The image is displayed in a square shape, with a width and height of 300 pixels
    The app uses a font size of 18 pixels for the error message, and a font color of black
    The app uses a loading indicator with a size of 50 pixels, and a color of blue
    The app displays the CEO's title in green at the bottom of the image
    '''

def preprocess(prompt):
    # Preprocess the prompt to ensure the model receives a clear and accurate app description.
    # By following these guidelines, we make the prompt more understandable, reflecting the shift toward human-readable code as the next coding language. 

    preprocess_prompt = f'''
    Generate a complete React Native codebase for an app with the following description. The app description is as follows between triple quotes:
    ```
    {prompt}
    ```

    Follow the next guidelines to generate a high quality code.
    - Use only functional components. 
    - Ensure all text is rendered inside the Text component, If not specified, all the text must be in "black".
    - All the alerts as Alert.alert(title, message).
    - Use Date module for date and time, never use any other module.
    - Include any custom components within the same response, the entire application must be on the same page.. 
    - Use App as the default export.
    - Avoid using any external imports, images, or assets that aren't included in the basic React Native setup.
    - Provide only the code, with no explanations or quotations.

    Here ir your code:
    '''
    return preprocess_prompt

def postprocess(prompt):
    # Postprocess the result to ensure the UI can render and compile it correctly.
    code = prompt["response"].replace("```jsx","").replace("```javascript", "").replace("```", "") # Remove the triple quotes if they exist
    pattern = r"import\s+{[^}]*}\s+from\s+['\"]react-native['\"];\n?" 
    postprocess = re.sub(pattern, imports + "\n", code) # Remove the default import statement and replace it with custom imports to avoid errors in the UI
    return postprocess