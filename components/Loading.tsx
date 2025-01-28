import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/loader.svg')}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Loading;
