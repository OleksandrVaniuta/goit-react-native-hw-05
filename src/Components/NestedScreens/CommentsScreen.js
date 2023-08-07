import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function Comments({ route }) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    console.log(route.params);
    if (route.params) {
      setPhoto(route.params.post);
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.PostScrenContainer}>
        <View style={styles.ContentContainer}>
          <View style={styles.PostBox}>
            <Image
              source={{ uri: route.params.post }}
              style={{ width: '100%', height: 240 }}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  PostScrenContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  PostScrenHeader: {
    width: '100%',
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
  },
  ContentContainer: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 22,
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
  },
  PostBox: {
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
});
