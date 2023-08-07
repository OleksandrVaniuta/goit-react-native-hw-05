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
import MapView, { Marker } from 'react-native-maps';

export default function Maps({ route }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.PostScrenContainer}>
        <View style={styles.ContentContainer}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: route.params.location.latitude,
              longitude: route.params.location.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.006,
            }}
          >
            <Marker
              coordinate={{
                latitude: route.params.location.latitude,
                longitude: route.params.location.longitude,
              }}
            />
          </MapView>
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

  ContentContainer: {
    flex: 1,
    width: '100%',
  },
});
