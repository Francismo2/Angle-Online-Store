import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Order = sequelize.define(
  'Order',
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      // Convert order_id to string
      get() {
        const value = this.getDataValue('order_id');
        return String(value); // Convert order_id to string
      },
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_customers', // Ensure the customers table exists
        key: 'customer_id',
      },
      onDelete: 'CASCADE',
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        const value = this.getDataValue('items');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('items', JSON.stringify(value));
      },
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('total_amount');
        return parseFloat(value);
      },
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        const value = this.getDataValue('address');
        return value ? JSON.parse(value) : {};
      },
      set(value) {
        this.setDataValue('address', JSON.stringify(value));
      },
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Packing', 'Out for Delivery', 'Delivered', 'Cancelled Order'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    payment_method: {
      type: DataTypes.ENUM('COD'),
      allowNull: false,
      defaultValue: 'COD',
    },
    payment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    order_date: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: 'tbl_orders',
    timestamps: false,
  }
);

Order.associate = function(models) {
  // Define the relationship between orders and customers
  Order.belongsTo(models.Customer, {
    foreignKey: 'customer_id',
    as: 'customer',
  });
};

export default Order;