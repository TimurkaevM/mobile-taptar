import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import color from '../../misc/color';
import { useDispatch, useSelector } from 'react-redux';
import { changeBookmarkMaterial } from '../../redux/actions/historianMaterial';
import BookmarkIcon from '../../SvgIcons/SendMaterialIcons/BookmarkIcon';

const BookmarkBtn = () => {
  const dispatch = useDispatch();
  const bookmark = useSelector(
    (state) => state.historianMaterial.materials.bookmark,
  );

  const handleChangeBookmark = () => {
    dispatch(changeBookmarkMaterial());
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
    fontFamily: 'GothamMedium',
  },
});

export default BookmarkBtn;
