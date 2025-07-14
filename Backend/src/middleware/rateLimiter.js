import ratelimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    const {success} = await ratelimit.limit("my-limit-key");
    //const {success} = await ratelimit.limit("userid"); to use user-specific rate limiting, replace "my-limit-key" with a unique identifier for the user, such as their user ID or IP address.
    if (!success) {
      return res.status(429).json({message: "Too many requests"});
    }
    next();
  } catch (error) {
    res.status(429).send("Too many requests");
    next(error);
  }
};

export default rateLimiter;
