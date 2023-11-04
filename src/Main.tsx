import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useGameLogic} from './hooks/useGameLogic';
import GameGrid from './components/GameGrid';

const Main = () => {
  const logic = useGameLogic();

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>{logic.step}</Text>
      <GameGrid {...logic} />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(225,225,225)',
  },

  title: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});
