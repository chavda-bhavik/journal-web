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
            image
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
            image
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
        $image: Upload
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
                image: $image
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
            image
        }
    }
`;
const DeleteJournalMutation = gql`
    mutation DeleteJournal($id: String, $date: DateTime) {
        deleteJournal(id: $id, date: $date) {
            id
            actions
            greatfullness
            affirmation
            highlights
            improvements
            date
            status
            image
        }
    }
`;

export const fetchJournals = (): any => async (dispatch: AppDispatch) => {
    try {
        dispatch(loading());
        let result = await client.request(JournalsQuery);
        setJournals(result.getAllJournals, dispatch, true);
    } catch (err) {
        dispatch(error((err as Error).message));
    }
};

export const getSingleJournal =
    (id: string, journals: Journal[], fetched: Boolean): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(loading());
            let singleJournal: Journal | undefined;
            if (fetched) {
                singleJournal = journals.find((jour) => jour.id === id);
                if (singleJournal) dispatch(journal({ journal: singleJournal }));
            } else {
                let result = await client.request(SingleJournalQuery, { id });
                dispatch(journal(result.journal));
            }
        } catch (err) {
            dispatch(error((err as Error).message));
        }
    };

export const makeJournal =
    (journalData: Journal, journals: Journal[], journalDateValue: number, image?: File): any =>
    async (dispatch: AppDispatch) => {
        let journalToBeUpdated = journalData;
        if (image) journalToBeUpdated.image = image;
        try {
            dispatch(loading());
            let finalData: any = {
                ...journalData,
            };
            let result = await client.request(JournalMutation, finalData);
            // if request gets succeed and response is available
            if (result.journal) journalToBeUpdated = result.journal;
        } catch (err) {
            dispatch(error((err as Error).message));
        }

        journalToBeUpdated.date = '' + journalDateValue;
        let tempJournal = journals.find((jour) => jour.id === journalToBeUpdated.id),
            newJournals: Journal[];
        if (tempJournal) {
            // update
            newJournals = journals.map((jour) => {
                if (jour.id === journalToBeUpdated.id)
                    return {
                        ...jour,
                        ...journalToBeUpdated,
                    };
                else return { ...jour };
            });
        } else {
            // add
            newJournals = [...journals, { ...journalToBeUpdated }];
            newJournals = newJournals.sort(
                (jour1, jour2) => Number(jour2.date) - Number(jour1.date),
            );
        }
        setJournals(newJournals, dispatch);
        dispatch(
            journal({
                journal: journalToBeUpdated,
            }),
        );
    };

export const deleteJournal = (id: string, journals: Journal[]): any => async (dispatch: AppDispatch) => {
    try {
        dispatch(loading());
        await client.request(DeleteJournalMutation, {
            id,
        });
        let newJournals = journals.filter((journal) => journal.id !== id);
        setJournals(newJournals, dispatch);
    } catch (err) {
        dispatch(error((err as Error).message));
    }
    let newJournals = journals.filter((jour) => jour.id !== id);
    setJournals(newJournals, dispatch);
};

export const clearJournal = (): any => (dispatch: AppDispatch) => {
    dispatch(resetJournal());
};

export const searchJournals = (term: string, journals: Journal[]): any => (dispatch: AppDispatch) => {
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

export const resetJournals = (journals: Journal[]): any => (dispatch: AppDispatch) => {
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

const setJournals = (journalsData: Journal[], dispatch: AppDispatch, fetched?: boolean) => {
    let formattedJournals = formatJournals(journalsData);
    let todaysJournal = getTodaysJournal(journalsData);
    let groupedJournals = groupJournals(formattedJournals);
    dispatch(
        journals({
            journals: journalsData,
            formattedJournals: formattedJournals,
            groupedJournals: groupedJournals,
            stats: {
                months: Object.keys(groupedJournals).length,
                total: formattedJournals.length,
                weeks: 10,
            },
            todaysJournal: todaysJournal,
            fetched,
        }),
    );
};
