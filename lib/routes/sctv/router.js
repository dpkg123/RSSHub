module.exports = function (router) {
    router.get('/programme/:id?/:limit?/:isFull?', './programme');
};
