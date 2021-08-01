import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
    constructor(private readonly productSvc: ProductService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    public async addProduct(@Body("title") title: string,
                        @Body("price") price: number,
                        @Body("desc") desc: string) {
        return this.productSvc.addProduct(title, price, desc);
    }

    @Get()
    public getProducts() {
        return this.productSvc.getProducts();
    }

    @Get(":id")
    public getProduct(@Param("id") id: string) {
        return this.productSvc.getProduct(id);
    }

    @Patch(":id")
    public update(@Param("id") id: string,
                    @Body("title") title: string,
                    @Body("price") price: number,
                    @Body("desc") desc: string) {
        return this.productSvc.updateProduct(id, title, price, desc);
    }

    @Delete(":id")
    public delete(@Param("id") id: string) {
        return this.productSvc.delete(id);
    }
    
}