import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useGameLogic} from './hooks/useGameLogic';
import GameGrid from './components/GameGrid';

const Main = () => {
  const {data, step, handleUp, handleDown, handleLeft, handleRight} =
    useGameLogic();
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>{step}</Text>
      <GameGrid data={data} />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleUp} style={styles.btn}>
          <Text>UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDown} style={styles.btn}>
          <Text>Down</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLeft} style={styles.btn}>
          <Text>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRight} style={styles.btn}>
          <Text>Right</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(225,225,225)',
  },
  footer: {
    height: 100,
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  btn: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});
