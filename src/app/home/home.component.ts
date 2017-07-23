import { Component } from '@angular/core';


@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  searchquery:string = "";
  bars:any = [];

  constructor() {

  }

  searchBars() {
    console.log("searching bars");

    let that = this;

    fetch("/api/yelp?location=" + this.searchquery).then(function (data) {
      data.json().then(function (json_data) {
        console.log(json_data);
        that.bars = json_data.businesses;
      })
    })
  }



}
