import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchJournals } from '../../store/journal/Actions';
import { Backdrop } from './Backdrop';
import { Stats } from './Stats';
import { Navbar } from './Navbar';
import { TodaysContent } from './TodaysContent';
import { Quote } from './Quote';
import { Journals } from './Journals';
import { FixedButton } from '../../shared/components/FixedButton';

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
        <div className={`bg-narvik-light min-h-screen space-y-3`}>
            <div className=" py-2 px-3">
                <Navbar />

                {!JournalState.searched && (
                    <TodaysContent todaysJournal={JournalState.todaysJournal} />
                )}
            </div>

            {!JournalState.searched && (
                <>
                    <Stats stats={JournalState.stats} />

                    <Quote author="Bhavik Chavda" quote="Watever we give, we receive." />
                </>
            )}

            <Journals journals={JournalState.groupedJournals} />

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
