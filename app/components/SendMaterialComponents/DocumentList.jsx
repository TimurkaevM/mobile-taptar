import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import { sendMaterialStyles } from '../../styles/sendMaterialStyles';
import DeleteBtn from './DeleteBtn';
import DocumentItemIcon from '../../SvgIcons/SendMaterialIcons/DocumentItemIcon';
import DocumentListIcon from '../../SvgIcons/SendMaterialIcons/DocumentListIcon';

const DocumentList = ({ document, navigate }) => {
  const renderDocument = ({ item }) => {
    const title = item.title === null ? '' : item.title;
    const titleSub = title.substr(0, 12);
    const titleFile = title;

    const changeTitle = titleFile.length >= 12 ? `${titleSub}...` : titleFile;
    return (
      <View>
        <View style={sendMaterialStyles.mediaBoxBlue}>
          <DeleteBtn item={item} />
          <Pressable
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigate('ChangeTagsScreen', { item: item })}
          >
            <DocumentItemIcon width={100} height={100} color="#fff" />
          </Pressable>
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: '400',
            fontSize: 15,
            fontFamily: 'GothamMedium',
          }}
        >
          {title ? changeTitle : 'Нет названия'}
        </Text>
      </View>
    );
  };

  return (
    <View style={sendMaterialStyles.mediaContainer}>
      <View style={sendMaterialStyles.mediaHeader}>
        <DocumentListIcon />
        <Text style={sendMaterialStyles.mediaHeaderTitle}>Документ</Text>
      </View>
      <FlatList
        horizontal
        data={document}
        renderItem={renderDocument}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default DocumentList;
