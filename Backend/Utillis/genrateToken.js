import jwt from "jsonwebtoken"

const genrateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,           // ✅ always true (Render is always HTTPS)
        sameSite: "None",       // ✅ fixes cross-site cookie rejection
        maxAge: 30 * 24 * 60 * 60 * 1000  // ✅ bug fix: was missing *60 (was 30 days in minutes, not ms)
    })
}

export default genrateToken