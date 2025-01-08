import React from 'react';
import ReactPlayer from 'react-player';

interface AudioPlayerProps {
  src: string; // YouTube video URL
  title: string; // Song title
  
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, }) => {
  return (
    <div className="audio-player">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="player-wrapper mt-6">
        <ReactPlayer
          url={src}
          controls
          width="100%"
          height="100%"
          className="react-player"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;