module.exports = function (router) {
    router.get('/news/:ticker', './quote');
    router.get('/:category?', './news');
};
