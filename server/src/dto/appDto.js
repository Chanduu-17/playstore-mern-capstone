module.exports = function appDto(app) {
  return {
    id: app._id,
    name: app.name,
    description: app.description,
    category: app.category,
    genre: app.genre,
    version: app.version,
    releaseDate: app.releaseDate,
    ratings: {
      average: app.ratingAverage,
      count: app.ratingCount
    },
    visible: app.visible,
    features: app.features,
    imageUrl: app.imageUrl,
    downloadCount: app.downloadCount,
    owner: app.owner && app.owner.name ? { id: app.owner._id, name: app.owner.name, email: app.owner.email } : app.owner
  };
};
