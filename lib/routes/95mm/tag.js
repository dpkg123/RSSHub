const { rootUrl, ProcessItems } = require('./utils');

module.exports = async (ctx) => {
    const tag = ctx.req.param('tag');

    const currentUrl = `${rootUrl}/tag-${tag}/page-1/index.html`;

    ctx.set('data', await ProcessItems(ctx, tag, currentUrl));
};
