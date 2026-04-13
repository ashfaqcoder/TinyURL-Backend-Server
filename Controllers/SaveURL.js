import { URLs } from "../Models/urls.js";
import { generateShortId } from "../Utils/Keys.js";

const normalizeUrl = (url) => {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `http://${url}`;
};

export const SaveURL = async (req, res) => {
  const { longUrl } = req.body;
  console.log(req.body);

  if (!longUrl) {
    return res.status(400).json({
      ok: false,
      message: "longUrl is required",
    });
  }

  try {
    const shortId = generateShortId(7);
    const normalizedUrl = normalizeUrl(longUrl);
    const newURL = new URLs({ longUrl: normalizedUrl, shortId });
    await newURL.save();
    const shortURL = `http://localhost:5050/${shortId}`;
    res.status(200).json({
      ok: true,
      shortURL: shortURL,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};
