const redis = require("redis");
const {REDIS_URL} = require('./config/index')
const redisClient = redis.createClient({
  host: REDIS_URL      
});

redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

redisClient.connect();
// console.log("redisClient called")
module.exports = redisClient;
