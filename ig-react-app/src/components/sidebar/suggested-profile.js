import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LoggedInUserContext from '../../context/logged-in-user';

const SuggestedProfile = ({
    profileDocId,
    username,
    profileId,
    userId,
    loggedInUserDocId
}) => {
    const [followed, setFollowed] = useState(false);
    //const { setActiveUser } = useContext(LoggedInUserContext);

    console.log('followed: ', followed);
    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            {<div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt="hh"
                />
            </div>}
            <h1>Suggested Profile!</h1>
        </div>
    ) : null;
}
export default SuggestedProfile;

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
};