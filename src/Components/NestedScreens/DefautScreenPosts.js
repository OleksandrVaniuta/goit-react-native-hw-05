import React, { useState, useEffect } from 'react';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import app from '../../Firebase/config';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';


const cloudDb = getFirestore(app);

export default function DefaultScrenPosts({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});

  const getAllPosts = async () => {
    try {
      await onSnapshot(collection(cloudDb, 'posts'), (data) => {
        const posts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(posts);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
    if (route.params?.commentsCount) {
      console.log(route.params);
      setCommentsCount((prev) => ({
        ...prev,
        [route.params.postId]: route.params.commentsCount,
      }));
    }
  }, []);

  const toMap = (location) => {
    navigation.navigate('MapScreen', { location });
  };
  const toComments = (post) => {
    navigation.navigate('CommentsScreen', { post });
  };

  return (
    <SafeAreaView style={styles.PostScrenContainer}>
      <View style={styles.ContentContainer}>
        <FlatList
          style={styles.ContentList}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.PostBox}>
              <Image
                source={{ uri: item.photo }}
                style={{ width: '100%', height: 240, borderRadius: 8 }}
              />
              {item.photoName && (
                <Text style={styles.postName}>{item.photoName}</Text>
              )}
              <View style={styles.postInfo}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => {
                    navigation.navigate('CommentsScreen', {
                      prevScreen: 'DefaultScrenPosts',
                      postId: item.id,
                      photo: item.photo,
                    });
                  }}
                >
                  <EvilIcons name="comment" size={32} color="#BDBDBD" />
                  <Text style={styles.CommentCount}>
                    {commentsCount[item.id] || 0}
                  </Text>
                </TouchableOpacity>
                {item.locationName && (
                  <TouchableOpacity
                    style={[styles.iconContainer, { marginLeft: 'auto' }]}
                    onPress={() => toMap(item.location)}
                  >
                    <EvilIcons name="location" size={32} color="#BDBDBD" />
                    <Text style={styles.LocationName}>{item.locationName}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PostScrenContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  PostScrenHeader: {
    width: '100%',
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    justifyContent: 'flex-start',
    width: '100%',
  },
  ContentList: {
    flex: 1,
    flexDirection: 'column',
  },
  Contentitem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  PhotoBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
  },
  PostBox: {
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 34,
  },
  TextName: {
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
    fontFamily: 'Roboto-Bold',
  },
  TextMail: {
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
    fontFamily: 'Roboto-Regular',
  },
  PostScrenTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Roboto-Medium',
    marginRight: '33%',
  },
  PostsBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: '#b3b3b3',
    borderTopWidth: 1,
  },
  AddBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    marginLeft: 39,
    marginRight: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6C00',
  },
  postName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginTop: 8,
    paddingLeft: 5,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 4,
  },
  CommentCount: {
    fontSize: 16,
    color: '#BDBDBD',
  },
  LocationName: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#212121',
  },
});
