import React, { useEffect, useState } from 'react';
import useLocation from 'wouter/use-location';
import { DatePicker } from '../DatePicker';

interface BackdropProps {
    onClose?: () => void;
    journalsDates: number[];
    journals: FormattedJournalType[];
    todaysJournal?: FormattedJournalType;
    show?: boolean;
    toggleBodyOverflow: (add: boolean) => void;
}

export const Backdrop: React.FC<BackdropProps> = ({
    onClose = () => {},
    journalsDates,
    journals,
    todaysJournal,
    show = false,
    toggleBodyOverflow,
}) => {
    const [, setLocation] = useLocation();
    const [selectedDay, setSelectedDay] = useState<Date>();
    const [buttonData, setButtonData] = useState({
        primaryButtonText: 'Create Todays Entry',
        primaryButtonLink: '/journal?phase=morning',
        secondaryButtonText: 'Complete evening entry',
        secondaryButtonLink: '',
    });

    useEffect(() => {
        const btnData = { ...buttonData };
        if (todaysJournal) {
            btnData.primaryButtonText = 'Go To Record';
            btnData.primaryButtonLink = `/view/${todaysJournal.id}`;
            btnData.secondaryButtonLink = `/journal?phase=evening&rid=${todaysJournal.id}&page=4`;
        } else {
            btnData.secondaryButtonLink = '';
        }
        setButtonData(btnData);
    }, [todaysJournal]);

    const onDateSelect = (date: Date): void => {
        date.setHours(0, 0, 0, 0);
        let tempDate;
        if (journalsDates.includes(date.getTime())) {
            const selectedJournal = journals.find((journal) => {
                tempDate = new Date(Number(journal.date));
                tempDate.setHours(0, 0, 0, 0);
                return tempDate.getTime() === date.getTime();
            });
            setButtonData({
                ...buttonData,
                primaryButtonText: 'Go To Record',
                primaryButtonLink: `/view/${selectedJournal!.id}`,
            });
        } else {
            setButtonData({
                ...buttonData,
                primaryButtonText: 'New for this date',
                primaryButtonLink: `/journal?phase=complete&date=${date.getTime()}`,
            });
        }
        setSelectedDay(date);
    };

    const onButtonClick = (link?: string): void => {
        if (link) {
            toggleBodyOverflow(false);
            setLocation(link);
        }
    };

    return (
        <div
            className={`fixed pin h-screen z-10 inset-0 overflow-hidden ${!show ? 'hidden' : ''}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* sm:block sm:p-0 */}
            <div className="flex items-end xs:items-center justify-center min-h-screen h-full pt-4">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                />
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="bg-white rounded-t-md xs:rounded-md text-left overflow-hidden transform transition-all w-full xs:w-auto z-20">
                    <DatePicker selectedDay={selectedDay} setSelectedDay={onDateSelect} />
                    <div className="bg-gray-50 px-4 py-3 w-full">
                        <button
                            type="button"
                            className="block w-full rounded-md shadow border border-transparent bg-gold-base px-4 py-2 text-base font-medium text-brown-dark focus:outline-none"
                            onClick={() => onButtonClick(buttonData.primaryButtonLink)}
                        >
                            {buttonData.primaryButtonText}
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full rounded-md shadow border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-brown-dark focus:outline-none"
                            onClick={() => onButtonClick(buttonData.secondaryButtonLink)}
                        >
                            {buttonData.secondaryButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
