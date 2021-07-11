type Journal = {
    id: string;
    date: string;
    actions?: string;
    greatfullness?: string;
    affirmation?: string;
    highlights?: string;
    improvements?: string;
    status: number;
    image?: string;
};
type FormattedJournalType = {
    id: string;
    title: string;
    text: string;
    date: string;
    status: number;
    image?: string;
};
type stats = {
    total: number;
    months: number;
    weeks: number;
};

type GroupedJournalsType = Record<string, FormattedJournalType[]>;
