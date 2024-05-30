import { user_model } from "../../../DB/Models/User/user.models.js"
import bcrypt from "bcrypt"




const signUp = (req, res) => {
    const { user_name, user_mail, user_pass } = req.body
    user_model.findOrCreate({
        where: { user_mail },
        defaults: { user_name, user_mail, user_pass: req.user_pass },
        attributes: { exclude: 'user_pass' }
    }).then(data => {
        return res.json({ mesg: "success Add", data })
    }).catch(err => {
        return res.json({ Error: "has Err", err })
    })
}
const login = (req, res) => {
    const { user_mail, user_pass } = req.body
    user_model.findOne({
        where: {
            user_mail,
        },

    }).then(data => {
        if (!data)
            return res.json({ message: "User Not Found" })
        const comPass = bcrypt.compareSync(user_pass, data.user_pass)

        return comPass ? res.json({ message: "success", data }) : res.json({ message: "Check mail or pass" })

    }).catch(err => {
        return res.json({ Error: "has Err", err })
    })


}

const logout = (req, res) => {
    return res.json({ message: 'Logout successful', token: null });
}


export {
    signUp,
    login,
    logout,
}