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
    searched: boolean;
    fetched: boolean;
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
    searched: false,
    fetched: false,
};

interface JournalSuccessType {
    journals: Journal[];
    formattedJournals: FormattedJournalType[];
    todaysJournal?: FormattedJournalType;
    groupedJournals: GroupedJournalsType;
    stats: stats;
    fetched?: boolean;
}
interface JournalMakeSuccessType {
    journal: Journal;
    stats?: stats;
}
interface JournalSearchType {
    formattedJournals: FormattedJournalType[];
    groupedJournals: GroupedJournalsType;
    searched: boolean;
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
            if (action.payload.fetched) state.fetched = action.payload.fetched;
        },
        journal: (state, action: PayloadAction<JournalMakeSuccessType>) => {
            state.journal = action.payload.journal;
            state.loading = false;
        },
        resetJournal: (state) => {
            state.journal = undefined;
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        search: (state, action: PayloadAction<JournalSearchType>) => {
            state.formattedJournals = action.payload.formattedJournals;
            state.groupedJournals = action.payload.groupedJournals;
            state.searched = action.payload.searched;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, journals, journal, resetJournal, search } = journalSlice.actions;

export default journalSlice.reducer;
