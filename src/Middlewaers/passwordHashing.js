import bcrypt from "bcrypt"

export const hashPass = (req, res, next) => {
    const { user_pass } = req.body
    const hashPass = bcrypt.hash(user_pass, 8).then(pass => {
        req.user_pass = pass;
        next();
    }).catch(err => {
        return res.status(401).json({ message: "Invalid password", err })
    })

}
