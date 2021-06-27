import React, { useEffect, useState } from 'react';
import { FixedButton } from '../../shared/components/FixedButton';
import { Journals } from './Journals';
import { Quote } from './Quote';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchJournals } from '../../store/journal/Actions';
import { Backdrop } from './Backdrop';
import { Stats } from './Stats';
import { Navbar } from './Navbar';
import { useLocation } from 'wouter';
import { Title } from './Title';
import { Journal } from './Journal';

interface homeProps {}

export const home: React.FC<homeProps> = ({}) => {
    const [, setLocation] = useLocation();
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

    const onJournalClick = (journal: FormattedJournalType) => {
        setLocation(`/view/${journal.id}`);
    };

    const toggleDateModal = (status: boolean) => {
        toggleBodyOverflowHidden(status);
        setShowDateModal(status);
    };

    return (
        <div className={`bg-narvik-light min-h-screen space-y-3`}>
            <div className="bg-narvik-base py-2 px-3">
                <Navbar />

                {JournalState.todaysJournal && !JournalState.searched && (
                    <>
                        <Title title="Today" />
                        <Journal journal={JournalState.todaysJournal} onClick={onJournalClick} />
                    </>
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
