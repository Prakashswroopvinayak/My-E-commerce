import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number=1;
  SearchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  
  previousKeyword: string = "";
  constructor(private productService : ProductService,
              private cartService : CartService,
              private route: ActivatedRoute){

  }
  ngOnInit(){
    
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
  }
  listProducts() {

    this.SearchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.SearchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
 
  }
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    console.log('@@ theKeyword ',theKeyword);

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
    // now search for the products using keyword
    this.productService.searchProductListPaginate(this.thePageNumber-1,
                                                  this.thePageSize,
                                                  theKeyword).subscribe(this.processResult());
  }

  handleListProducts(){
       // check if id parameter is available 
       const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
       if(hasCategoryId){
         // get the "id" param string, convert string to number using "+" symbol
         this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
       }else{
         // not category id available ... default to category Id 1
         this.currentCategoryId = 1;
       }
   
      //  check if we have diffrent category than previous
      // Note : Angular will reuse  a componentif it is currently being viewed

      // if we have different category id than previous
      // then set thePageNumber back to 1
      if(this.previousCategoryId!=this.currentCategoryId){
        this.thePageNumber =1;
      }
      this.previousCategoryId = this.currentCategoryId;
      console.log(`currentCategoryId = ${this.currentCategoryId}, thePageNumber = ${this.thePageNumber}`);


       // now get the products for the given category Id
       this.productService.getProductListPaginate(this.thePageNumber-1,
                                                  this.thePageSize,
                                                  this.currentCategoryId)
                                                  .subscribe(this.processResult());
  }

  updatePageSize(pageSize : string){
    this.thePageSize = +pageSize;
    this.thePageNumber =1;
    this.listProducts();
  }

  processResult(){
    return (data :any) =>{
        // left side is properties defined in this class 
         // right side is data comming from spring data Rest JSON
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements
    }
  }

  addToCart(theProduct : Product){

    console.log(`Add to cart  product name = ${theProduct.name} product price = ${theProduct.unitPrice}`);

    const theCartItem = new  CartItem(theProduct);
    this.cartService.addToCart(theCartItem);

  }

}
