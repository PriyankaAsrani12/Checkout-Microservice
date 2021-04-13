const { db } = require('../db/sql');
const { DataTypes, INTEGER, STRING } = require('sequelize');

const Cart = db.define('cart_and_wishlist_table', {
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

})

db.sync();
module.exports = Cart;