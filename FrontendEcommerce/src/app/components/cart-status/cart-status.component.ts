import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent {


  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  constructor(private cartService : CartService){}
  ngOnInit(): void{
    console.log(`@@ total ${this.totalPrice}`);
    this.updateCartStatus();
  }
  updateCartStatus() {
    // subscribe to the cart total pricice
    console.log(`@@ total ${this.totalPrice}`);
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice =data
      
    );
    console.log(`@@ total ${this.totalPrice}`);
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  
}
