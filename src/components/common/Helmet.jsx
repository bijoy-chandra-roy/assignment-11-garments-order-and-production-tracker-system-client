import { useEffect } from 'react';

const Helmet = ({ title }) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = `${title} | Haystack`;

        return () => {
            document.title = previousTitle;
        };
    }, [title]);

    return null;
};

export default Helmet;