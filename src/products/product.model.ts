import * as mongoose from "mongoose";


export const ProductSchema = new mongoose.Schema({
    name: { type: String, require: true },
    price:  { type: Number, require: true },
    desc:  { type: String, require: true }
});


export interface Product {
    id: string;
    name: string;
    price: number;
    desc: string;
}