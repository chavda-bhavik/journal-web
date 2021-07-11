import React, { useEffect, useState } from 'react';
import useLocation from 'wouter/use-location';
import { Backdrop } from '../../../shared/components/Backdrop';
import { DatePicker } from '../DatePicker';

interface DateModalProps {
    onClose?: () => void;
    journalsDates: number[];
    journals: FormattedJournalType[];
    todaysJournal?: FormattedJournalType;
    show?: boolean;
}

export const DateModal: React.FC<DateModalProps> = ({
    onClose = () => {},
    journalsDates,
    journals,
    todaysJournal,
    show = false,
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
            // toggleBodyOverflow(false);
            setLocation(link);
        }
    };

    return (
        <Backdrop show={show} onClose={onClose}>
            <div className="bg-white rounded-t-md xs:rounded-md text-left w-full sm:w-min">
                <DatePicker selectedDay={selectedDay} setSelectedDay={onDateSelect} />
                <div className="bg-gray-50 px-4 xs:pb-3 pb-6 w-full">
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
        </Backdrop>
    );
};
