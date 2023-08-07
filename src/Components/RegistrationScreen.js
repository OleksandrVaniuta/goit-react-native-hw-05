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
import { AntDesign } from '@expo/vector-icons';

export default function Registration() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState({
    input1: false,
    input2: false,
    input3: false,
  });
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleFocus = (inputName) => {
    setIsFocused((prev) => ({ ...prev, [inputName]: true }));
  };

  const handleBlur = (inputName) => {
    setIsFocused((prev) => ({ ...prev, [inputName]: false }));
  };

  const onRegister = () => {
    if (!isValid || login === '' || email === '' || password === '') {
      Keyboard.dismiss();
      return;
    }
    console.log(`login: ${login}, Email: ${email}, Password: ${password}`);
    Keyboard.dismiss();
    navigation.navigate('Home');
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
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            style={styles.Keyboard}
          >
            <View style={styles.form}>
              <View style={styles.photoBox}>
                <View style={styles.photoContainer}>
                  <AntDesign
                    style={styles.iconAdd}
                    name="pluscircleo"
                    size={24}
                    color="#FF6C00"
                  />
                </View>
              </View>
              <Text style={styles.RegTitle}>Реєстрація</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.inputLogin,
                  isFocused.input1 && styles.inputFocused,
                ]}
                placeholder="Логін"
                onFocus={() => handleFocus('input1')}
                onBlur={() => handleBlur('input1')}
                onChangeText={setLogin}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.inputMail,
                  isFocused.input2 && styles.inputFocused,
                  !isValid && styles.inValid,
                ]}
                placeholder="Адреса електронної пошти"
                onFocus={() => {
                  handleFocus('input2');
                }}
                onBlur={() => handleBlur('input2')}
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
                    isFocused.input3 && styles.inputFocused,
                  ]}
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  onFocus={() => handleFocus('input3')}
                  onBlur={() => handleBlur('input3')}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.showPasswordButton}
                  onPress={togglePasswordVisibility}
                >
                  <Text style={styles.showPasswordText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
                <Text style={styles.registerBtnText}>Зареєстуватися</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.logInContainer}>
            <TouchableOpacity
              style={styles.logIn}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.logInText}>Вже є акаунт? Увійти</Text>
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
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  photoBox: {
    height: 60,
    marginBottom: 32,
  },
  photoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#f6f6f6',
    borderRadius: 16,
    position: 'absolute',
    top: -60,
    right: -60,
  },
  iconAdd: {
    position: 'relative',
    top: 80,
    right: -107.5,
  },
  RegContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    width: '100%',
    alignItems: 'center',
    fontFamily: 'Roboto-Regular',
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
    marginTop: 16,
  },
  inputPass: {
    margin: 0,
  },
  passContainer: {
    width: '100%',
    marginBottom: 43,
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
    paddingBottom: 45,
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
