import React, { useRef, useState } from 'react';
import videojs from 'video.js';
import VideoHeader from './VideoHeader';
import VideoFooter from './VideoFooter';
import './VideoCard.css'

function VideoCard(reel) {
//    const [videoPlaying, setVideoPlaying] = useState(false);
   const videoRef = useRef(null) || reel.id;

   /* const myPlayer = videojs(videoRef);
   myPlayer.src({type: 'video/mp4', src: `${reel.url}`}); */
   
  /*  const onVideoClick = () => {
       if (videoPlaying) {
        myPlayer.pause();
        setVideoPlaying(false);
       } else {
        myPlayer.play()
        setVideoPlaying(true);
       }
   }
 */
   return (
       <div className='videoCard'>
           <VideoHeader />
           
           <video 
           
            ref={reel.id} 
            // onClick={onVideoClick}
            className='video-js'               
            alt='IG reel video' 
            src={reel.url} 
            loop >    
                 
           </video>
           <VideoFooter
                channel={reel.channel}
                likes={reel.likes}
                shares={reel.shares}
                avatarSrc={reel.avatarSrc}
                song={reel.song}
            />     
        </div>
    )
}

export default VideoCard
