import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JournalState {
    loading: boolean;
    errorMessage: string;
    journals: any[];
}
const initialState: JournalState = {
    loading: false,
    errorMessage: '',
    journals: [],
};

export const journalSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        success: (state, action) => {
            state.loading = false;
            state.journals = action.payload;
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, success } = journalSlice.actions;

export default journalSlice.reducer;
