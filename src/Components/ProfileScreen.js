import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Ionicons, FontAwesome, EvilIcons } from '@expo/vector-icons';
import app from '../Firebase/config';
import {
  getFirestore,
  collection,
  onSnapshot,
  where,
  query,
} from 'firebase/firestore';

const db = getFirestore(app);

const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const { userId, userName, photo } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    try {
      onSnapshot(collection(db, 'posts'), (data) => {
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPosts(posts);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentsCount = async (postId) => {
    try {
      const commentsRef = collection(db, `posts/${postId}/comments`);
      const queryRef = query(commentsRef);
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const commentsCount = querySnapshot.docs.length;
        setCommentsCount((prev) => ({ ...prev, [postId]: commentsCount }));
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setCommentsCount((prev) => ({ ...prev, [postId]: 0 }));
    }
  };

  useEffect(() => {
    getAllPost();
    posts.forEach((post) => {
      getCommentsCount(post.id);
    });
  }, []);

  useEffect(() => {
    if (route.params?.commentsCount) {
      console.log(route.params);
      setCommentsCount((prev) => ({
        ...prev,
        [route.params.postId]: route.params.commentsCount,
      }));
    }
  }, [route.params]);

  useEffect(() => {
    getUserPosts();
    return () => getUserPosts();
  }, []);

  const getUserPosts = async () => {
    try {
      const userPostsRef = collection(db, 'posts');
      const queryRef = query(userPostsRef, where('userId', '==', userId));
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const userPosts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserPosts(userPosts);

        if (userPosts && userPosts.length > 0) {
          userPosts.forEach((post) => {
            getCommentsCount(post.id.toString());
          });
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/BG_img.jpg')}
        style={styles.image}
      >
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.userInfo}>
              <View style={styles.imgBox}>
                <Image style={styles.avatar} source={{ uri: photo }} />
              </View>
              <View style={styles.user}>
                <Text style={styles.name}>{userName}</Text>
              </View>
            </View>
            {userPosts.length === 0 ? (
              <View style={styles.textWrapper}>
                <Text style={styles.text}>Немає публікацій</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreatePosts')}
                >
                  <Text style={styles.aside}>Створити публікацію?</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.postsList}>
                {userPosts.map((item) => {
                  return (
                    <View>
                      <Image source={{ uri: item.photo }} style={styles.post} />
                      <View>
                        <Text style={styles.title}>{item.photoName}</Text>
                      </View>
                      <View style={styles.box}>
                        <View style={styles.commentWrapper}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('CommentsScreen', {
                                prevScreen: 'Profile',
                                postId: item.id,
                                photo: item.photo,
                              })
                            }
                          >
                            <EvilIcons
                              name="comment"
                              size={32}
                              color="#BDBDBD"
                            />
                          </TouchableOpacity>
                          <Text style={styles.commentsCount}>
                            {commentsCount[item.id] || 0}
                          </Text>
                        </View>

                        <View style={styles.wrapperLocation}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('MapScreen', {
                                location: item.location,
                              })
                            }
                          >
                            <Ionicons
                              name="location-outline"
                              size={24}
                              color="#BDBDBD"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('MapScreen', {
                                location: item.location,
                              })
                            }
                          >
                            <Text style={styles.locationName}>
                              {item.locationName}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  wrapper: {
    marginTop: 160,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    minHeight: 600,
  },

  userInfo: {
    flexDirection: 'row',
    marginTop: 32,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBox: {
    position: 'absolute',
    left: '32%',
    top: '-100%',
    width: 120,
    height: 120,
    backgroundColor: '#E8E8E8',
    marginRight: 8,
    borderRadius: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
  },
  postsList: {
    marginBottom: 120,
  },
  post: {
    height: 240,
    width: '100%',
    borderRadius: 8,
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },

  title: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  commentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginLeft: 1,
  },
  wrapperLocation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  locationName: {
    marginLeft: 4,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 32,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#b1aaaa',
    marginBottom: 12,
  },
});
