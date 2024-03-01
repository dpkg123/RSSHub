<<<<<<< HEAD
const got = require('@/utils/got');

module.exports = async (ctx) => {
    const category = ctx.params.category;

    const response = await got.get(`https://www.4gamers.com.tw/site/api/news/by-category/${category}?pageSize=25`);
    const list = response.data.data.results;

    ctx.state.data = {
        title: `4Gamers - ${list[0].category.name}`,
        link: `https://www.4gamers.com.tw/news/category/${category}/`,
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
const { parseList, parseItem, getCategories } = require('./utils');

module.exports = async (ctx) => {
    const category = ctx.req.param('category');
    const limit = ctx.req.query('limit') ? Number.parseInt(ctx.req.query('limit')) : 25;
    const isLatest = !category;

    const { data: response } = await got(`https://www.4gamers.com.tw/site/api/news/${isLatest ? 'latest' : `by-category/${category}`}`, {
        searchParams: {
            nextStart: 0,
            pageSize: limit,
        },
    });
    const list = parseList(response.data.results);

    const items = await Promise.all(list.map((item) => cache.tryGet(item.link, () => parseItem(item))));

    let categories = [];
    let categoryName = '最新消息';
    if (!isLatest) {
        categories = await getCategories(cache.tryGet);
        categoryName = categories.find((c) => c.id === Number.parseInt(category)).name;
    }

    ctx.set('data', {
        title: `4Gamers - ${categoryName}`,
        link: `https://www.4gamers.com.tw/news${isLatest ? '' : `/category/${category}/${categoryName}`}`,
        item: items,
    });
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f
};
