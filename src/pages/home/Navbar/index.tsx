import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { resetJournals, searchJournals } from '../../../store/journal/Actions';

export const Navbar: React.FC<{}> = () => {
    const [showSearch, setShowSearch] = useState(false);
    const journals = useAppSelector((state) => state.journal.journals);
    const dispatch = useAppDispatch();

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

    const navContent = (
        <div className="flex justify-between items-center">
            <div className="flex-initial items-center">
                <FontAwesomeIcon icon={['fas', 'calendar-day']} size="lg" />
                <h3 className="ml-2 inline-block text-xl">Timeline</h3>
            </div>
            <div className="flex-initial gap-2 sm:gap-3 md:gap-4 flex items-center">
                <FontAwesomeIcon
                    icon={['fas', 'search']}
                    size="lg"
                    onClick={() => setShowSearch(true)}
                />
            </div>
        </div>
    );

    const searchContent = (
        <form className="flex flex-row items-center" onSubmit={onSearch}>
            <FontAwesomeIcon icon={['fas', 'search']} size="lg" className="mx-1" />
            <input
                type="text"
                name="search"
                className="flex-grow bg-narvik-base border-b-2 border-gold-base mx-2 focus:outline-none"
            />
            <FontAwesomeIcon icon={['fas', 'times']} size="lg" className="mx-1" onClick={onClose} />
        </form>
    );

    return <div className="mt-1">{showSearch ? searchContent : navContent}</div>;
};
