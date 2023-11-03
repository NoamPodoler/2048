import {useReducer} from 'react';

type Actions = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const reducer = (state: number[][], action: Actions) => {
  if (action === 'DOWN') {
    let newState = state.map(row => [...row]);
    for (let i = 0; i < state.length - 1; i++) {
      const y = state[i].length - i - 1;
      for (let x = 0; x < state[i].length; x++) {
        if (newState[y][x] === 0) {
          // Moves column down avoiding 0
          const column = newState.map(row => row[x]).splice(0, y + 1);
          console.log(column);
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
    return newState;
  }
  return state;
};

export const useGameLogic = () => {
  const [data, dispatch] = useReducer(reducer, [
    [0, 2, 0, 4],
    [4, 0, 2, 0],
    [2, 4, 4, 0],
    [2, 4, 4, 4],
  ]);

  return {
    data,
    handleUp: () => dispatch('UP'),
    handleDown: () => dispatch('DOWN'),
    handleLeft: () => dispatch('LEFT'),
    handleRight: () => dispatch('RIGHT'),
  };
};
