const DataReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_DATA': {
      return {
        ...state,
        isCurrentFileLoading: true,
      };
    }
    case 'LOAD_DATA': {
      return {
        ...state,
        isCurrentFileLoading: false,
      };
    }
    case 'SET_DATA': {
      return {
        ...state,
        currentFile: action.payload.atgcText,
        currentFileName: action.payload.fileName,
        isFileExist: true
      };
    }
    case 'UNSET_DATA': {
      return {
        ...state,
        currentFile: null,
        currentFileName: '',
        isFileExist: false,
      };
    }
    default:
      return state;
  }
};

export default DataReducer;
