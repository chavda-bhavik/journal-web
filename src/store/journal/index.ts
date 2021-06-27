import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JournalState {
    loading: boolean;
    errorMessage: string;
    journals: Journal[];
    journal?: Journal;
    formattedJournals: FormattedJournalType[];
    groupedJournals: GroupedJournalsType;
    todaysJournal?: FormattedJournalType;
    stats: stats;
}

const initialState: JournalState = {
    loading: false,
    errorMessage: '',
    journals: [],
    formattedJournals: [],
    todaysJournal: undefined,
    journal: undefined,
    groupedJournals: {},
    stats: {
        months: 0,
        weeks: 0,
        total: 0,
    },
};

interface JournalSuccessType {
    journals: Journal[];
    formattedJournals: FormattedJournalType[];
    todaysJournal?: FormattedJournalType;
    groupedJournals: GroupedJournalsType;
    stats: stats;
}

export const journalSlice = createSlice({
    name: 'journal',
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
            state.groupedJournals = action.payload.groupedJournals;
            state.stats = action.payload.stats;
        },
        journal: (state, action: PayloadAction<Journal>) => {
            state.journal = action.payload;
            state.loading = false;
        },
        resetJournal: (state) => {
            state.journal = undefined;
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, journals, journal, resetJournal } = journalSlice.actions;

export default journalSlice.reducer;
