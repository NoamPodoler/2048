import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useGameLogic} from '../hooks/useGameLogic';
import {runOnJS} from 'react-native-reanimated';

const GAP = 10;
const COLORS = [
  '#FFFFFF',
  '#FFFF00',
  '#FFA500',
  '#FF0000',
  '#800080',
  '#0000FF',
  '#008000',
  '#FFC0CB',
  '#00FFFF',
  '#FF69B4',
  '#FFD700',
  '#00FF00',
  '#FF8C00',
  '#FF1493',
  '#1E90FF',
  '#FF00FF',
  '#00CED1',
  '#FF4500',
  '#9400D3',
];
const translateValue = 50;

type Props = ReturnType<typeof useGameLogic>;

const GameGrid = ({
  data,
  handleDown,
  handleLeft,
  handleRight,
  handleUp,
}: Props) => {
  const gestureHandler = Gesture.Pan().onEnd(e => {
    if (e.translationX > translateValue) {
      runOnJS(handleRight)();
    } else if (e.translationX < -translateValue) {
      runOnJS(handleLeft)();
    } else if (e.translationY > translateValue) {
      runOnJS(handleDown)();
    } else if (e.translationY < -translateValue) {
      runOnJS(handleUp)();
    }
  });

  return (
    <GestureDetector gesture={gestureHandler}>
      <View style={styles.container}>
        {data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((number, colIndex) => (
              <View
                key={colIndex}
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      number === 0 ? 'white' : COLORS[Math.log2(number)],
                  },
                ]}>
                {number ? <Text style={styles.text}>{number}</Text> : <></>}
              </View>
            ))}
          </View>
        ))}
      </View>
    </GestureDetector>
  );
};

export default GameGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    gap: GAP,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    gap: GAP,
  },
  item: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },

  text: {
    fontWeight: '600',
    fontSize: 20,
  },
});
