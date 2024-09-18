def preprocess(prompt): 
    preprocess_prompt = f'''
    Generate a complete React Native codebase for an app with the following functionalities, ensuring that all necessary native components and dependencies are imported correctly. 
    
    The app description is as follows between triple quotes:
    ```
    {prompt}
    ```
    
    Generate a complete React Native code using only functional components. Ensure all text is rendered inside the Text component, all the alerts as Alert.alert(title, message), use Date module for date and time, and include any custom components within the same response. Use App as the default export and correctly import all necessary native components. Avoid using any external imports, images, or assets that aren't included in the basic React Native setup.
    
    Additionally, ensure that the following components are imported, even if they are not explicitly used in the code, all of this is part of "react-native" module:
    
    Alert, View, Text, Image, ScrollView, TextInput, FlatList, SectionList, Pressable, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Modal, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, StatusBar, RefreshControl, Button, Switch, Slider, Picker, PanResponder, Linking, StyleSheet
    
    Provide only the code, with no explanations or quotations. Use App as the default export. Generate a complete React Native code using only functional components.
    '''
    return preprocess_prompt

def postprocess(prompt):
    postprocess = prompt["response"].replace("```jsx","").replace("```javascript", "").replace("```", "")
    return postprocess