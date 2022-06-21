import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import BookmarkIcon from '../../SvgIcons/SendMaterialIcons/BookmarkIcon';

const BookmarkBtn = ({ bookmark, setBookmark }) => {
  const handleChangeBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <TouchableOpacity
      onPress={handleChangeBookmark}
      style={[
        styles.btn,
        {
          backgroundColor: bookmark ? color.MAIN_COLOR : color.FONT_LIGHT,
        },
      ]}
    >
      <BookmarkIcon />
      <Text style={styles.btnText}>
        {bookmark ? 'Удалить из кабинета' : 'Сохранить в кабинет'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btn: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
    backgroundColor: color.MAIN_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    color: color.APP_BG,
  },
});

export default BookmarkBtn;
