type Journal = {
    id: number;
    date: string;
    actions?: string;
    greatfullness?: string;
    affirmation?: string;
    highlights?: string;
    improvements?: string;
    status: number;
};
type FormattedJournalType = {
    id: number;
    title: string;
    text: string;
    date: string;
    status: number;
};
