import { describe, expect, it, jest, afterEach } from '@jest/globals';
import supertest from 'supertest';
import md5 from '@/utils/md5';
import type { serve } from '@hono/node-server';

let server: ReturnType<typeof serve>;

process.env.NODE_NAME = 'mock';

function checkBlock(response) {
    expect(response.status).toBe(403);
    expect(response.text).toMatch(/Access denied\./);
}

afterEach(() => {
    delete process.env.ACCESS_KEY;
    delete process.env.DENYLIST;
    delete process.env.ALLOWLIST;
    jest.resetModules();
    server.close();
});

describe('access-control', () => {
    it(`denylist`, async () => {
        const key = '1L0veRSSHub';
        const code = md5('/test/2' + key);
        process.env.DENYLIST = 'est/1,233.233.233.,black';
        process.env.ACCESS_KEY = key;
        server = (await import('@/index')).default;
        const request = supertest(server);

        const response11 = await request.get('/test/1');
        checkBlock(response11);

        const response12 = await request.get('/test/1').set('X-Mock-IP', '233.233.233.233');
        checkBlock(response12);

        const response13 = await request.get('/test/1').set('user-agent', 'blackua');
        checkBlock(response13);

        const response21 = await request.get('/test/2');
        expect(response21.status).toBe(200);

        const response22 = await request.get('/test/2').set('X-Mock-IP', '233.233.233.233');
        checkBlock(response22);

        const response23 = await request.get('/test/2').set('user-agent', 'blackua');
        checkBlock(response23);

        // wrong key/code, not on denylist
        const response311 = await request.get(`/test/2?key=wrong+${key}`);
        expect(response311.status).toBe(200);

        const response312 = await request.get(`/test/2?code=wrong+${code}`);
        expect(response312.status).toBe(200);

        // wrong key/code, on denylist
        const response321 = await request.get(`/test/2?key=wrong+${key}`).set('X-Mock-IP', '233.233.233.233');
        checkBlock(response321);

        const response322 = await request.get(`/test/2?code=wrong+${code}`).set('X-Mock-IP', '233.233.233.233');
        checkBlock(response322);

        // right key/code, on denylist
        const response331 = await request.get(`/test/2?key=${key}`).set('X-Mock-IP', '233.233.233.233');
        expect(response331.status).toBe(200);

        const response332 = await request.get(`/test/2?code=${code}`).set('X-Mock-IP', '233.233.233.233');
        expect(response332.status).toBe(200);
    });

    it(`allowlist`, async () => {
        const key = '1L0veRSSHub';
        const code = md5('/test/2' + key);
        process.env.ALLOWLIST = 'est/1,233.233.233.,103.31.4.0/22,white';
        process.env.ACCESS_KEY = key;
        server = (await import('@/index')).default;
        const request = supertest(server);

        const response01 = await request.get('/');
        expect(response01.status).toBe(200);

        const response02 = await request.get('/robots.txt');
        expect(response02.status).toBe(404);

        const response11 = await request.get('/test/1');
        expect(response11.status).toBe(200);

        const response12 = await request.get('/test/1').set('X-Mock-IP', '233.233.233.233');
        expect(response12.status).toBe(200);

        const response13 = await request.get('/test/1').set('user-agent', 'whiteua');
        expect(response13.status).toBe(200);

        const response21 = await request.get('/test/2');
        checkBlock(response21);

        const response22 = await request.get('/test/2').set('X-Mock-IP', '233.233.233.233');
        expect(response22.status).toBe(200);

        const response221 = await request.get('/test/2').set('X-Mock-IP', '103.31.4.0');
        expect(response221.status).toBe(200);

        const response222 = await request.get('/test/2').set('X-Mock-IP', '103.31.7.255');
        expect(response222.status).toBe(200);

        const response223 = await request.get('/test/2').set('X-Mock-IP', '103.31.8.0');
        checkBlock(response223);

        const response23 = await request.get('/test/2').set('user-agent', 'whiteua');
        expect(response23.status).toBe(200);

        // wrong key/code, not on allowlist
        const response311 = await request.get(`/test/2?code=wrong+${code}`);
        checkBlock(response311);

        const response312 = await request.get(`/test/2?key=wrong+${key}`);
        checkBlock(response312);

        // wrong key/code, on allowlist
        const response321 = await request.get(`/test/2?code=wrong+${code}`).set('X-Mock-IP', '233.233.233.233');
        expect(response321.status).toBe(200);

        const response322 = await request.get(`/test/2?key=wrong+${key}`).set('X-Mock-IP', '233.233.233.233');
        expect(response322.status).toBe(200);

        // right key/code
        const response331 = await request.get(`/test/2?code=${code}`);
        expect(response331.status).toBe(200);

        const response332 = await request.get(`/test/2?key=${key}`);
        expect(response332.status).toBe(200);
    });

    it(`no list`, async () => {
        const key = '1L0veRSSHub';
        const code = md5('/test/2' + key);
        process.env.ACCESS_KEY = key;
        server = (await import('@/index')).default;
        const request = supertest(server);

        const response01 = await request.get('/');
        expect(response01.status).toBe(200);

        const response02 = await request.get('/robots.txt');
        expect(response02.status).toBe(404);

        const response11 = await request.get('/test/1');
        checkBlock(response11);

        const response21 = await request.get('/test/2');
        checkBlock(response21);

        // wrong key/code
        const response321 = await request.get(`/test/2?key=wrong+${key}`);
        checkBlock(response321);

        const response322 = await request.get(`/test/2?code=wrong+${code}`);
        checkBlock(response322);

        // right key/code
        const response331 = await request.get(`/test/2?key=${key}`);
        expect(response331.status).toBe(200);

        const response332 = await request.get(`/test/2?code=${code}`);
        expect(response332.status).toBe(200);
    });
});
