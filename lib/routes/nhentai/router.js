module.exports = (router) => {
    router.get('/search/:keyword/:mode?', './search');
    router.get('/:key/:keyword/:mode?', './other');
};
