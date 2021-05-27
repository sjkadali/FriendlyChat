import React from 'react';
import PropTypes from 'prop-types';

export default function Suggestions({ userId, following, loggedInUserDocId }) {
    return (
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