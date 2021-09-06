import { Urls } from "../models/url.js";
import validUrl from "valid-url";
import ErrorResponse from "../utils/errorResponse.js";
import { format } from "date-fns";

export const shortenUrl = async (req, res, next) => {
  const { longUrl, user } = req.body;

  if (!validUrl.isUri(longUrl)) return next(new ErrorResponse("Enter a valid url", 400));

  try {
    let url = await Urls.findOne({ longUrl, createdBy: user.email });

    if (url) {
      return res.status(200).json({
        success: true,
        data: url.shortUrl,
      });
    }

    url = new Urls({
      longUrl,
      createdBy: user.email,
    });

    await url.save();

    res.status(201).json({
      success: true,
      data: url.shortUrl,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const redirectUrl = async (req, res, next) => {
  const { urlCode } = req.params;

  try {
    const url = await Urls.findOne({ urlCode });

    if (!url) return next(new ErrorResponse("No Url Found", 404));

    url.count = url.count + 1;

    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    next(error);
  }
};

export const getUserUrl = async (req, res, next) => {
  const { user } = req.body;

  try {
    const userUrls = await Urls.find({ createdBy: user.email });

    if (!userUrls) {
      return res.status(200).json({ success: true, data: { urls: [], dayCount: "0", monthCount: "0" } });
    }

    const currentDate = format(new Date(), "dd MM Y");

    const months = userUrls.filter((ele) => ele.date.split(" ")[1] === currentDate.split(" ")[1]);

    const days = userUrls.filter((ele) => ele.date.split(" ")[0] === currentDate.split(" ")[0]);

    res.status(200).json({
      success: true,
      data: {
        urls: userUrls,
        dayCount: days.length,
        monthCount: months.length,
      },
    });
  } catch (error) {
    next(error);
  }
};
