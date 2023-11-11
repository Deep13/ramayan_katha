import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import IconAnt from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
} from 'react-native-track-player';
import songs from '../data/songs';
export default function Player(props) {
  const playState = usePlaybackState();
  const {position, duration} = useTrackPlayerProgress();
  const [isPlaying, setIsPlaying] = useState('loading');
  const [playIndex, setPlayIndex] = useState(0);
  useEffect(async () => {
    let currIndex = await TrackPlayer.getCurrentTrack();
    setPlayIndex(currIndex - 1);
  }, [props]);

  useEffect(async () => {
    let currIndex = await TrackPlayer.getCurrentTrack();
    // alert(playState);
    if (playState === 'playing' || playState === 3) {
      setIsPlaying('playing');
    } else if (playState === 'paused' || playState === 2 || playState === 0) {
      setIsPlaying('paused');
    } else if (currIndex == songs.length) {
      setIsPlaying('paused');
    } else {
      setIsPlaying('loading');
    }
  }, [playState]);

  const formatTime = sec => {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.ceil(sec - minutes * 60);
    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const playPause = async () => {
    if (isPlaying === 'playing') {
      TrackPlayer.pause();
    } else if (isPlaying === 'paused') {
      TrackPlayer.play();
    }
  };

  const renderPlayPauseButton = () => {
    switch (isPlaying) {
      case 'playing':
        return <IconAnt name="pause" size={25} />;

      case 'paused':
        return <IconAnt name="play" size={25} />;

      default:
        return (
          <ActivityIndicator size={25} style={styles.loader} color="#000" />
        );
    }
  };

  const skipNext = async () => {
    let currIndex = await TrackPlayer.getCurrentTrack();
    if (currIndex < songs.length) {
      TrackPlayer.skipToNext();
      props.changeSong(currIndex);
      setPlayIndex(currIndex);
    }
  };

  const skipPrevious = async () => {
    let currIndex = await TrackPlayer.getCurrentTrack();
    if (currIndex > 1) {
      TrackPlayer.skipToPrevious();
      props.changeSong(currIndex - 2);
      setPlayIndex(currIndex - 2);
    }
  };

  const handleSeek = val => {
    TrackPlayer.seekTo(val);
  };

  return (
    <View style={[styles.container]}>
      <View>
        <Image source={songs[playIndex].artwork} style={styles.art} />
        {isPlaying === 'playing' && (
          <Image
            source={require('../assets/equilizer.gif')}
            style={styles.equilart}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          paddingLeft: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          {/* <Text style={{fontStyle: 'italic'}}>{playStateText}..</Text> */}
          <Text>{props.songTitle}</Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onSlidingComplete={handleSeek}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>{formatTime(position)}</Text>
          <Text>- {formatTime(duration - position)}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={skipPrevious}>
            <IconAnt name="skip-back" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={playPause}>
            {renderPlayPauseButton()}
          </TouchableOpacity>
          <TouchableOpacity onPress={skipNext}>
            <IconAnt name="skip-forward" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  art: {
    width: 70,
    height: 70,
  },
  equilart: {
    width: 70,
    height: 70,
    position: 'absolute',
    opacity: 0.4,
  },
  grabber: {
    width: 60,
    borderTopWidth: 4,
    borderTopColor: '#aaa',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 10,
  },
});
