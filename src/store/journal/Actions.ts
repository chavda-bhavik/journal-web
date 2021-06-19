import { gql } from 'graphql-request';
import { AppDispatch } from '..';
import { formatJournals, getTodaysJournal } from '../../shared/helper';
import client from '../client';
import { error, loading, success } from './index';

const query = gql`
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

export const fetchJournals = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(loading());
        let result = await client.request(query);
        let formattedJournals = formatJournals(result.getAllJournals);
        let todaysJournal = getTodaysJournal(result.getAllJournals);
        dispatch(
            success({
                journals: result.getAllJournals,
                formattedJournals: formattedJournals,
                todaysJournal: todaysJournal,
            }),
        );
    } catch (err) {
        dispatch(error(err.message));
    }
};
