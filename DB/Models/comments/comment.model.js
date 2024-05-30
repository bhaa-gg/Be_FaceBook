import { DataTypes } from "sequelize";
import { Sequelize_Connnection } from "../../connection.js";
import { post_model } from "../Posts/post.models.js";
import { user_model } from "../User/user.models.js";

export const comments_model = Sequelize_Connnection.define("Comment", {
    comment_content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
})


post_model.hasMany(comments_model, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

comments_model.belongsTo(post_model);

user_model.hasMany(comments_model, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
comments_model.belongsTo(user_model);