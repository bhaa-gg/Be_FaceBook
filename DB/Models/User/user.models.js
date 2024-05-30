import { DataTypes } from "sequelize";
import { Sequelize_Connnection } from "../../connection.js";

export const user_model = Sequelize_Connnection.define("User", {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    user_pass: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    timestamps: true
})