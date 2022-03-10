import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, ChangeError } from '../redux/ducks/user';

import { authStyles } from '../styles/authStyles';

function Auth() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const passChange = () => {
    setPasswordError('');
    dispatch(ChangeError());
  };

  const emailChange = () => {
    setPasswordError('');
    dispatch(ChangeError());
  };

  const handleClick = (e) => {
    // e.preventDefault();
    // const re =
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const letters = /^[А-Яа-яёЁ]+$/;

    // if (error === 'Пользователь не найден') {
    //   return setEmailError(error);
    // }
    // if (error === 'Неверный пароль') {
    //   return setPasswordError(error);
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
    // if (password.length < 8) {
    //   return setPasswordError('минимум 8 символов');
    // }
    // if (letters.test(String(password).toLowerCase())) {
    //   return setPasswordError(
    //     'Можно использовать только Латинские буквы и цифры',
    //   );
    // }
    // if (email && password) {
    //   dispatch(login(email, password));
    // }

    dispatch(login(email, password));
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Email</Text>
      <TextInput
        style={authStyles.input}
        type="email"
        name="email"
        value={email}
        onChangeText={setEmail}
        onChange={emailChange}
      />
      <Text style={authStyles.title} htmlFor="password">
        Пароль
      </Text>
      <TextInput
        style={authStyles.input}
        type="password"
        name={password}
        value={password}
        onChangeText={setPassword}
        onChange={passChange}
      />
      <Button
        style={authStyles.btn}
        title=" Авторизоваться"
        onPress={handleClick}
      />
    </View>
  );
}

export default Auth;
