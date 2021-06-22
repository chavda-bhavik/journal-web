import React, { useEffect, useState } from 'react';
import { FixedButton } from '../../shared/components/FixedButton';
import { Header } from './Header';
import { Journals } from './Journals';
import { Quote } from './Quote';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchJournals } from '../../store/journal/Actions';
import { Backdrop } from './Backdrop';
import { Stats } from './Stats';

interface homeProps {}

export const home: React.FC<homeProps> = ({}) => {
    const JournalState = useAppSelector((state) => state.journal);
    const [showDateModal, setShowDateModal] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchJournals());
    }, []);

    const toggleBodyOverflowHidden = (add: boolean) => {
        let body = document.getElementsByTagName('body')[0];
        if (add) {
            body.classList.add('overflow-hidden');
        } else {
            body.classList.remove('overflow-hidden');
        }
    };
    const toggleDateModal = (status: boolean) => {
        toggleBodyOverflowHidden(status);
        setShowDateModal(status);
    };

    return (
        <div className={`bg-narvik-light space-y-3`}>
            <Header todaysJournal={JournalState.todaysJournal} />

            <Stats entries={10} streak={10} weeks={5} />

            <Quote author="Bhavik Chavda" quote="Watever we give, we receive." />

            <Journals journals={JournalState.formattedJournals} />
            <FixedButton
                icon={['fas', 'plus']}
                className="bottom-2 right-2"
                onClick={() => toggleDateModal(true)}
            />
            <Backdrop
                journals={JournalState.formattedJournals}
                journalsDates={JournalState.formattedJournals.map((journal) =>
                    Number(journal.date),
                )}
                toggleBodyOverflow={toggleBodyOverflowHidden}
                todaysJournal={JournalState.todaysJournal}
                show={showDateModal}
                onClose={() => toggleDateModal(false)}
            />
        </div>
    );
};
