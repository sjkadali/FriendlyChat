import { Avatar } from '@material-ui/core';
import React from 'react';
import { Image} from 'react';
import postImage from './images//IMG_0358.png';
import './Post.css';

function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">

            </div>
            <Avatar 
                className="post__avatar"
                alt="sj"
                src="/images/logo192.png"
            />   
            {/* header -> avatar + username */}
            <h3>{username}</h3>
            {/* image */ }
            <img className="post_image" src={imageUrl} alt="image"/>
            {/* username + caption */}
            <h4 className="post__text"><strong>{username} :</strong>{ caption}</h4>
        </div>
    )
}

export default Post
