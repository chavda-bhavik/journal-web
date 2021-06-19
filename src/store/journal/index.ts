import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JournalState {
    loading: boolean;
    errorMessage: string;
    journals: Journal[];
    formattedJournals: FormattedJournalType[];
    todaysJournal?: FormattedJournalType;
}

const initialState: JournalState = {
    loading: false,
    errorMessage: '',
    journals: [],
    formattedJournals: [],
    todaysJournal: undefined,
};

interface JournalSuccessType {
    journals: Journal[];
    formattedJournals: FormattedJournalType[];
    todaysJournal?: FormattedJournalType;
}

export const journalSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        success: (state, action: PayloadAction<JournalSuccessType>) => {
            state.loading = false;
            state.journals = action.payload.journals;
            state.formattedJournals = action.payload.formattedJournals;
            state.todaysJournal = action.payload.todaysJournal;
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
