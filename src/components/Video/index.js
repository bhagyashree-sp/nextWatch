import "./index.css";

const Video = (props) => {
  const { video } = props;
  const {
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    channelName,
    profileImageUrl,
  } = video;

  const currentYear = new Date().getFullYear();
  const publishedYear = new Date(publishedAt).getFullYear();

  const yearsAgo = currentYear - publishedYear;
  return (
    <div className="video-container">
      <img src={thumbnailUrl} alt="thumb nail" className="thumbnail" />
      <h1 className="title">{title}</h1>
      <div className="channel-info">
        <img src={profileImageUrl} alt="profileUrl" className="profile-image" />
        <h1 className="channel-name">{channelName}</h1>
      </div>

      <p className="view-count">{viewCount} views</p>
      <p className="yearsAgo">{yearsAgo}years ago</p>
    </div>
  );
};

export default Video;
