import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function Suggestions({ userId, following, loggedInUserDocId }) {
    const [profiles, setProfiles] = useState(null);

    return  !profiles ? (
        <Skeleton count={1} height={150} className="mt-5 "/>
        ) : (
        <div>
        <h1>Suggestions, ${userId},  ${following}</h1>
        </div>
    )
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
};