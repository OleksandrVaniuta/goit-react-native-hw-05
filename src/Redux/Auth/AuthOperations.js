import db from '../../Firebase/config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { authSlice } from '../Auth/AuthReducer';

const auth = getAuth(db);

export const authSignUpUser =
  ({ login, email, password, photo }) =>
  async (dispath, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        photoURL: photo,
      });
      const { displayName, uid, photoURL } = await auth.currentUser;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        photo: photoURL,
        userEmail: email,
      };
      dispath(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispath, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSingOutUser = () => async (dispath, getState) => {
  await signOut(auth);
  dispath(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispath, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userName: user.displayName,
        userId: user.uid,
        photo: user.photoURL,
        userEmail: user.email,
      };
      dispath(authSlice.actions.authStateChange({ stateChange: true }));
      dispath(authSlice.actions.updateUserProfile(userUpdateProfile));
    } else {

    }
  });
};
