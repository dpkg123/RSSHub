module.exports = (router) => {
    router.get('/bookstore/newest', './bookstore/newest');
    router.get('/collection/:id/:getAll?', './collection');
    router.get('/daily', './daily');
    router.get('/daily/section/:sectionId', './daily-section');
    router.get('/hot/:category?', './hot');
    router.get('/hotlist', './hotlist');
    router.get('/people/activities/:id', './activities');
    router.get('/people/answers/:id', './answers');
    router.get('/people/pins/:id', './pin/people');
    router.get('/pin/daily', './pin/daily');
    router.get('/pin/hotlist', './pin/hotlist');
    router.get('/posts/:usertype/:id', './posts');
    router.get('/question/:questionId/:sortBy?', './question');
    router.get('/timeline', './timeline');
    router.get('/topic/:topicId/:isTop?', './topic');
    router.get('/weekly', './weekly');
    router.get('/xhu/collection/:id', './xhu/collection');
    router.get('/xhu/people/activities/:hexId', './xhu/activities');
    router.get('/xhu/people/answers/:hexId', './xhu/answers');
    router.get('/xhu/people/posts/:hexId', './xhu/posts');
    router.get('/xhu/question/:questionId/:sortBy?', './xhu/question');
    router.get('/xhu/topic/:topicId', './xhu/topic');
    router.get('/xhu/zhuanlan/:id', './xhu/zhuanlan');
    router.get('/zhuanlan/:id', './zhuanlan');
};
