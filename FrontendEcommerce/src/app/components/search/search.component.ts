import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

    constructor(private routher: Router){}

    ngOnInit(){

    }

    doSearch(value : String){
      console.log(`value = ${value}`);
      this.routher.navigateByUrl(`/search/${value}`);
    }
}
