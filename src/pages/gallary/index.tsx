import React, { useState } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'wouter';

import { useAppSelector } from '../../store';
import { Title } from '../home/Title';
import { Backdrop } from '../../shared/components/Backdrop';
import { Button } from '../../shared/components/Button';
import { ImageModal } from '../../shared/components/ImageModal';

interface GallaryProps {}

export const Gallary: React.FC<GallaryProps> = ({}) => {
    const [, setLocation] = useLocation();
    const JournalsState = useAppSelector((state) => state.journal);
    const [ journal, setJournal ] = useState<FormattedJournalType>(); 
    const onBackClick = () => {
        setLocation('/');
    };

    const goToJournal = () => {
        if(journal) setLocation(`/view/${journal.id}`);
    }

    let imageSrc = "";
    if(journal) {
        if(typeof journal.image === "string") imageSrc = journal.image;
        else if(journal.image?.name) imageSrc = URL.createObjectURL(journal.image)
    }

    return (
        <div className="bg-narvik-light min-h-screen h-full p-2">
            <button
                className="rounded-md px-3 py-2 focus:outline-none shadow-lg bg-narvik-medium"
                onClick={onBackClick}
            >
                <FontAwesomeIcon icon={['fas', 'arrow-left']} />
            </button>
            <Title title="Gallary" className="font-highlights my-3" />
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {JournalsState.formattedJournals.reduce((journals: any[], journal) => {
                    if (journal.image) {
                        journals.push(
                            <div key={journal.id} className="relative" onClick={() => setJournal(journal)}>
                                <img
                                    src={`data:image/png;base64,${journal.image}`}
                                    alt="journal image"
                                    className="rounded-xl object-cover object-center max-h-80 w-full border-2 border-narvik-medium h-full"
                                />
                                <span className="absolute bottom-2 left-2 text-white text-lg md:text-2xl lg:text-3xl font-medium p-2">
                                    {dayjs(Number(journal.date)).format('D MMM')}
                                </span>
                            </div>,
                        );
                    }
                    return journals;
                }, [])}
            </div>


            <ImageModal show={!!journal} imageSrc={imageSrc} onClose={() => setJournal(undefined)} >
                <div className="flex flex-row justify-between content-center p-2">
                    <span className="text-white font-normal text-2xl">{dayjs(Number(journal?.date)).format('D MMMM')}</span>
                    <Button active={true} onClick={goToJournal}>Go To Journal</Button>
                </div>
            </ImageModal>
        </div>
    );
};
