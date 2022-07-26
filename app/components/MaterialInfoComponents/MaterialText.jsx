import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';

const MaterialText = ({ navigate }) => {
  const text = useSelector(
    (state) => state.cabinetMaterial.material.files.text,
  );

  const handleChangeText = (event) => {
    return;
  };

  const onPressNavigate = () => {
    navigate('FileTagsScreen', { item: text });
  };

  return (
    <View style={sendMaterialStyles.inputTitleContainer}>
      <Text
        style={{
          marginBottom: 10,
          fontWeight: '600',
          fontSize: 17,
          fontFamily: 'GothamMedium',
        }}
      >
        Текст
      </Text>
      <TextInput
        multiline
        numberOfLines={7}
        style={sendMaterialStyles.inputText}
        type="password"
        name="title"
        value={text.text}
        placeholder="Введите текст"
        // onChange={handleChangeText}
      />
      {text.text ? (
        <TouchableOpacity
          onPress={onPressNavigate}
          style={{
            width: 200,
            paddingTop: 40,
            paddingBottom: 6,
            backgroundColor: '#4caf50',
            borderRadius: 15,
            position: 'absolute',
            zIndex: -1,
            bottom: 25,
            right: 20,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 10,
              fontWeight: '400',
              fontSize: 12,
              color: '#fff',
              fontFamily: 'GothamMedium',
            }}
          >
            Открыть
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default MaterialText;
