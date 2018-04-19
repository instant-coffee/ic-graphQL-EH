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

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;