import { createContext, useReducer } from 'react';
import DataReducer from './DataReducer';

const INITIAL_STATE = {
  currentFile: null,
  currentFileName: '',
  isCurrentFileLoading: false,
  isFileExist: false,
};

export const DataContext = createContext(INITIAL_STATE);

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, INITIAL_STATE);

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
