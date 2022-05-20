import { TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import Svg, { Path, G , Circle} from 'react-native-svg';

const DeleteBtn = ({openModal}) => {
  return (
      <TouchableOpacity onPress={openModal} style={styles.container}>
      <Svg
        width='100%'
        height='100%'
        xmlns="http://www.w3.org/2000/svg"
        space="preserve"
        version="1.1"
        viewBox="0 0 23.12 23.12"
        xlink="http://www.w3.org/1999/xlink"
        xodm="http://www.corel.com/coreldraw/odm/2003"
      >
        <G id="Слой_x0020_1">
          <Circle
            fill="none"
            fillRule="nonzero"
            cx="11.56"
            cy="11.56"
            r="11.56"
          />
          <Path
            fill="#C4C4C4"
            fillRule="nonzero"
            d="M16.83 6.29l0 0c0.51,0.51 0.51,1.34 0,1.84l-3.42 3.42 3.42 3.42c0.51,0.51 0.51,1.34 0,1.84l-0 0c-0.51,0.51 -1.34,0.51 -1.84,0l-3.42 -3.42 -3.42 3.42c-0.51,0.51 -1.34,0.51 -1.84,0l0 -0c-0.51,-0.51 -0.51,-1.34 0,-1.84l3.42 -3.42 -3.42 -3.42c-0.51,-0.51 -0.51,-1.34 0,-1.84l0 0c0.51,-0.51 1.34,-0.51 1.84,0l3.42 3.42 3.42 -3.42c0.51,-0.51 1.34,-0.51 1.84,0z"
          />
        </G>
      </Svg>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 5,
    top: -8,
    right: -8,
    borderRadius: 30,
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
})

export default DeleteBtn