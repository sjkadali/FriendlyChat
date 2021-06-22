import { postMessage } from '../../services/firebase';
import { useState, useContext } from 'react';
import UserContext from '../../context/logged-in-user';

export default function AddPost() {
    const { user: loggedInUser } = useContext(UserContext);
    const [post, setPost] = useState(" ");

    const handlePost = async (event) => {
        event.preventDefault();
        const posted = await postMessage(post, loggedInUser.userId);
        setPost('');
    }

    return (
        <div class="p-4 pt-1 pb-4">
            <div class="flex flex-row mb-4">
             <form
                className="flex justify-between pl-1 pr-5"
                method="POST"
                onSubmit={(event) => 
                    post !== '' ? handlePost(event): event.preventDefault()
                }
            ></form>
            <input
                    aria-label="Post Message"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-4 py-4 px-4"
                    type="text"
                    name="post"
                    placeholder="Post Something..."
                    onChange={({ target }) => setPost(target.value)}
                    value={post}
                />
            <button 
                className={`text-sm font-bold text-blue-medium ${!post && 'opacity-25'}`}
                type="button"
                onClick={handlePost}>Post </button>
        </div>
        </div>
        
    )
}
