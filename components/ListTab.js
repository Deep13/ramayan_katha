import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
const {width, height} = Dimensions.get('window');
export default function ListTab(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.tabContainer}>
        {props.chapters.map((values, key) => {
          return (
            <TouchableOpacity
              onPress={() => props.changeSong(values.id, props.title)}
              key={values.id}
              style={styles.tab}>
              <ImageBackground
                source={values.bg}
                style={{
                  width: (width - 30) * 0.4,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                imageStyle={{
                  resizeMode: 'cover',
                  borderRadius: 10,
                  opacity: 0.5,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: width / 25,
                    fontWeight: 'bold',
                  }}>
                  {values.title}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    fontSize: width / 20,
    fontWeight: 'bold',
    color: 'black',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tab: {
    width: (width - 30) * 0.4,
    height: 100,
    backgroundColor: 'rgb(0,0,0)',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
