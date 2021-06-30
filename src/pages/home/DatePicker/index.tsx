import React from 'react';
import DP from 'react-day-picker/DayPicker';
// @ts-ignore
const DayPicker = DP.__esModule ? DP.default : DP;
import 'react-day-picker/lib/style.css';

const styles = `
.DayPicker {
    width: 100%;
}
.DayPicker-Weekday {
	font-size: 1.2em !important;
	padding: 0.64em !important;
}
.DayPicker-Day--today:not(.DayPicker-Day--outside) {
	color: white;
    background-color: #fbc740;
}
.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: #B6AE9F;
    color: white;
}
`;

interface DatePickerProps {
    selectedDay: Date | undefined;
    setSelectedDay: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    selectedDay,
    setSelectedDay,
}): JSX.Element => {
    return (
        <>
            <style>{styles}</style>
            <DayPicker
                disabledDays={{ after: new Date() }}
                selectedDays={selectedDay}
                onDayClick={(day: Date) => setSelectedDay(day)}
            />
        </>
    );
};
