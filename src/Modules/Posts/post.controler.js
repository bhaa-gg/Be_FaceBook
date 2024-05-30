import { post_model } from "../../../DB/Models/Posts/post.models.js"
import { user_model } from "../../../DB/Models/User/user.models.js"
import { comments_model } from './../../../DB/Models/comments/comment.model.js';


const add_post = (req, res) => {
    const dataBody = req.body
    post_model.create(dataBody).then(result => {
        return res.json({ message: 'success', result })
    }).catch(err => {
        return res.json({ message: 'Has Erorr', err })
    })

}

const reading_AllPosts = (req, res) => {
    post_model.findAll({
        where: {
            "isDeleted": false,
        }
    }).then(result => {
        result.length == 0 ? res.json({ message: 'no Posts' }) : res.json({ message: 'success', result });
    }).catch(err => {
        return res.json({ message: 'Has Erorr', err })
    });
}

const reading_Specific_Posts = (req, res) => {
    const { id } = req.params;
    post_model.findOne({
        where: {
            "id": id,
            "isDeleted": false,
        }
    }).then(result => {
        result ? res.json({ message: 'success', result }) : res.json({ message: 'No Post for this user' })
    }).catch(err => {
        return res.json({ message: 'Has Erorr', err })
    });
}

const update_Post = (req, res) => {
    const { id } = req.params;
    const { post_title, post_content, isDeleted } = req.body

    post_model.update({
        post_title,
        post_content,
        isDeleted,
    }, {
        where: {
            "id": id
        }
    }).then(result => {
        result[0] ? res.json({ message: 'Update Success', result }) : res.json({ message: 'post Not Found' })
    }).catch(err => {
        return res.json({ message: 'Has Erorr', err })
    });

}

const delete_Post = (req, res) => {
    const { id } = req.params
    post_model.destroy({
        where: {
            "id": id,
        }
    }).then(result => {
        result ? res.json({ message: "Delete Success", result }) : res.json({ message: 'post Not Found' })
    }).catch(err => {
        return res.json({ message: 'Has Erorr', err })
    });
}
const specific_post_author = (req, res) => {
    const { id } = req.params
    post_model.findByPk(id, {
        include: {
            model: user_model,
            attributes: { exclude: 'user_pass' }
        }
    }).then(result => {

        return  result ?  res.json({ message: "Success", result }):res.json({ message: "Post Not Found" })
    }).catch(err => {
        return res.json({ message: "Has Error", err })
    })
}
const specific_user_specific_posts_comments = (req, res) => {
    const { user_id, post_id } = req.query
    user_model.findAll({
        where:{
"id":user_id
        },
        attributes:{exclude :"user_pass"},
        include: {
            model : post_model,
            where:{
                "id" : post_id
            },
            include:{
                model : comments_model,
            }
        },
    }).then(results => {

        return  results.length ?  res.json({ message: "Success", results }) : res.json({ message: "Check user or post" })
        // return res.json({ message: "Success", results })
    }).catch(err => {
        return res.json({ message: "Has Error", err })
    })
}
const specific_user_specific_posts_comments_byName = (req, res) => {
    const { user_id, post_id } = req.query
    user_model.findAll({
        where:{
"user_name":user_id
        },
        attributes:{exclude :"user_pass"},
        include: {
            model : post_model,
            where:{
                "id" : post_id
            },
            include:{
                model : comments_model,
            }
        },
    }).then(results => {

        return  results.length ?  res.json({ message: "Success", results }) : res.json({ message: "Check user or post" })
        // return res.json({ message: "Success", results })
    }).catch(err => {
        return res.json({ message: "Has Error", err })
    })
}

export {
    add_post,
    reading_AllPosts,
    reading_Specific_Posts,
    update_Post,
    delete_Post,
    specific_post_author,
    specific_user_specific_posts_comments,
    specific_user_specific_posts_comments_byName,
}



// Full texts
// id
// post_title
// post_content
// isDeleted
// createdAt
// updatedAt
// UserId
	
// Full texts
// id	
// user_name
// Edit Edit
// Copy Copy
// Delete Delete
// 6
// love
// love you soo much
// 0
// 2024-05-29 14:04:18
// 2024-05-29 14:04:18
// 1
