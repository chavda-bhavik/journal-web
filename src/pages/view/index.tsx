import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../../shared/components/Button';
import { Note } from './Note';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSingleJournal, deleteJournal } from '../../store/journal/Actions';
import { useLocation } from 'wouter';
import { FixedButton } from '../../shared/components/FixedButton';
import { useKeyPress } from '../../shared/hooks/useKeyPress';
import { ImageModal } from '../../shared/components/ImageModal';

interface ViewProps {
    params: {
        id: string;
    };
}

export const view: React.FC<ViewProps> = (props) => {
    const [, setLocation] = useLocation();
    const [edit, setEdit] = useState<boolean>(false);
    const [showImage, setShowImage] = useState<boolean>(false);
    const JournalState = useAppSelector((state) => state.journal);
    const dispatch = useAppDispatch();

    // keyPress hooks
    const editPressed = useKeyPress({ userKeys: ['e'] });
    let closePressed = useKeyPress({ userKeys: ['Escape'] });
    let deletePressed = useKeyPress({ userKeys: ['Delete'] });
    // keyPress listener useEffect call
    useEffect(() => {
        // if edit(e) clicked and journal is not in edit state
        if (!edit && editPressed) setEdit(true);
        // if close(escape) is pressed
        if (closePressed) onBackClick();
        // if delete is pressed
        if (deletePressed) deleteHandler();
    }, [editPressed, edit, closePressed, deletePressed]);

    useEffect(() => {
        dispatch(getSingleJournal(props.params.id, JournalState.journals, JournalState.fetched));
    }, []);

    const onClick = (i: number): void => {
        setLocation(`/journal?page=${i}&rid=${props.params.id}`);
    };

    const deleteHandler = async () => {
        dispatch(deleteJournal(props.params.id, JournalState.journals));
        setLocation('/');
    };

    const onBackClick = () => {
        setLocation('/');
    };

    let DeleteButton = null;
    if (!edit) {
        DeleteButton = (
            <FixedButton
                icon={['fas', 'trash-alt']}
                className="bottom-5 right-5 bg-white text-red-500"
                onClick={deleteHandler}
            />
        );
    }

    let image = null;
    if(JournalState.journal?.image) {
        if(typeof JournalState.journal.image === "string") {
            image = <img
                src={`data:image/png;base64,${JournalState.journal.image}`}
                alt="journal image"
                className="rounded-xl object-cover object-center max-h-80 md:max-h-96 w-full border-2"
            />
        } else if(JournalState.journal.image.name) {
            image = <img
                src={URL.createObjectURL(JournalState.journal.image)}
                alt="journal image"
                className="rounded-xl object-cover object-center max-h-80 md:max-h-96 w-full border-2"
            />
        }
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

            {(JournalState.journal?.image && image) && (
                <div className="mx-3" onClick={() => setShowImage(true)}>
                    {image}
                </div>
            )}

            <div className="px-3 pb-5">
                <FontAwesomeIcon icon={['fas', 'sun']} className="mt-4 mb-2" size="lg" />

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
                <FontAwesomeIcon icon={['fas', 'moon']} className="mt-4 mb-2" size="lg" />
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
            {
                (showImage && typeof JournalState.journal?.image === "string") &&
                <ImageModal show={showImage} image={ JournalState.journal?.image!} onClose={() => setShowImage(false)} />
            }
            {DeleteButton}
        </div>
    );
};
