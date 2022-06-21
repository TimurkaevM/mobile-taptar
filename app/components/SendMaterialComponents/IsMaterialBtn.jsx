import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../misc/color';
import { changedIsMaterialHistorian } from '../../redux/actions/historianMaterial';

function IsMaterialBtn() {
  const dispatch = useDispatch();

  const progress = useRef(new Animated.Value(5)).current; // useSharedValue(0)

  const is_material = useSelector(
    (state) => state.historianMaterial.materials.is_material,
  );

  const setIsMaterial = () => {
    dispatch(changedIsMaterialHistorian());
  };

  useEffect(() => {
    if (is_material) {
      Animated.spring(progress, { toValue: 35, useNativeDriver: true }).start();
    } else {
      Animated.spring(progress, { toValue: 5, useNativeDriver: true }).start();
    }
  }, [is_material]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сохранить как целостный материал</Text>
      <Pressable
        onPress={setIsMaterial}
        style={[
          styles.checkContainer,
          {
            backgroundColor: is_material ? color.MAIN_COLOR : color.FONT_LIGHT,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.checkInner,
            {
              transform: [{ translateX: progress }],
            },
          ]}
        ></Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginRight: 20,
    color: '#9b9b9b',
    fontSize: 15,
    fontWeight: '600',
  },
  checkContainer: {
    width: 60,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
  },
  checkInner: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#e8f5f7',
  },
});

export default IsMaterialBtn;
