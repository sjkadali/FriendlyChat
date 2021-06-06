import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import { getUserByUsername } from '../../services/firebase';
import { getUserPhotosByUserId } from '../../services/firebase';

export default function Profile({ user }) {
    const { username } = user?.username;
    console.log("user, username", username);
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const [{ ...user }] = await getUserByUsername(username);
            const photos = getUserPhotosByUserId(user.userId);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.
                followers.length });
        }
        if (username){
            getProfileInfoAndPhotos();

        }
    }, [user.username]);

    return (
        <>
            <Header  />
           
        </>
    )
}


Profile.propTypes = {
    user: PropTypes.object.isRequired
};