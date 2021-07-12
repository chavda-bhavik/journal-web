import React, { useState } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'wouter';

import { useAppSelector } from '../../store';
import { Title } from '../home/Title';
import { Button } from '../../shared/components/Button';
import { ImageModal } from '../../shared/components/ImageModal';
import { IconButton } from '../../shared/components/IconButton/IconButton';
import { Image } from './Image/index';

interface GallaryProps {}

export const Gallary: React.FC<GallaryProps> = ({}) => {
    const [, setLocation] = useLocation();
    const JournalsState = useAppSelector((state) => state.journal);
    const [journal, setJournal] = useState<FormattedJournalType>();
    const onBackClick = () => {
        setLocation('/');
    };

    const goToJournal = () => {
        if (journal) setLocation(`/view/${journal.id}`);
    };

    let imageSrc = '';
    if (journal) {
        if (typeof journal.image === 'string') imageSrc = `data:image/png;base64,${journal.image}`;
        else if (journal.image?.name) imageSrc = URL.createObjectURL(journal.image);
    }

    return (
        <div className="container p-2">
            <IconButton
                icon={['fas', 'arrow-left']}
                onClick={onBackClick}
                shadow="none"
                variant="narvik"
            />

            <Title title="Gallary" className="font-highlights my-3" />
            <div className="grid grid-cols-3 gap-2">
                {JournalsState.formattedJournals.reduce((journals: any[], journal) => {
                    if (journal.image) {
                        journals.push(
                            <Image key={journal.id} journal={journal} onClick={setJournal} />,
                        );
                    }
                    return journals;
                }, [])}
            </div>

            <ImageModal show={!!journal} imageSrc={imageSrc} onClose={() => setJournal(undefined)}>
                <div className="flex flex-row justify-between content-center p-2">
                    <span className="text-white font-normal text-2xl">
                        {dayjs(Number(journal?.date)).format('D MMMM')}
                    </span>
                    <Button active={true} onClick={goToJournal}>
                        Go To Journal
                    </Button>
                </div>
            </ImageModal>
        </div>
    );
};
