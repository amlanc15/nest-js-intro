import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService {

    public updateProduct(id: string, title: string, price: number, desc: string) {
        const [product] = this.getExactProduct(id);
        product.desc = desc ? desc : product.desc;
        product.price = price ? price : product.price;
        product.name = title ? title : product.name;
        return `Product with ${id} id is updated scuessfully.`
    }

    private products: Product[] = [];

    public addProduct(name: string, price: number, desc: string) {
        this.products.push(new Product(name, price, desc));
        return "Product Inserted Sucessfully";
    }

    public getProducts() {
        return [...this.products];
    }

    public getProduct(id: string) {
        const [prouct] = this.getExactProduct(id);
        return { ...prouct };
    }

    public delete(id: string) {
        const [_, index] = this.getExactProduct(id);
        this.products.splice(index, 1);
        return `Product with ${id} deleted sucessfully`;
    }

    private getExactProduct(id: string): [Product, number] {
        const prouct = this.products.findIndex((prod) => prod.id === id);
        if (!prouct) {
            throw new NotFoundException(`No product found with ${id} id.`);
        }
        return [this.products[prouct], prouct];
    }
}