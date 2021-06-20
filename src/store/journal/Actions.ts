import { gql } from 'graphql-request';
import { AppDispatch } from '..';
import { formatJournals, getTodaysJournal } from '../../shared/helper';
import client from '../client';
import { error, loading, journals, journal } from './index';

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
    query GetJournal($id: Int, $date: DateTime) {
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
        dispatch(
            journals({
                journals: result.getAllJournals,
                formattedJournals: formattedJournals,
                todaysJournal: todaysJournal,
            }),
        );
    } catch (err) {
        dispatch(error(err.message));
    }
};

export const getSingleJournal = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(loading());
        let result = await client.request(SingleJournalQuery, {
            id: Number(id),
        });
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
