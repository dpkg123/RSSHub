module.exports = (router) => {
    router.get('/:configId/posts', './posts');
    router.get('/:configId/notifications/:fulltext?', './notifications');
};
