<<<<<<< HEAD
const got = require('@/utils/got');

module.exports = async (ctx) => {
    const tag = ctx.params.tag;

    const response = await got.get(`https://www.4gamers.com.tw/site/api/news/by-tag?tag=${encodeURIComponent(tag)}&pageSize=25`);
    const list = response.data.data.results;

    ctx.state.data = {
        title: `4Gamers - #${tag}`,
        link: `https://www.4gamers.com.tw/news/tag/${encodeURIComponent(tag)}`,
        item: list.map((item) => ({
            title: item.title,
            author: item.author.nickname,
            description: `<img src="${item.smallBannerUrl}" /><p>${item.intro}</p>`,
            pubDate: new Date(item.createPublishedAt * 1),
            link: item.canonicalUrl,
        })),
    };
=======
import cache from '@/utils/cache';
import got from '@/utils/got';
const { parseList, parseItem } = require('./utils');

module.exports = async (ctx) => {
    const tag = ctx.req.param('tag');
    const limit = ctx.req.query('limit') ? Number.parseInt(ctx.req.query('limit')) : 25;

    const { data: response } = await got(`https://www.4gamers.com.tw/site/api/news/by-tag`, {
        searchParams: {
            tag,
            pageSize: limit,
        },
    });
    const list = parseList(response.data.results);

    const items = await Promise.all(list.map((item) => cache.tryGet(item.link, () => parseItem(item))));

    ctx.set('data', {
        title: `4Gamers - #${tag}`,
        link: `https://www.4gamers.com.tw/news/tag/${tag}`,
        item: items,
    });
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f
};
