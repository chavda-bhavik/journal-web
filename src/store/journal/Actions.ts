import { gql } from 'graphql-request';
import { AppDispatch } from '..';
import { formatJournals, getTodaysJournal, groupJournals } from '../../shared/helper';
import client from '../client';
import { error, loading, journals, journal, resetJournal, search } from './index';

const JournalsQuery = gql`
    query Journals($date: DateTime) {
        getAllJournals(monthDate: $date) {
            id
            actions
            greatfullness
            date
            affirmation
            highlights
            improvements
            status
        }
    }
`;
const SingleJournalQuery = gql`
    query GetJournal($id: String, $date: DateTime) {
        journal(id: $id, date: $date) {
            id
            actions
            greatfullness
            affirmation
            highlights
            improvements
            date
            status
        }
    }
`;
const JournalMutation = gql`
    mutation Journal(
        $id: String!
        $date: DateTime!
        $actions: String
        $greatfullness: String
        $affirmation: String
        $highlights: String
        $improvements: String
        $status: Int!
    ) {
        journal(
            values: {
                id: $id
                date: $date
                actions: $actions
                greatfullness: $greatfullness
                affirmation: $affirmation
                highlights: $highlights
                improvements: $improvements
                status: $status
            }
        ) {
            id
            actions
            greatfullness
            affirmation
            highlights
            improvements
            date
            status
        }
    }
`;

export const fetchJournals = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(loading());
        let result = await client.request(JournalsQuery);
        let formattedJournals = formatJournals(result.getAllJournals);
        let todaysJournal = getTodaysJournal(result.getAllJournals);
        let groupedJournals = groupJournals(formattedJournals);
        dispatch(
            journals({
                journals: result.getAllJournals,
                formattedJournals: formattedJournals,
                todaysJournal: todaysJournal,
                groupedJournals: groupedJournals,
                stats: {
                    months: Object.keys(groupedJournals).length,
                    total: formattedJournals.length,
                    weeks: 10,
                },
            }),
        );
    } catch (err) {
        dispatch(error(err.message));
    }
};

export const getSingleJournal = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(loading());
        let result = await client.request(SingleJournalQuery, { id });
        dispatch(journal(result.journal));
    } catch (err) {
        dispatch(error(err.message));
    }
};

export const makeJournal = (journalData: Journal) => async (dispatch: AppDispatch) => {
    try {
        dispatch(loading());
        let result = await client.request(JournalMutation, {
            ...journalData,
        });
        dispatch(journal(result.Journal));
    } catch (err) {
        dispatch(error(err.message));
    }
};

export const clearJournal = () => (dispatch: AppDispatch) => {
    dispatch(resetJournal());
};

export const searchJournals = (term: string, journals: Journal[]) => (dispatch: AppDispatch) => {
    let filteredJournals = journals.filter(
        (journal) =>
            journal.actions?.includes(term) ||
            journal.affirmation?.includes(term) ||
            journal.greatfullness?.includes(term) ||
            journal.highlights?.includes(term) ||
            journal.improvements?.includes(term),
    );
    let formattedJournals = formatJournals(filteredJournals);
    let groupedJournals = groupJournals(formattedJournals);
    dispatch(
        search({
            formattedJournals,
            groupedJournals,
            searched: true,
        }),
    );
};

export const resetJournals = (journals: Journal[]) => (dispatch: AppDispatch) => {
    let filteredJournals = journals;
    let formattedJournals = formatJournals(filteredJournals);
    let groupedJournals = groupJournals(formattedJournals);
    dispatch(
        search({
            formattedJournals,
            groupedJournals,
            searched: false,
        }),
    );
};
