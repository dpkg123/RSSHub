<<<<<<< HEAD
const got = require('@/utils/got');
const { ProcessFeed } = require('./utils');

module.exports = async (ctx) => {
    const id = ctx.params.id;
    const link = `https://vocus.cc/user/@${id}`;

    const { _id, fullname, intro } = (
        await got({
            method: 'get',
            url: `https://api.sosreader.com/api/users/${id}`,
            headers: {
                Referer: link,
            },
        })
    ).data;

    const { articles } = (
        await got({
            method: 'get',
            url: `https://api.sosreader.com/api/articles?userId=${_id}&num=10&status=2&sort=lastPublishAt`,
            headers: {
                Referer: link,
            },
        })
    ).data;

    const items = await ProcessFeed(articles, link, ctx.cache);

    ctx.state.data = {
        title: `${fullname}的个人文章 - 方格子`,
        link,
        description: intro,
        item: items,
    };
=======
import cache from '@/utils/cache';
import got from '@/utils/got';
const { processList, ProcessFeed, baseUrl, apiUrl } = require('./utils');

module.exports = async (ctx) => {
    const id = ctx.req.param('id');
    const link = `${baseUrl}/user/@${id}`;
    const userData = await cache.tryGet(`vocus:user:${id}`, async () => {
        const { data: userData } = await got(`${apiUrl}/api/users/${id}`, {
            headers: {
                referer: link,
            },
        });
        return {
            _id: userData._id,
            fullname: userData.fullname,
            avatarUrl: userData.avatarUrl,
            intro: userData.intro,
        };
    });

    const {
        data: { articles },
    } = await got(`${apiUrl}/api/articles`, {
        headers: {
            referer: link,
        },
        searchParams: {
            userId: userData._id,
        },
    });

    const list = processList(articles);

    const items = await ProcessFeed(list, cache.tryGet);

    ctx.set('data', {
        title: `${userData.fullname}｜方格子 vocus`,
        link,
        description: userData.intro,
        image: userData.avatarUrl,
        item: items,
    });
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f
};
