module.exports = function (router) {
    router.get('/html_clip/:user/:tag', './index');
    router.get('/rss/:user/:tag', './rss');
};
