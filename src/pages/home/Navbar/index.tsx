import React, { LegacyRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useKeyPress } from '../../../shared/hooks/useKeyPress';
import { useAppDispatch, useAppSelector } from '../../../store';
import { resetJournals, searchJournals } from '../../../store/journal/Actions';
import { useLocation } from 'wouter';

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

    const onSearch = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            search: { value: string };
        };
        const searchValue = target.search.value;
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
                <FontAwesomeIcon icon={['fas', 'calendar-day']} size="lg" />
                <h3 className="ml-2 inline-block text-xl">Timeline</h3>
            </div>
            <div className="flex-initial gap-2 sm:gap-3 md:gap-4 flex items-center cursor-pointer">
                <FontAwesomeIcon
                    icon={['fas', 'grip-horizontal']}
                    size="lg"
                    onClick={goToGallary}
                />
                <FontAwesomeIcon
                    icon={['fas', 'search']}
                    size="lg"
                    onClick={() => setShowSearch(true)}
                />
            </div>
        </div>
    );

    const searchContent = (
        <form className="flex flex-row items-center md:py-1" onSubmit={onSearch}>
            <FontAwesomeIcon icon={['fas', 'search']} size="lg" className="mx-1" />
            <input
                ref={searchRef}
                type="text"
                name="search"
                className="w-full bg-narvik-light border-b-2 border-gold-base mx-2 px-1 pt-1 focus:outline-none text-xl"
            />
            <FontAwesomeIcon icon={['fas', 'times']} size="lg" className="mx-1" onClick={onClose} />
        </form>
    );

    return <div className="mt-1">{showSearch ? searchContent : navContent}</div>;
};
