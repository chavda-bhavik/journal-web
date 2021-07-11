module.exports = {
    purge: ['src/**/*.tsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                highlights: ['"Libre Baskerville"', 'serif'],
            },
            colors: {
                white: '#FFFFFF',
                narvik: {
                    light: '#f3f2ee',
                    base: '#EDEDE5',
                    medium: '#d8d8cd',
                    dark: '#4B4238',
                },
                brown: {
                    dark: '#4B4238',
                    light: '#B6AE9F',
                },
                gold: {
                    base: '#FBC740',
                },
            },
            maxWidth: {
                '9/10': '90%',
            },
            screens: {
                xs: '376px',
            },
            width: {
                11: '2.75rem',
                128: '32rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
