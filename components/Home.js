import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  TextInput,
  AppState,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ListTab from './ListTab';
import Player from './Player';
import {chapter_data} from '../data/DataList';
import songs from '../data/songs';
import TrackPlayer from 'react-native-track-player';
import {AdMobBanner} from 'react-native-admob';
import {PLAYBACK_TRACK_CHANGED} from 'react-native-track-player/lib/eventTypes';
const {width, height} = Dimensions.get('window');
export default function Home() {
  const [songTitle, setsongTitle] = useState('');
  const initiate = useRef(false);
  useEffect(() => {
    setTimeout(mainFunc, 2000);
    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.add(songs);

      TrackPlayer.addEventListener(PLAYBACK_TRACK_CHANGED, async e => {
        if (e.nextTrack && initiate.current) {
          // console.log(e, 'sdsd');
          onChangeSongTitle(e.nextTrack - 1);
        }
      });
    });
    return () => {
      TrackPlayer.stop();
    };
  }, []);

  const mainFunc = () => {
    SplashScreen.hide();
  };
  const onChangeSong = (index, title) => {
    initiate.current = true;
    TrackPlayer.skip(songs[index].id);
    TrackPlayer.play();
    onChangeSongTitle(index);
  };

  const onChangeSongTitle = index => {
    setsongTitle(songs[index].category + '-' + songs[index].title);
  };
  return (
    <View style={{width, height}}>
      <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID="ca-app-pub-4717579333914549/7068471384"
        onAdFailedToLoad={error => console.log(error)}
      />
      <View style={styles.container}>
        <StatusBar backgroundColor="#f3831e" barStyle="dark-content" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}>
          <Text style={styles.title}>Ramayan Katha</Text>
          {/* <TextInput
            style={styles.input}
            placeholder="Paath,Chapter"
            placeholderTextColor="rgb(125,123,121)"
          /> */}
          {Object.entries(chapter_data).map((values, key) => {
            return (
              <ListTab
                key={key}
                title={values[0]}
                chapters={values[1]}
                changeSong={onChangeSong}
              />
            );
          })}
        </ScrollView>
        {songTitle !== '' && (
          <Player songTitle={songTitle} changeSong={onChangeSongTitle} />
        )}

        {/* <Player songTitle={songTitle} /> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3831e',
    paddingVertical: 30,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    color: 'white',
    fontSize: width / 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(210,206,203,0.8)',
    borderRadius: 20,
    padding: 10,
  },
});
