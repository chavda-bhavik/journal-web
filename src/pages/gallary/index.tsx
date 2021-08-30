import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useLocation } from 'wouter';

import { useAppSelector } from '../../store';
import { Title } from '../home/Title';
import { Button } from '../../shared/components/Button';
import { ImageModal } from '../../shared/components/ImageModal';
import { IconButton } from '../../shared/components/IconButton/IconButton';
import { Image } from './Image/index';
import NoData from '../../shared/assets/images/no-data.png';

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

    let emptyContent = (
        <>
            <img src={NoData} className="p-10" />
            <p className="text-center">
                No images found! <br /> Try adding images to your journals to see them here.
            </p>
        </>
    );
    let imagesContent = JournalsState.formattedJournals.reduce((journals: any[], journal) => {
        if (journal.image) {
            journals.push(<Image key={journal.id} journal={journal} onClick={setJournal} />);
        }
        return journals;
    }, []);

    return (
        <div className="container p-2 w-2/3">
            <IconButton
                icon={['fas', 'arrow-left']}
                onClick={onBackClick}
                shadow="none"
                variant="narvik"
            />

            <Title title="Gallary" className="font-highlights my-3" />
            {imagesContent.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">{imagesContent}</div>
            ) : (
                emptyContent
            )}

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
