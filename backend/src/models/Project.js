import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";

export const Project = sequelize.define("Project", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  domain: { type: DataTypes.STRING, allowNull: false },
  abstract: { type: DataTypes.TEXT, allowNull: false },
  techStack: { type: DataTypes.STRING, allowNull: true },
  institution: { type: DataTypes.STRING, allowNull: false },
  academicLevel: { type: DataTypes.ENUM("UG", "PG", "PhD"), allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  plagiarismScore: { type: DataTypes.FLOAT, allowNull: true },
  fileUrl: { type: DataTypes.STRING, allowNull: true }
});

User.hasMany(Project, { foreignKey: "ownerId" });
Project.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
