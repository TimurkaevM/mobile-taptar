import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration, ChangeErrorCreate } from '../redux/ducks/user';
import {
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { registrStyles } from '../styles/registrStyles';

function RegistrationScreen() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.errorCreate);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);

  const emailChange = (e) => {
    if (error) {
      dispatch(ChangeErrorCreate());
      setEmailError(null);
      return;
    }
    if (emailError) {
      setEmailError(null);
      return;
    }
    return;
  };
  const nameChange = (e) => {
    if (error) {
      dispatch(ChangeErrorCreate());
      setNameError(null);
      return;
    }
    if (nameError) {
      setNameError(null);
      return;
    }
    return;
  };
  const passwordChange = (e) => {
    if (error) {
      dispatch(ChangeErrorCreate());
      setPasswordError(null);
      return;
    }
    if (passwordError) {
      setPasswordError(null);
      return;
    }
    return;
  };
  const confirmedChange = (e) => {
    if (error) {
      dispatch(ChangeErrorCreate());
      setPasswordError(null);
      return;
    }
    if (passwordError) {
      setPasswordError(null);
      return;
    }
    return;
  };

  const handleClick = (e) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!name) {
      return setNameError('Имя не может быть пустым');
    }
    if (name.length < 3) {
      return setNameError('В имени не может быть меньше 3 символов');
    }
    if (!email) {
      return setEmailError('Email не может быть пустым');
    }
    if (!re.test(String(email).toLowerCase())) {
      return setEmailError('Некорректные данные email');
    }
    if (!password) {
      return setPasswordError('пароль не может быть пустым');
    }
    if (password !== confirmed) {
      return setPasswordError('Неверный пароль подтверждения');
    }
    if (password.length < 6) {
      return setPasswordError('Пароль должен содержать минимум 6 символов');
    }
    if (password.length !== 0 && /\s/.test(password)) {
      return setPasswordError('В пароле не может быть пробелов');
    }

    dispatch(registration(name, email, password, confirmed));
  };

  return (
    <KeyboardAvoidingView
      style={registrStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <View style={registrStyles.content}>
          <Text style={registrStyles.title}>Имя</Text>
          <TextInput
            style={registrStyles.input}
            placeholder="Введите логин"
            value={name}
            onChangeText={setName}
            onChange={nameChange}
          />
          <Text style={registrStyles.title}>Email</Text>
          <TextInput
            style={registrStyles.input}
            placeholder="taptar@mail.ru"
            value={email}
            onChangeText={setEmail}
            onChange={emailChange}
          />
          <Text style={registrStyles.title}>Пароль</Text>
          <TextInput
            style={registrStyles.input}
            value={password}
            placeholder="1234567"
            onChangeText={setPassword}
            onChange={passwordChange}
            secureTextEntry={true}
          />
          <Text style={registrStyles.title}>Подтверждение пароля</Text>
          <TextInput
            style={registrStyles.input}
            value={confirmed}
            placeholder="1234567"
            onChangeText={setConfirmed}
            onChange={confirmedChange}
            secureTextEntry={true}
          />
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={registrStyles.btn}
              title="Pick an auth"
              onPress={handleClick}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  textTransform: 'capitalize',
                  color: '#fff',
                  fontFamily: 'GothamMedium',
                }}
              >
                Войти
              </Text>
            </TouchableOpacity>
          </View>
          {emailError && (
            <Text style={registrStyles.textError}>{emailError}</Text>
          )}
          {passwordError && (
            <Text style={registrStyles.textError}>{passwordError}</Text>
          )}
          {nameError && (
            <Text style={registrStyles.textError}>{nameError}</Text>
          )}
          {error && <Text style={registrStyles.textError}>{error}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegistrationScreen;
