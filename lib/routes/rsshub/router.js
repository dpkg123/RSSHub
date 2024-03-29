module.exports = (router) => {
    router.get('/m/:key/:url', './media');
    router.get('/routes/:lang?', './routes');
    router.get('/transform/html/:url/:routeParams', './transform/html');
    router.get('/transform/json/:url/:routeParams', './transform/json');
    router.get('/transform/sitemap/:url/:routeParams?', './transform/sitemap');
};
