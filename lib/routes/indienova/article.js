<<<<<<< HEAD
const got = require('@/utils/got');
const cheerio = require('cheerio');
const url = require('url');

module.exports = async (ctx) => {
    const type = ctx.params.type;
=======
import cache from '@/utils/cache';
import got from '@/utils/got';
import { load } from 'cheerio';
const { parseList, parseItem } = require('./utils');

module.exports = async (ctx) => {
    const type = ctx.req.param('type');
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f
    let link = 'https://indienova.com/indie-game-news/';
    if (type === 'development') {
        link = 'https://indienova.com/indie-game-development/';
    }
<<<<<<< HEAD
    const response = await got.get(link);

    const host = 'https://indienova.com';

    const $ = cheerio.load(response.data);
    const list = $('.article-panel h4').get();

    const items = await Promise.all(
        list.map(async (item) => {
            const $$ = cheerio.load(item);
            const itemUrl = url.resolve(host, $$('a').attr('href'));
            const title = $$('a').text();

            const cache = await ctx.cache.get(itemUrl);
            if (cache) {
                return JSON.parse(cache);
            }

            const resp = await got.get(itemUrl);

            const $$$ = cheerio.load(resp.data);

            const description = $$$('.indienova-single-post').html();

            const single = {
                title,
                description,
                pubDate: '',
                link: itemUrl,
                author: '',
            };
            ctx.cache.set(itemUrl, JSON.stringify(single));
            return single;
        })
    );

    ctx.state.data = {
        title: 'INDIENOVA',
        link: 'https://www.indienova.com/indie-game-news/',
        description: '独立游戏资讯 | indienova 独立游戏',
        item: items,
    };
=======
    const response = await got(link);

    const $ = load(response.data);
    const list = parseList($);

    const items = await Promise.all(list.map((item) => cache.tryGet(item.link, () => parseItem(item))));

    ctx.set('data', {
        title: $('head title').text(),
        link,
        description: '独立游戏资讯 | indienova 独立游戏',
        item: items,
    });
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f
};
