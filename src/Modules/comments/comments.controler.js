import { comments_model } from "../../../DB/Models/comments/comment.model.js";





const add_comment = (req, res) => {

    const dataBody = req.body
    comments_model.create(dataBody).then(result => {
        return res.json({ message: "Comment created successfully", result })
    }).catch(err => {
        return res.json({ message: "Has Error", err })
    })
}


const reading_All_Comment = (req, res) => {
    comments_model.findAll().then(result => {
        return res.json({ message: "Your comments", result })
    }).catch(err => {
        return res.json({ message: "Has Error", err })
    })
}

const Update_Comment = (req, res) => {
    const { comment_content } = req.body
    comments_model.update({
        comment_content,
    }, {
        where: {
            "id": parseInt(req.params.id),
        }
    }).then(result => {
        result[0] ? res.json({ message: "Your comments Updated", result }) : res.json({ message: "Your comments Not Updated" })
    }).catch(err => {
        return res.json({ message: "Has Error", err })
    })
}


const delete_Comment = (req, res) => {
    comments_model.destroy({
        where: {
            "id": req.params.id
        }
    }).then(result => {
        return result ? res.json({ message: "Your comments Deleted", result }) : res.json({ message: "Your comments Not Deleted" })
    }).catch(err => {
        return res.json({ message: "Has Error", err })
    })
}

export {
    add_comment,
    reading_All_Comment,
    Update_Comment,
    delete_Comment,
}