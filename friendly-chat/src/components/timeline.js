import Skeleton from 'react-loading-skeleton'
import LoggedInUserContext from '../context/logged-in-user'
import usePhotos from '../hooks/use-photos';
import { useContext } from 'react';
import Post from './post/index';

export default function Timeline() {
    const { user } = useContext(LoggedInUserContext);
    const { photos } = usePhotos(user);
        return (
        <div className="container col-span-2">
            {!photos ? (
                <Skeleton count={4} width={640} height={500} className="mb-5" />
            ) : photos?.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ): (
                <p className="text-center text-2x1">Follow people to see photos</p>
            )}  
        </div>
    );
}
