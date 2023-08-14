import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import bgImg from '../images/BG_img.jpg';
import { useDispatch } from 'react-redux';
import { authSingInUser } from '../Redux/Auth/AuthOperations';

export default function Registration() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState({
    input1: false,
    input2: false,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const dispath = useDispatch();

  const handleFocus = (inputName) => {
    setIsFocused((prev) => ({ ...prev, [inputName]: true }));
  };

  const handleBlur = (inputName) => {
    setIsFocused((prev) => ({ ...prev, [inputName]: false }));
  };

  const onLogIn = () => {
    if (!isValid || email === '' || password === '') {
      Keyboard.dismiss();
      return;
    }
    const loginData = { email: email, password: password };
    dispath(authSingInUser(loginData));
    console.log(`Email: ${email}, Password: ${password}`);
    Keyboard.dismiss();
    // navigation.navigate('Home');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (text) => {
    setEmail(text);
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsValid(emailPattern.test(text));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.RegContainer}>
        <ImageBackground source={bgImg} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.Keyboard}
          >
            <View style={styles.form}>
              <Text style={styles.RegTitle}>Увійти</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.inputMail,
                  isFocused.input1 && styles.inputFocused,
                  !isValid && styles.inValid,
                ]}
                placeholder="Адреса електронної пошти"
                onFocus={() => handleFocus('input1')}
                onBlur={() => handleBlur('input1')}
                onChangeText={validateEmail}
              />
              {!isValid && (
                <Text style={styles.validationText}>Invalid email</Text>
              )}
              <View style={styles.passContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputPass,
                    isFocused.input2 && styles.inputFocused,
                  ]}
                  secureTextEntry={!showPassword}
                  placeholder="Пароль"
                  onFocus={() => handleFocus('input2')}
                  onBlur={() => handleBlur('input2')}
                  onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.showPasswordButton}>
                  <Text
                    style={styles.showPasswordText}
                    onPress={togglePasswordVisibility}
                  >
                    Показати
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.registerBtn} onPress={onLogIn}>
                <Text style={styles.registerBtnText}>Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.logInContainer}>
            <TouchableOpacity
              style={styles.logIn}
              onPress={() => navigation.navigate('Registration')}
            >
              <Text style={styles.logInText}>
                Немає акаунту? Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  Keyboard: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 43,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  RegContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    alignItems: 'center',
  },
  RegTitle: {
    color: '#000',
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 8,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: 'Roboto-Regular',
    width: '100%',
    padding: 16,
    paddingBottom: 15,
    margin: 0,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#FF6C00',
  },
  inValid: {
    borderColor: '#FF0000',
  },
  validationText: {
    color: '#FF0000',
  },
  inputLogin: {
    margin: 0,
    marginTop: 32,
  },
  inputMail: {
    marginTop: 32,
  },
  inputPass: {
    margin: 0,
  },
  passContainer: {
    width: '100%',
    marginTop: 16,
  },
  showPasswordButton: {
    position: 'absolute',
    top: 20,
    right: 16,
  },
  showPasswordText: {
    fontSize: 16,
    color: '#1B4371',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: '#fff',
  },
  registerBtn: {
    width: '100%',
    backgroundColor: '#FF6C00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingBottom: 15,
    paddingTop: 16,
  },
  registerBtnText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  logInContainer: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 111,
  },
  logIn: {
    marginTop: 16,
  },
  logInText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
  },
});
