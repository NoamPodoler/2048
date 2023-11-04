import {useReducer} from 'react';
import {rotate} from '../utils/rotate';

type State = {
  data: number[][];
  step: number;
};

type Actions = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const reducer = (state: State, action: Actions) => {
  let newData;
  if (action === 'DOWN') {
    newData = handleChange(state.data);
  } else if (action === 'UP') {
    newData = rotate(rotate(handleChange(rotate(rotate(state.data)))));
  } else if (action === 'LEFT') {
    newData = rotate(handleChange(rotate(rotate(rotate(state.data)))));
  } else if (action === 'RIGHT') {
    newData = rotate(rotate(rotate(handleChange(rotate(state.data)))));
  }

  return {data: newData ?? state.data, step: state.step + 1};
};

const handleChange = (state: number[][]) => {
  let newState = state.map(row => [...row]);
  for (let i = 0; i < state.length - 1; i++) {
    const y = state[i].length - i - 1;
    for (let x = 0; x < state[i].length; x++) {
      if (newState[y][x] === 0) {
        // Moves column down avoiding 0
        const column = newState.map(row => row[x]).splice(0, y + 1);
        if (column.filter(item => item !== 0).length > 0) {
          while (column[column.length - 1] === 0) {
            column.unshift(column.pop() ?? 0);
          }

          // Saves updated column
          for (let j = 0; j < column.length; j++) {
            newState[j][x] = column[j];
          }
        }
      } else if (newState[y][x] === newState[y - 1][x]) {
        // Adds up same numbers
        newState[y][x] = newState[y][x] + newState[y - 1][x];

        // Neutralizes data; moves column down
        for (let j = 0; j < y - 1; j++) {
          newState[y - j - 1][x] = newState[y - j - 2][x];
        }
        newState[0][x] = 0;
      }
    }
  }

  const random = Math.random();
  let newNumbersAmount = random < 0.2 ? 0 : random < 0.8 ? 1 : 2;
  // Create new numbers in empty spaces
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length - 1; j++) {
      if (newState[i][j] === 0 && newNumbersAmount) {
        newNumbersAmount--;
        newState[i][j] = Math.random() > 0.67 ? 2 : 4;
      }
    }
  }

  return newState;
};

export const useGameLogic = (length = 5) => {
  const [state, dispatch] = useReducer(reducer, {
    data: Array(length)
      .fill(0)
      .map(() => Array(length).fill(0).map(generateNumber)),
    step: 0,
  });

  const {data, step} = state;

  return {
    data,
    step,
    handleUp: () => dispatch('UP'),
    handleDown: () => dispatch('DOWN'),
    handleLeft: () => dispatch('LEFT'),
    handleRight: () => dispatch('RIGHT'),
  };
};

//

const generateNumber = () =>
  Math.random() < 0.25 ? (Math.random() < 0.75 ? 2 : 4) : 0;
