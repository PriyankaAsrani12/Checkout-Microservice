'use strict';
const { DataTypes, INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("cart_and_wishlist_table",{
    student_id: {
      type: INTEGER,
      references: {
        model: 'student_tables',
        key: 'student_id',
      },
  },
  student_cart_items:{
      type:STRING((255)),
      defaultValue: 0,
  },
  student_wish_list_items:{
      type:STRING((255)),
      defaultValue: 0,
  },
  createdAt:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
},
modifiedAt:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
}
  })},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("cart_and_wishlist_table");
  }
};
