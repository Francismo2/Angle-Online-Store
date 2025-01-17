import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Customer = sequelize.define(
  'Customer',
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    cartData: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    wishlistData: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    verification_code: {
      type: DataTypes.STRING(6),
      allowNull: true,   
    },
    verification_code_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'tbl_customers', 
    timestamps: false,          
  }
);

export default Customer;