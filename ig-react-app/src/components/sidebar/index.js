import {useContext} from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';
import useUser from '../../hooks/use-user'

export default function Sidebar() {
    const {user } =useUser();

    return (
        <div className="p-4">
            <User username={user?.username} fullName={user?.fullName} />
            <Suggestions userId ={user?.userId} following={user?.following} loggedInUserDocId={user?.docId} />
        </div>
    )
}
