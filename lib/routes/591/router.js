module.exports = function (router) {
    router.get('/:country/rent/:query?', './list');
};
