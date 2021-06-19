import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JournalState {
    loading: boolean;
    errorMessage: string;
    journals: Journal[];
    journal?: Journal;
    formattedJournals: FormattedJournalType[];
    todaysJournal?: FormattedJournalType;
}

const initialState: JournalState = {
    loading: false,
    errorMessage: '',
    journals: [],
    formattedJournals: [],
    todaysJournal: undefined,
    journal: undefined,
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
        journals: (state, action: PayloadAction<JournalSuccessType>) => {
            state.loading = false;
            state.journals = action.payload.journals;
            state.formattedJournals = action.payload.formattedJournals;
            state.todaysJournal = action.payload.todaysJournal;
        },
        journal: (state, action: PayloadAction<Journal>) => {
            state.journal = action.payload;
            state.loading = false;
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, journals, journal } = journalSlice.actions;

export default journalSlice.reducer;
