import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchJournals } from '../../store/journal/Actions';
import { DateModal } from './DateModal';
import { Stats } from './Stats';
import { Navbar } from './Navbar';
import { TodaysContent } from './TodaysContent';
import { Quote } from './Quote';
import { Journals } from './Journals';
import { useKeyPress } from '../../shared/hooks/useKeyPress';
import { Button } from '../../shared/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BottomSticky } from '../../shared/components/BottomSticky';
import { CSSTransition } from 'react-transition-group';

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
        <div className={`container space-y-3 relative`}>
            <div className=" py-2 px-3">
                <Navbar />
                <CSSTransition
                    in={!JournalState.searched}
                    timeout={500}
                    classNames="blur"
                    unmountOnExit
                >
                    <TodaysContent todaysJournal={JournalState.todaysJournal} />
                </CSSTransition>
            </div>

            <CSSTransition
                in={!JournalState.searched}
                timeout={500}
                classNames="blur"
                unmountOnExit
            >
                <>
                    <Stats stats={JournalState.stats} />

                    <Quote author="Bhavik Chavda" quote="Watever we give, we receive." />
                </>
            </CSSTransition>

            <Journals journals={JournalState.groupedJournals} />

            {JournalState.searched !== true && (
                <BottomSticky>
                    <Button
                        active={true}
                        className="w-full font-normal text-base"
                        onClick={() => toggleDateModal(true)}
                    >
                        <FontAwesomeIcon icon={['fas', 'plus']} /> Add Journal
                    </Button>
                </BottomSticky>
            )}

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
