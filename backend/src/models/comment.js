import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Project } from "./Project.js";

export const Comment = sequelize.define("Comment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  text: { type: DataTypes.TEXT, allowNull: false }
});

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { as: "author", foreignKey: "userId" });
Project.hasMany(Comment, { foreignKey: "projectId" });
Comment.belongsTo(Project, { foreignKey: "projectId" });
