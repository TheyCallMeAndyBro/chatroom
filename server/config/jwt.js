import jwt from "jsonwebtoken"

const createToken = (_id, email) => {
  const jwtkey = process.env.JWT_SECRET_KEY
  return jwt.sign({ id: _id, email }, jwtkey, { expiresIn: "3d" })
}

export default createToken