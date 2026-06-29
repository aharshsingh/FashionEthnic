const redis = require("redis");
const { REDIS_URL, REDIS_PASSWORD } = require('./config/index');

// Redis is OPTIONAL. If it's unreachable (e.g. the Upstash host no longer
// resolves) the app must keep running — never crash the process. Operations
// degrade to no-ops when Redis isn't connected.

let client = null;
let ready = false;

if (REDIS_URL) {
  client = redis.createClient({
    url: `rediss://:${REDIS_PASSWORD}@${REDIS_URL}`,
    socket: {
      // Give up after a few attempts instead of retrying (and logging) forever.
      reconnectStrategy: (retries) => {
        if (retries > 5) {
          console.error('Redis: unreachable after 5 attempts — continuing without Redis.');
          return false; // stop reconnecting
        }
        return Math.min(retries * 500, 3000);
      },
    },
  });

  client.on('connect', () => console.log('Connected to Redis'));
  client.on('ready', () => { ready = true; });
  client.on('end', () => { ready = false; });
  // Must have an 'error' listener or node-redis throws; keep it quiet-ish.
  client.on('error', (err) => {
    ready = false;
    if (err && err.code !== 'ECONNREFUSED') {
      // log once-ish; reconnectStrategy bounds how often this fires
      console.error('Redis Error:', err.message);
    }
  });

  // Crucial: catch so a failed initial connect doesn't become an
  // unhandled promise rejection (which would crash the process).
  client.connect().catch((err) => {
    ready = false;
    console.error('Redis connect failed — running without Redis:', err.message);
  });
} else {
  console.warn('REDIS_URL not set — running without Redis.');
}

// Safe wrapper: callers (OTP storage, token blacklist, pub/sub notifications)
// can use these freely; they no-op when Redis is unavailable.
const safeRedis = {
  isReady: () => ready,
  async get(key) {
    if (!ready) return null;
    try { return await client.get(key); } catch { return null; }
  },
  async setEx(key, ttl, value) {
    if (!ready) return null;
    try { return await client.setEx(key, ttl, value); } catch { return null; }
  },
  async set(key, value) {
    if (!ready) return null;
    try { return await client.set(key, value); } catch { return null; }
  },
  async del(key) {
    if (!ready) return null;
    try { return await client.del(key); } catch { return null; }
  },
  async publish(channel, message) {
    if (!ready) return null;
    try { return await client.publish(channel, message); } catch { return null; }
  },
};

module.exports = safeRedis;
