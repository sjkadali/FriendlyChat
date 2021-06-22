import Skeleton from 'react-loading-skeleton'
import LoggedInUserContext from '../context/logged-in-user'
import usePhotos from '../hooks/use-photos';
import Post from './post/index';
import AddPost from '../components/post/add-post';
import { postMessage } from '../services/firebase';
import { useState, useContext } from 'react';
import UserContext from '../context/user';

export default function Timeline() {
    const { user } = useContext(LoggedInUserContext);
    const { photos } = usePhotos(user);

    const { user: loggedInUser } = useContext(UserContext);
    const [post, setPost] = useState(" ");

    console.log("loggedInUser: ", loggedInUser);

    async function handlePost(){
        console.log("post, postMessage.value: ", post);
        const posted = await postMessage(post, loggedInUser.userId);
        console.log('posted: ', posted);
    }

    return (
        <div className="container col-span-2 bg-gray-primary">
            <AddPost />                  
            {!photos ? (
                <div>
                    <p> No posts found</p>
                    <Skeleton count={4} width={640} height={500} className="mb-5" />
                </div>
            ) : photos?.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ): (
                <p className="text-center text-2x1">Follow people to see photos</p>
            )}  
        </div>
    );
}
