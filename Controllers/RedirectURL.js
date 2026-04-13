import { URLs } from "../Models/urls.js";

export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;
  try {
    const element = await URLs.findOne({ shortId });
    if (!element) {
      return res.status(404).json({
        ok: false,
        message: "Short URL not found",
      });
    }

    return res.redirect(element.longUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};