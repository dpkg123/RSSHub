module.exports = (router) => {
    router.get('/tag/:name?/:type?', './tag');
    router.get('/user/:name?', './user');
};
