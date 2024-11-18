import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface PartsState {
    title?: string;
}

const initialState: PartsState = {
    title: '',
};

const partsSlice = createSlice({
    name: 'parts',
    initialState,
    reducers: {
        setTitle(state: PartsState, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        clearTitle(state: PartsState) {
            state.title = '';
        },
    },
});

export const useTitle = () => useSelector((state: RootState) => state.parts.title);

export const {
    setTitle,
    clearTitle,
} = partsSlice.actions;

export default partsSlice.reducer;