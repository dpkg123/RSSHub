module.exports = function (router) {
    router.get('/jwc/:type?', './jwc');
    router.get('/yxy/:type?', './yxy');
};
