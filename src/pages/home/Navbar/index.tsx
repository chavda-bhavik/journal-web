import React, { useEffect, useState } from 'react';
import { useKeyPress } from '../../../shared/hooks/useKeyPress';
import { useAppDispatch, useAppSelector } from '../../../store';
import { resetJournals, searchJournals } from '../../../store/journal/Actions';
import { useLocation } from 'wouter';
import { IconButton } from '../../../shared/components/IconButton/IconButton';
import JournalImage from '../../../shared/assets/images/journal-icon.png';

export const Navbar: React.FC<{}> = () => {
    const [showSearch, setShowSearch] = useState(false);
    const journals = useAppSelector((state) => state.journal.journals);
    const dispatch = useAppDispatch();
    const [, setLocation] = useLocation();
    const searchRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const searchPressed = useKeyPress({ userKeys: ['s'] });
    let closePressed = useKeyPress({ userKeys: ['Escape'] });

    // useEffetch that set/close search
    useEffect(() => {
        if (searchPressed && !showSearch) setShowSearch(true);
        if (closePressed && showSearch) onClose();
    }, [searchPressed, showSearch, closePressed]);

    // useEffect that set focus to search input
    useEffect(() => {
        if (showSearch) searchRef.current.focus();
    }, [showSearch]);

    const onSearch = (e?: React.SyntheticEvent) => {
        if (e) e.preventDefault();
        const searchValue = searchRef.current.value;
        if (searchValue) {
            dispatch(searchJournals(searchValue, journals));
        }
    };

    const onClose = () => {
        dispatch(resetJournals(journals));
        setShowSearch(false);
    };

    const goToGallary = () => {
        setLocation('/gallary');
    };

    const navContent = (
        <div className="flex justify-between items-center md:py-2">
            <div className="flex-initial items-center cursor-not-allowed">
                <img src={JournalImage} className="w-11 rounded-md lg:w-12" />
            </div>
            <div className="flex-initial gap-2 sm:gap-3 md:gap-4 flex items-center cursor-pointer">
                <IconButton
                    icon={['fas', 'grip-horizontal']}
                    size="lg"
                    onClick={goToGallary}
                    shadow="none"
                    variant="white"
                />
                <IconButton
                    icon={['fas', 'search']}
                    size="lg"
                    onClick={() => setShowSearch(true)}
                    shadow="none"
                    variant="white"
                />
            </div>
        </div>
    );

    const searchContent = (
        <form className="flex flex-row items-center md:py-1" onSubmit={onSearch}>
            <IconButton
                icon={['fas', 'times']}
                size="lg"
                onClick={onClose}
                shadow="none"
                type="button"
                variant="brown"
            />
            <input
                ref={searchRef}
                type="text"
                name="search"
                className="w-full bg-narvik-light border-b-2 border-gold-base mx-2 px-1 pt-1 focus:outline-none text-xl"
            />
            <IconButton
                icon={['fas', 'search']}
                size="lg"
                type="submit"
                className="ml-1"
                active={true}
                onClick={onSearch}
                shadow="none"
                variant="brown"
            />
        </form>
    );

    return <div className="mt-1 h-12 md:h-16">{showSearch ? searchContent : navContent}</div>;
};
