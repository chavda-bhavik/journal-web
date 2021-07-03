import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../../shared/components/Button';
import { Note } from './Note';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSingleJournal } from '../../store/journal/Actions';
import { useLocation } from 'wouter';

interface ViewProps {
    params: {
        id: string;
    };
}

export const view: React.FC<ViewProps> = (props) => {
    const [, setLocation] = useLocation();
    const [edit, setEdit] = useState<boolean>(false);
    const JournalState = useAppSelector((state) => state.journal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSingleJournal(props.params.id));
    }, []);

    const onClick = (i: number): void => {
        setLocation(`/journal?page=${i}&rid=${props.params.id}`);
    };

    const onBackClick = () => {
        setLocation('/');
    };

    let DeleteButton = null;
    if (!edit) {
        <span className="fixed bottom-5 right-5 float-right px-3 py-2 rounded-full bg-white text-red-500 shadow-md">
            <FontAwesomeIcon icon={['fas', 'trash-alt']} />
        </span>;
    }

    return (
        <div className="bg-narvik-light min-h-screen">
            <div className="flex flex-row py-3 justify-between items-center px-3">
                <Button onClick={onBackClick}>
                    <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                </Button>
                {/* <IconButton icon={['fas', 'arrow-left']} onClick={goBack} /> */}
                <span className="text-lg"></span>
                <Button
                    text={edit ? 'Done' : 'Edit'}
                    onClick={() => setEdit(!edit)}
                    active={edit}
                />
            </div>

            <div className="mx-3">
                <img
                    src="https://dummyimage.com/600x400/e9e4eb/000000"
                    alt="journal image"
                    width="600"
                    height={400}
                    className="rounded-xl w-full"
                />
            </div>

            <div className="px-3 pb-5">
                <FontAwesomeIcon icon={['fas', 'sun']} className="mt-3" />

                <Note
                    className="mt-3"
                    editing={edit}
                    title="3 things I am greateful for..."
                    text={JournalState.journal?.greatfullness}
                    onClick={() => onClick(1)}
                />
                <Note
                    className="mt-7"
                    editing={edit}
                    title="WHAT WILL I DO TO MAKE TODAY GREAT?"
                    text={JournalState.journal?.actions}
                    onClick={() => onClick(2)}
                />
                <Note
                    className="mt-7"
                    editing={edit}
                    title="DAILY AFFIRMATION"
                    text={JournalState.journal?.affirmation}
                    isList={false}
                    onClick={() => onClick(3)}
                />
            </div>

            <div className="px-3 pb-5 bg-narvik-base">
                <FontAwesomeIcon icon={['fas', 'moon']} className="mt-3" />
                <Note
                    className="mt-3"
                    editing={edit}
                    title="Highlights of the day"
                    text={JournalState.journal?.highlights}
                    onClick={() => onClick(4)}
                />
                <Note
                    className="mt-7"
                    editing={edit}
                    title="Things that can be improved"
                    text={JournalState.journal?.improvements}
                    isList={false}
                    onClick={() => onClick(5)}
                />
            </div>
            {DeleteButton}
        </div>
    );
};
