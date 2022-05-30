import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';

const MaterialTitle = () => {
  const title = useSelector((state) => state.cabinetMaterial.material.title);
  const user_id = useSelector(
    (state) => state.cabinetMaterial.material.user_id,
  );

  return (
    <View style={sendMaterialStyles.inputTitleContainer}>
      <Text
        style={{
          textAlign: 'left',
          marginBottom: 10,
          fontWeight: '600',
          fontSize: 17,
          color: '#4686cc',
        }}
      >
        Автор: id {user_id}
      </Text>
      <Text
        style={{
          textAlign: 'left',
          marginBottom: 10,
          fontWeight: '600',
          fontSize: 17,
          color: '#4686cc',
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default MaterialTitle;
