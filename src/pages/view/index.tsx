import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../../shared/components/Button';
import { Note } from './Note';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSingleJournal, deleteJournal } from '../../store/journal/Actions';
import { useLocation } from 'wouter';
import { useKeyPress } from '../../shared/hooks/useKeyPress';
import { ImageModal } from '../../shared/components/ImageModal';
import { BottomSticky } from '../../shared/components/BottomSticky';

interface ViewProps {
    params: {
        id: string;
    };
}

export const view: React.FC<ViewProps> = (props) => {
    const [, setLocation] = useLocation();
    const [edit, setEdit] = useState<boolean>(false);
    const [showImage, setShowImage] = useState<boolean>(false);
    const { journals, journal, fetched } = useAppSelector((state) => state.journal);
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
        dispatch(getSingleJournal(props.params.id, journals, fetched));
    }, []);

    const onClick = (i: number): void => {
        setLocation(`/journal?page=${i}&rid=${props.params.id}`);
    };

    const deleteHandler = async () => {
        dispatch(deleteJournal(props.params.id, journals));
        setLocation('/');
    };

    const onBackClick = () => {
        setLocation('/');
    };

    let DeleteButton = null;
    if (!edit) {
        // sticky bottom-0 bg-narvik-light w-full p-2 shadow-2xl
        DeleteButton = (
            <BottomSticky>
                <Button
                    className="w-full font-normal text-base text-white"
                    danger={true}
                    onClick={deleteHandler}
                >
                    <FontAwesomeIcon icon={['fas', 'trash-alt']} /> Delete Journal
                </Button>
            </BottomSticky>
        );
    }

    let image = null;
    if (journal?.image) {
        if (typeof journal.image === 'string') {
            image = (
                <img
                    src={`data:image/png;base64,${journal.image}`}
                    alt="journal image"
                    className="rounded-xl object-cover object-center max-h-80 md:max-h-96 w-full border-2"
                />
            );
        } else if (journal.image.name) {
            image = (
                <img
                    src={URL.createObjectURL(journal.image)}
                    alt="journal image"
                    className="rounded-xl object-cover object-center max-h-80 md:max-h-96 w-full border-2"
                />
            );
        }
    }

    let imageSrc = '';
    if (journal) {
        if (typeof journal.image === 'string') imageSrc = `data:image/png;base64,${journal.image}`;
        else if (journal.image?.name) imageSrc = URL.createObjectURL(journal.image);
    }

    return (
        <div className="container">
            <div className="flex flex-row py-3 justify-between items-center px-3">
                <Button onClick={onBackClick} className="border-2">
                    <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                </Button>
                {/* <IconButton icon={['fas', 'arrow-left']} onClick={goBack} /> */}
                <span className="text-lg"></span>
                <Button
                    text={edit ? 'Done' : 'Edit'}
                    onClick={() => setEdit(!edit)}
                    active={edit}
                    className="border-2"
                />
            </div>

            {journal?.image && image && (
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
                    text={journal?.greatfullness}
                    onClick={() => onClick(1)}
                />
                <Note
                    className="mt-7"
                    editing={edit}
                    title="WHAT WILL I DO TO MAKE TODAY GREAT?"
                    text={journal?.actions}
                    onClick={() => onClick(2)}
                />
                <Note
                    className="mt-7"
                    editing={edit}
                    title="DAILY AFFIRMATION"
                    text={journal?.affirmation}
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
                    text={journal?.highlights}
                    onClick={() => onClick(4)}
                />
                <Note
                    className="mt-7"
                    editing={edit}
                    title="Things that can be improved"
                    text={journal?.improvements}
                    isList={false}
                    onClick={() => onClick(5)}
                />
            </div>
            {showImage && imageSrc && (
                <ImageModal
                    show={showImage}
                    imageSrc={imageSrc}
                    onClose={() => setShowImage(false)}
                />
            )}
            {DeleteButton}
        </div>
    );
};
