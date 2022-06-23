import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration, ChangeErrorCreate } from '../redux/ducks/user';
import {
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  View,
  SafeAreaView,
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
    <SafeAreaView style={registrStyles.scrollView}>
      <ScrollView contentContainerStyle={registrStyles.center}>
        <View style={registrStyles.container}>
          <Text style={registrStyles.title}>Имя</Text>
          <TextInput
            style={registrStyles.input}
            placeholder="name"
            type="name"
            name="name"
            value={name}
            onChangeText={setName}
            onChange={nameChange}
          />
          <Text style={registrStyles.title}>Email</Text>
          <TextInput
            style={registrStyles.input}
            placeholder="email"
            type="email"
            name="email"
            value={email}
            onChangeText={setEmail}
            onChange={emailChange}
          />
          <Text style={registrStyles.title}>Пароль</Text>
          <TextInput
            style={registrStyles.input}
            type="password"
            name={password}
            value={password}
            onChangeText={setPassword}
            onChange={passwordChange}
          />
          <Text style={registrStyles.title}>Подтверждение пароля</Text>
          <TextInput
            style={registrStyles.input}
            type="password"
            name={confirmed}
            value={confirmed}
            onChangeText={setConfirmed}
            onChange={confirmedChange}
          />
          {/* <button className={style.google} disabled={loading} onClick={handleClick}>
        Google
      </button>
      <div className={style.or}>или</div> */}
          <View
            style={{
              alignItems: 'center',
              marginTop: 23,
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
          {nameError && (
            <Text style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>
              {nameError}
            </Text>
          )}
          {error && (
            <Text style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>
              {error}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegistrationScreen;
