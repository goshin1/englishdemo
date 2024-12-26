import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600*1000;

export const noteSlice = createSlice({
    name: 'note',
    initialState: {
        words : [],
        deletes : [],
        updates : [],
        id : 0
    },
    reducers: {
        setWords : (state, action) => {
            state.words = action.payload;
        },
        addWords : (state, action) => {
            state.words = [ ...state.words, action.payload];
            state.id = state.id + 1;
        },
        deleteWord : (state, action) => {
            state.deletes = [ ...state.deletes, action.payload];
        },
        deleteWordCancel : (state, action) => {
            state.deletes = state.deletes.filter(num => num !== action.payload);
        },
        updateWord : (state, action) => {
            state.updates = [ ...state.updates, action.payload ]
        },
        updateModifyWord : (state, action) => {
            state.updates = state.updates.filter(word => word.num !== action.payload.num);
            state.updates = [ ...state.updates, action.payload ]
        }
    }
})


export default noteSlice.reducer;
export const {addWords} = noteSlice.actions;
export const {setWords} = noteSlice.actions;
export const {deleteWord} = noteSlice.actions;
export const {deleteWordCancel} = noteSlice.actions;
export const {updateWord} = noteSlice.actions;
export const {updateModifyWord} = noteSlice.actions;