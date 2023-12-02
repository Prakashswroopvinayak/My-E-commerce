import { Product } from "./product";

export class CartItem {

    id: Number;
    name: String;
    imageUrl: String;
    unitPrice: number;

    quantity:number;

    constructor(product: Product){

        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageURL;
        this.unitPrice = product.unitPrice;

        
        this.quantity = 1;

    }
}
