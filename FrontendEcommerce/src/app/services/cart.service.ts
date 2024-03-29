import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    // check if we already have the Item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length>0){
      // find the item in the cart based on item id
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem;
          break;
        }
      }
    }
    

    // check if we found it
    alreadyExistsInCart = (existingCartItem!=undefined);

    if(alreadyExistsInCart){
      // increment the quantity 

      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }

    // compute cart total price amd total quantity

    this.computeCartTotals();
  }
  removeFromCart(theCartItem: CartItem){
    theCartItem.quantity--;

    if(theCartItem.quantity==0){
      this.remove(theCartItem);
    }
    this.computeCartTotals();
    

  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id==theCartItem.id)
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
    }
   
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new value .... all subscribers will recive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    

    // log cart data
    
    this.logCartData(totalPriceValue,totalQuantityValue);
    
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log(`****************content of the cart***************/n`);
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity* tempCartItem.unitPrice;
      console.log(`name:${tempCartItem.name}, quantity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice}, subTotalPrice = ${subTotalPrice}`);
    }
    
    console.log(`TotalPrice ${totalPriceValue}, totalQuantity = ${totalQuantityValue}`);
  }
}
