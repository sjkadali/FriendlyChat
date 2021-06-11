import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/firebase';

export default function Profile({user}) {
  
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: null,
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
           // const [user] = await getUserByUsername(user?.username);
            const photos =   await getUserPhotosByUsername(user?.username);
            dispatch({ profile: user, photosCollection: photos, followerCount: user?.
                followers.length });
        }
        if (user?.username){
            getProfileInfoAndPhotos();

        }
    }, [user?.username]);

    return (
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0 }
                profile={profile} 
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    )
}


Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.isRequired
    }).isRequired
};