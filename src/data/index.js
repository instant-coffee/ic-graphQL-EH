const videoA = {
  id: 'A',
  title: 'End of the World',
  duration: 128,
  watched: false,
  name: 'EOTW'
};

const videoB = {
  id: 'B',
  title: 'Begining of the End',
  duration: 103,
  watched: true,
  name: 'BOTE'
};

const videos = [videoA, videoB];

const getVideoById = (id) => new Promise( (resolve) => { 
  const [video] = videos.filter( (video) => {
    return video.id === id;
  });
  resolve(video)
})

const getVideos = () => new Promise( (resolve) => resolve(videos));

const createVideo = ({ title, duration, released }) => {
  const video = {
    id: (new Buffer(title, 'utf8')).toString('base64'),
    title,
    duration,
    released,
  };

  videos.push( video )

  return video;
}

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.createVideo = createVideo;