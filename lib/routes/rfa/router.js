module.exports = (router) => {
    router.get('/:language?/:channel?/:subChannel?', './index');
};
