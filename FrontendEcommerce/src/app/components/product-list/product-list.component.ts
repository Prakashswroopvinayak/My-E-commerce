import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products :Product[]=[];
  currentCategoryId : number=1;
  SearchMode: boolean=false;
  constructor(private productService : ProductService, private route: ActivatedRoute){

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
    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        console.log('@@ data ',data);
        this.products = data;
      }
    )
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
   
       // now get the products for the given category Id
       this.productService.getProductList(this.currentCategoryId).subscribe(
         data => {
           this.products = data;
   
         }
       )
  }

}
