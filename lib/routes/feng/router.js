module.exports = (router) => {
    router.get('/forum/:id/:type?', './forum');
};
