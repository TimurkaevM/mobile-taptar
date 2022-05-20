import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../components/SendMaterialComponents/AudioListItem';
import { selectAudio } from '../misc/audioController';
import StatusBarPlaceHolder from '../misc/StatusBarPlaceHolder';
import AudioListHeader from '../components/SendMaterialComponents/AudioListHeader';

export class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
      selectedAudio: [],
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => 'audio',
    (type, dim) => {
      switch (type) {
        case 'audio':
          dim.width = Dimensions.get('window').width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

  handleAudioPress = async (audio) => {
    await selectAudio(audio, this.context);
  };

  handleSelectAudio = (audio) => {
    const { selectedAudio } = this.state;
    if (selectedAudio.length >= 5) return;
    this.setState({
      ...this.state,
      selectedAudio: [...selectedAudio, audio],
    });
  };

  handleRemoveAudio = (audio) => {
    this.setState({
      ...this.state,
      selectedAudio: this.state.selectedAudio.filter(
        (item) => item.id !== audio.id,
      ),
    });
  };

  componentDidMount() {
    this.context.loadPreviousAudio();
  }

  rowRenderer = (type, item, index, extendedState) => {
    const checkAudio = this.state.selectedAudio.some(
      (audio) => audio.id === item.id,
    );
    console.log(item);
    return (
      <AudioListItem
        checkAudio={checkAudio}
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.duration}
        onAudioPress={() => this.handleAudioPress(item)}
        selectAudioPress={() => this.handleSelectAudio(item)}
        removeAudioPress={() => this.handleRemoveAudio(item)}
      />
    );
  };

  render() {
    return (
      <>
        <StatusBarPlaceHolder />
        <AudioListHeader
          selectedAudio={this.state.selectedAudio}
          goBack={this.props.navigation.goBack}
          navigate={this.props.navigation.navigate}
        />
        <AudioContext.Consumer>
          {({ dataProvider, isPlaying }) => {
            if (!dataProvider._data.length) return null;
            return (
              <View style={{ flex: 1 }}>
                <RecyclerListView
                  dataProvider={dataProvider}
                  layoutProvider={this.layoutProvider}
                  rowRenderer={this.rowRenderer}
                  extendedState={{ isPlaying }}
                />
              </View>
            );
          }}
        </AudioContext.Consumer>
      </>
    );
  }
}

export default AudioList;
