module.exports = (router) => {
    router.get('/monthly-games', './monthly-games');
    router.get('/trophy/:id', './trophy');
};
