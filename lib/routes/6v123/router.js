module.exports = (router) => {
    router.get('/latestMovies', './latest-movies');
    router.get('/latestTVSeries', './latest-tvseries');
};
