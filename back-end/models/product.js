import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Product = sequelize.define(
  'Product',
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      // CONVERT TO STRING 
      get() {
        const value = this.getDataValue('product_id');
        return String(value); // Convert product_id to string
      },
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sizes: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const value = this.getDataValue('sizes');
        return value ? value.split(',') : [];
      },
      set(value) {
        this.setDataValue('sizes', Array.isArray(value) ? value.join(',') : value);
      },
    },
    category_name: {
      type: DataTypes.ENUM('Men', 'Women', 'Shorts', 'Striped Shirts(UNISEX)'),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('price');
        return parseFloat(value);
      },
    },
    image_1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_3: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_4: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    images: {
      type: DataTypes.VIRTUAL,
      get() {
        // Collect all image fields into an array
        const images = [
          this.getDataValue('image_1'),
          this.getDataValue('image_2'),
          this.getDataValue('image_3'),
          this.getDataValue('image_4'),
        ].filter((image) => image !== null); // Exclude null values
        return images;
      },
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_bestseller: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'tbl_products',
    timestamps: false,
  }
);

export default Product;