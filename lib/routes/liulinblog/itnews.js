module.exports = (ctx) => {
    const { channel } = ctx.req.param();
    const redirectTo = `/liulinblog/${channel}`;
    ctx.redirect(redirectTo);
};
