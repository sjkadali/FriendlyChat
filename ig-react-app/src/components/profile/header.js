
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skelton from 'react-loading-skeleton';

export default function Header() {
    //const {user} = username;
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);

    return (
        <div>
            <h1>Profile Header</h1>
        </div>
    )
}
