import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import app from '../Firebase/config';
import db from '../Firebase/config';
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

import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const storage = getStorage(db);
const cloudDb = getFirestore(app);

export default function CreatePosts({ navigation }) {
  const [photoName, setPhotoName] = useState('');
  const [locationName, setLocationName] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const { userId, userName } = useSelector((state) => state.auth);

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      setPhoto(photo.uri);
      setLocation(location);
    }
  };

  const sendPhoto = async () => {
    uploadPostToServer();

    setPhoto(null);
    setPhotoName('');
    setLocationName('');
    navigation.navigate('DefaultScrenPosts');
  };

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setHasPermission(status === 'granted');
        console.log('Camera permission denied');
      } else {
        console.log('Camera permission granted');
      }
    };

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    requestCameraPermission();
  }, []);

  const clearPhoto = () => {
    setPhoto(null);
    setPhotoName('');
    setLocationName('');
    setLocation(null);
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      const docRef = await addDoc(collection(cloudDb, 'posts'), {
        photo: photo,
        location: location.coords,
        photoName: photoName,
        locationName: locationName,
        userId: userId,
        userName: userName,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };

  const uploadPhotoToServer = async () => {
    const postId = Date.now().toString();

    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const storageRef = await ref(storage, `images/${postId}`);
      const snapshot = await uploadBytes(storageRef, file);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
      // console.log(processedPhoto);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const cameraIconClr = photo ? '#fff' : '#BDBDBD';
  const activeBtn = photo ? false : true;
  const BtnCreateClr = photo ? '#FF6C00' : '#F6F6F6';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.PostScrenContainer}>
        <View style={styles.ContentContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            style={styles.Keyboard}
          >
            <View style={styles.container}>
              <Camera style={styles.AddPhoto} ref={setCameraRef}>
                {photo && (
                  <View style={styles.TakePhotoContainer}>
                    <Image
                      source={{ uri: photo }}
                      style={styles.photoPreview}
                    />
                  </View>
                )}
                <TouchableOpacity style={styles.TakePhoto} onPress={takePhoto}>
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    style={[styles.PhotoIcon, { color: cameraIconClr }]}
                  />
                </TouchableOpacity>
              </Camera>

              <View style={styles.buttonAddPhoto}>
                <Text style={styles.buttonText}>Завантажте фото</Text>
              </View>
            </View>
            <TextInput
              style={[styles.input]}
              value={photoName}
              onChangeText={setPhotoName}
              placeholder="Назва"
            />
            <View style={styles.inputContainer}>
              <EvilIcons name="location" size={24} color="#BDBDBD" />
              <TextInput
                style={styles.inputLocation}
                placeholder="Місцевість..."
                value={locationName}
                onChangeText={setLocationName}
              />
            </View>
            <TouchableOpacity
              style={[styles.createBtn, { backgroundColor: BtnCreateClr }]}
              onPress={sendPhoto}
              disabled={activeBtn}
            >
              <Text style={(styles.createBtnText, { color: cameraIconClr })}>
                Опубліковати
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.DltPostBtn} onPress={clearPhoto}>
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
  },
  Keyboard: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  PostScrenTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Roboto-Medium',
    marginLeft: '20%',
  },
  container: {},
  AddPhoto: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    borderBottomWidth: 1,
  },
  TakePhoto: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  TakePhotoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 240,
    width: '100%',
  },
  photoPreview: {
    height: 240,
    width: '100%',
  },
  buttonText: {
    color: '#BDBDBD',
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
    fontSize: 16,
    paddingBottom: 15,
    paddingTop: 15,
  },
  inputLocation: {
    flex: 1,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 0,
    paddingVertical: 15,
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  createBtn: {
    width: '100%',
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  createBtnActive: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#FF6C00',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  createBtnText: {
    fontSize: 16,
  },
  createBtnTextActive: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  DltPostBtn: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 10,
  },
});
