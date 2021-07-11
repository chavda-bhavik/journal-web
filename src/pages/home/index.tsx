import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchJournals } from '../../store/journal/Actions';
import { DateModal } from './DateModal';
import { Stats } from './Stats';
import { Navbar } from './Navbar';
import { TodaysContent } from './TodaysContent';
import { Quote } from './Quote';
import { Journals } from './Journals';
import { FixedButton } from '../../shared/components/FixedButton';
import { useKeyPress } from '../../shared/hooks/useKeyPress';
import { Button } from '../../shared/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface homeProps {}

export const home: React.FC<homeProps> = ({}) => {
    const JournalState = useAppSelector((state) => state.journal);
    const [showDateModal, setShowDateModal] = useState(false);
    const dispatch = useAppDispatch();

    let newPressed = useKeyPress({ userKeys: ['n'] });
    let closePressed = useKeyPress({ userKeys: ['Escape'] });

    useEffect(() => {
        if (newPressed && !showDateModal) toggleDateModal(true);
        if (closePressed && showDateModal) toggleDateModal(false);
    }, [newPressed, showDateModal, closePressed]);

    useEffect(() => {
        if (window.navigator.onLine) dispatch(fetchJournals());
    }, [window.navigator.onLine]);

    const toggleDateModal = (status: boolean) => {
        setShowDateModal(status);
    };

    return (
        <div className={`bg-narvik-light border-2 min-h-screen space-y-3 max-w-lg relative`}>
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

            {JournalState.searched !== true && (
                <div className="sticky bottom-0 bg-narvik-light w-full p-2 shadow-2xl">
                    <Button
                        active={true}
                        className="w-full font-normal text-base"
                        onClick={() => toggleDateModal(true)}
                    >
                        <FontAwesomeIcon icon={['fas', 'plus']} /> Add Journal
                    </Button>
                </div>
            )}
            {/* <FixedButton
                icon={['fas', 'plus']}
                className="bottom-2 right-2 text-brown-dark"
                onClick={() => toggleDateModal(true)}
            /> */}

            <DateModal
                journals={JournalState.formattedJournals}
                journalsDates={JournalState.formattedJournals.map((journal) =>
                    Number(journal.date),
                )}
                todaysJournal={JournalState.todaysJournal}
                show={showDateModal}
                onClose={() => toggleDateModal(false)}
            />
        </div>
    );
};
