import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import { openSendModalButtons } from '../../redux/ducks/application';

const AddBtnsHistorian = (props) => {
  const dispatch = useDispatch();

  const changeAddFile = () => {
    dispatch(openSendModalButtons());
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
      }}
    >
      <TouchableOpacity
        style={sendMaterialStyles.btnAdd}
        title="Pick an image from camera roll"
        onPress={changeAddFile}
      >
        <Icon name="add" color="#000" size={24} />
      </TouchableOpacity>
      <Text
        onPress={changeAddFile}
        style={{
          marginLeft: 10,
          fontSize: 12,
          textTransform: 'uppercase',
          fontFamily: 'GothamMedium',
        }}
      >
        Добавить файл
      </Text>
    </View>
  );
};

export default AddBtnsHistorian;
