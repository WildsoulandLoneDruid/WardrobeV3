const mongoose = require('mongoose');
const { Schema } = mongoose;

export const wardrobeSchema = new mongoose.Schema ({
    name: { type: String, unique: true}, { _id: true });

  exports.MenuRoleModel = mongoose.model('MenuRoleModel', MenuRoleSchema, 'menu_role');