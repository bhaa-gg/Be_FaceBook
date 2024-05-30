import { DataTypes } from "sequelize";
import { Sequelize_Connnection } from "../../connection.js";
import { user_model } from "../User/user.models.js";

export const post_model = Sequelize_Connnection.define("Post", {
    post_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true
})


user_model.hasMany(post_model, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

post_model.belongsTo(user_model)