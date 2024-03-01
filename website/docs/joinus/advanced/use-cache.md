---
sidebar_position: 3
---

# Using Cache

<<<<<<< HEAD
All routes have a cache that expires after a short duration. You can change how long the cache lasts by modifying the `CACHE_EXPIRE` value in the `lib/config.js` file using environment variables. However, for interfaces that have less frequently updated content, it's better to specify a longer cache expiration time using `CACHE_CONTENT_EXPIRE` instead.
=======
RSSHub have a cache module that expires after a short duration. You can change how long the cache lasts by modifying the `CACHE_EXPIRE` value in the `lib/config.js` file using environment variables. However, for interfaces that have less frequently updated content, it's better to specify a longer cache expiration time using `CACHE_CONTENT_EXPIRE` instead.
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f

For example, to retrieve the full text of the first comment for each issue, you can make a request to `${baseUrl}/${user}/${repo}/issues/${id}`, since this data is unavailable through `${baseUrl}/${user}/${repo}/issues`. It's recommended to store this data in the cache to avoid making repeated requests to the server.

Here's an example of how you can use the cache to retrieve the data:

```js
<<<<<<< HEAD
    const items = await Promise.all(
        list.map((item) =>
            ctx.cache.tryGet(item.link, async () => {
                const { data: response } = await got(item.link);
                const $ = cheerio.load(response);
=======
    import cache from '@/utils/cache';

    const items = await Promise.all(
        list.map((item) =>
            cache.tryGet(item.link, async () => {
                const { data: response } = await got(item.link);
                const $ = load(response);
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f

                item.description = $('.comment-body').first().html();

                return item;
            })
        )
    );
```

<<<<<<< HEAD
The above code snippet from [Create Your Own RSSHub Route](/joinus/new-rss/start-code#better-reading-experience) shows how to use the cache to get the full text of the first comment of each issue. `ctx.cache.tryGet()` is used to determine if the data is already available within the cache. If it's not, the code retrieves the data and stores it in the cache.
=======
The above code snippet from [Create Your Own RSSHub Route](/joinus/new-rss/start-code#better-reading-experience) shows how to use the cache to get the full text of the first comment of each issue. `cache.tryGet()` is used to determine if the data is already available within the cache. If it's not, the code retrieves the data and stores it in the cache.
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f

The object returned from the previous statement will be reused, and an extra `description` property will be added to it. The returned cache for each `item.link` will be `{ title, link, pubDate, author, category, description }`. The next time the same path is requested, this processed cache will be used instead of making a request to the server and recomputing the data.

:::warning

Any assignments to variables that are declared outside of the `tryGet()` function will not be processed under a cache-hit scenario. For example, the following code will not work as expected:

```js
    let x = '1';
<<<<<<< HEAD
    const z = await ctx.cache.tryGet('cache:key', async () => {
=======
    const z = await cache.tryGet('cache:key', async () => {
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f
        x = '2';
        const y = '3';
        return y;
    })
    console.log(x); // cache miss: '2', cache hit: '1'
    console.log(z): // '3'
```

:::

## API

<<<<<<< HEAD
### ctx.cache.tryGet(key, getValueFunc [, maxAge [, refresh ]])
=======
### cache.tryGet(key, getValueFunc [, maxAge [, refresh ]])
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key  | `string` | *(Required)* The key used to store and retrieve the cache. You can use `:` as a separator to create a hierarchy. |
| getValueFunc | `function` \| `string` | *(Required)* A function that returns data to be cached when a cache miss occurs.
| maxAge | `number` | *(Optional)* The maximum age of the cache in seconds. If not specified, `CACHE_CONTENT_EXPIRE` will be used. |
| refresh | `boolean` | *(Optional)* Whether to renew the cache expiration time when the cache is hit. `true` by default. |

#### Defined in

[lib/middleware/cache/index.js](https://github.com/DIYgod/RSSHub/blob/master/lib/middleware/cache/index.js#L58)

:::tip

<<<<<<< HEAD
Below are advanced methods for using cache. You should use `ctx.cache.tryGet()` most of the time.

Note that you need to use `JSON.parse()` when retrieving the cache using `ctx.cache.get()`.

:::

### ctx.cache.get(key [, refresh ])
=======
Below are advanced methods for using cache. You should use `cache.tryGet()` most of the time.

Note that you need to use `JSON.parse()` when retrieving the cache using `cache.get()`.

:::

### cache.get(key [, refresh ])
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key  | `string` | *(Required)* The key used to retrieve the cache. You can use `:` as a separator to create a hierarchy. |
| refresh | `boolean` | *(Optional)* Whether to renew the cache expiration time when the cache is hit. `true` by default. |

<<<<<<< HEAD
### ctx.cache.set(key, value [, maxAge ])
=======
### cache.set(key, value [, maxAge ])
>>>>>>> 7ddf992fa7aab3d9ca976af8003f7771d3c3b35f

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| key  | `string` | *(Required)* The key used to store the cache. You can use `:` as a separator to create a hierarchy. |
| value | `function`\| `string` | *(Required)* The value to be cached. |
| maxAge | `number` | *(Optional)* The maximum age of the cache in seconds. If not specified, `CACHE_CONTENT_EXPIRE` will be used. |
