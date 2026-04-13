import { URLs } from "../Models/urls.js";
import { getCache, setCache } from "../Utils/redis.js";

export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;
  try {
    const longURLfromCache = await getCache(shortId);
    if (longURLfromCache) {
      res.redirect(longURLfromCache);
      return;
    }
    const resUrls = await URLs.find({ shortId: shortId });
    const element = resUrls[0];
    await setCache(shortId, element.longUrl);
    res.redirect(element.longUrl);
  } catch (err) {
    res.status(500).json({ ok: false });
  }
};
