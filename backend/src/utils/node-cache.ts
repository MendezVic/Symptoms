import NodeCache from 'node-cache';
const myCache = new NodeCache();
myCache.flushAll();

export default myCache;
