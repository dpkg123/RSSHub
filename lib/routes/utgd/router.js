module.exports = function (router) {
    router.get('/timeline', './timeline');
    router.get('/topic/:topic?', './topic');
    router.get('/:category?', './category');
};
