export class Product {
    public id: string;
    constructor(public name: string,
                public price: number,
                public desc: string) {
        this.id = Math.random().toString();
    }
}