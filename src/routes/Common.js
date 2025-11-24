import { verifyJWT } from "../middleware/JWT.js";

const extraJwt = async (req, res, next) => {
  const {
    headers: { token },
  } = req;
  const checkToken = (await verifyJWT(token)) || false;
  if (!checkToken)
    return res
      .status(200)
      .json({ status: false, message: "Your token as been expired :(" });

  req.user = checkToken;
  next();
};

export { extraJwt };
