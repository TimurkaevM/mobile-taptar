import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration, ChangeError } from '../redux/ducks/user';
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
  const error = useSelector((state) => state.user.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const emailChange = (e) => {
    setEmailError('');
    dispatch(ChangeError());
  };
  const nameChange = (e) => {
    setNameError('');
  };
  const passwordChange = (e) => {
    setPasswordError('');
  };
  const confirmedChange = (e) => {
    setPasswordError('');
  };

  const handleClick = (e) => {
    // e.preventDefault();
    // const re =
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const letters = /^[А-Яа-яёЁ]+$/;

    // if (error !== null) {
    //   setEmailError(error);
    //   dispatch(ChangeError());
    // }
    // if (!name) {
    //   return setNameError('Не может быть пустым');
    // }
    // if (!email) {
    //   return setEmailError('Не может быть пустым');
    // }
    // if (!re.test(String(email).toLowerCase())) {
    //   return setEmailError('Некорректные данные');
    // }
    // if (!password) {
    //   return setPasswordError('Не может быть пустым');
    // }
    // if (!confirmed) {
    //   return setPasswordError('Не может быть пустым');
    // }
    // if (password.length < 8) {
    //   return setPasswordError('минимум 8 символов');
    // }
    // if (letters.test(String(password).toLowerCase())) {
    //   return setPasswordError(
    //     'Можно использовать только Латинские буквы и цифры',
    //   );
    // }
    if (email && password && name) {
      dispatch(registration(name, email, password, confirmed));
    }
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegistrationScreen;
