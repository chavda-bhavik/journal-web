import { gql } from 'graphql-request';
import { AppDispatch } from '..';
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
        dispatch(success(result.getAllJournals));
    } catch (err) {
        dispatch(error(err.message));
    }
};
