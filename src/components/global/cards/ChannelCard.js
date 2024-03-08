const ChannelCard = ({ channel }) => {
  return (
    <div>
      <img
        src={channel.thumbnail}
        width={150}
        height={150}
        className="aspect-square rounded-full"
      />
    </div>
  );
};

export default ChannelCard;
