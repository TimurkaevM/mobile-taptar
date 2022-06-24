import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, ChangeErrorLogin } from '../redux/ducks/user';

import { authStyles } from '../styles/authStyles';

function AuthScreen() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.errorLogin);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  const passChange = () => {
    if (error) {
      dispatch(ChangeErrorLogin());
      setPasswordError(null);
      return;
    }
    if (passwordError) {
      setPasswordError(null);
      return;
    }
    return;
  };

  const emailChange = () => {
    if (error) {
      dispatch(ChangeErrorLogin());
      setEmailError(null);
      return;
    }
    if (emailError) {
      setEmailError(null);
      return;
    }
    return;
  };

  const handleClick = (e) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      return setEmailError('Email не может быть пустым');
    }
    if (!re.test(String(email).toLowerCase())) {
      return setEmailError('Некорректные данные email');
    }
    if (!password) {
      return setPasswordError('Пароль не может быть пустым');
    }
    if (password.length < 6) {
      return setPasswordError(' Пароль должен содержать минимум 6 символов');
    }
    if (password.length !== 0 && /\s/.test(password)) {
      return setPasswordError('В пароле не может быть пробелов');
    }

    dispatch(login(email, password));
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={authStyles.title}>Email</Text>
      <TextInput
        style={authStyles.input}
        value={email}
        onChangeText={setEmail}
        onChange={emailChange}
        placeholder="taptar@mail.ru"
      />
      <Text style={authStyles.title} htmlFor="password">
        Пароль
      </Text>
      <TextInput
        style={authStyles.input}
        value={password}
        onChangeText={setPassword}
        onChange={passChange}
        secureTextEntry={true}
        placeholder="1234567"
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: 23,
        }}
      >
        <TouchableOpacity
          style={authStyles.btn}
          title="Pick an auth"
          onPress={handleClick}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              textTransform: 'capitalize',
              color: '#fff',
            }}
          >
            Войти
          </Text>
        </TouchableOpacity>
      </View>
      {emailError && (
        <Text style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>
          {emailError}
        </Text>
      )}
      {passwordError && (
        <Text style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>
          {passwordError}
        </Text>
      )}
      {error && (
        <Text style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>
          {error}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
}

export default AuthScreen;
