import React, { useEffect } from 'react';
import { FixedButton } from '../../shared/components/FixedButton';
import { Header } from './Header';
import { Journals } from './Journals';
import { Quote } from './Quote';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchJournals } from '../../store/journal/Actions';

interface homeProps {}

export const home: React.FC<homeProps> = ({}) => {
    const JournalState = useAppSelector((state) => state.journal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchJournals());
    }, []);

    return (
        <div className="bg-narvik-light min-h-screen">
            <Header todaysJournal={JournalState.todaysJournal} />
            <Quote author="Bhavik Chavda" quote="Watever we give, we receive." />
            <Journals journals={JournalState.formattedJournals} />
            <FixedButton icon={['fas', 'plus']} className="bottom-2 right-2" />
        </div>
    );
};
