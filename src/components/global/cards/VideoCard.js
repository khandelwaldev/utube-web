const VideoCard = ({ video }) => {
  return (
    <div>
      <img src={video.thumbnail} width={200} />
    </div>
  );
};

export default VideoCard;
