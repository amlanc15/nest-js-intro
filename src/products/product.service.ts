import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly mongooseModel : Model<Product>) {}

    private products: Product[] = [];

    public async addProduct(name: string, price: number, desc: string) {
        const prodModel = new this.mongooseModel({name, price, desc});
        const output = await prodModel.save();
        return `${output.id} Product Inserted Sucessfully`;
    }

    public getProducts() {
        return this.mongooseModel.find().exec();
    }

    public getProduct(id: string) {
       return this.findDetails(id);
    }

    private findDetails(id: string) {
        return this.mongooseModel.findById(id).exec();
    }

    public async delete(id: string) {
        await this.mongooseModel.findByIdAndDelete(id).exec();
        return `Product with ${id} deleted sucessfully`;
    }

    public async updateProduct(id: string, title: string, price: number, desc: string) {
        const data = await this.findDetails(id);
        data.name = title ? title : data.name;
        data.price = price ? price : data.price;
        data.desc = desc ? desc : data.desc;
        await data.save();
        return `Product Updated Sucessfully`;
    }
}