import { Component, OnInit, Input } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { StockApiService } from '../stock-api.service';
import { HomeComponent } from '../home/home.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


declare var carousel;
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor( private _user: UserService,
              private _stock: StockApiService, 
              private _home: HomeComponent,
              private router: Router) { }

  ngOnInit() {
    this.getFav();
  };

  favoriteList: any[] = [];
  favoriteData: any = {};
  stockArray: any[] = [];
  stockData: any = {};
  
// step 2) for each index send the ticker symbol to obtain an obj with the price and stock symbol (metadata), place those 2 in an obj and then push them in an array.
// (side note: the ticker symbol is send in the order they appear in the 'stockArray', but are not received in order(FavoriteList), therefore, it is not easy to link price, symbol and id in the same obj in order)

  getIntraPrice(symbolArray: any) {
    let favArray: any[] = []
    symbolArray.map( (index, i) => {
      this._stock.serviceIntraDay(index.symbol)
        .subscribe( response => {         
          let priceKey = Object.keys(response["Time Series (15min)"])[0];
          index.price = response["Time Series (15min)"][priceKey]["4. close"]; 
          favArray.push(index)
          this.favoriteList = favArray
        })
    })
  }
// 1st step) Get all favorite stock symbols from backend and place corresponding instance ID and symbol in an obj and push it in array; invoke getIntraPrice to get the price from the API   
  getFav() {
    this._user.getFavoritesData(window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'))
    .subscribe((response: any) => {
      if(response.length !== 0) {
        this.getIntraPrice(response)
      }
      else{
        this.favoriteList = []
        return
      }
      
    })  
  }
//adds a stock to fav by posting list obj, unique id and token of user 
  addFavorite() {
    let list = {
      symbol: ''
    };
    list.symbol = this._stock.stockSymbol;
    console.log(list.symbol)
    this._user.saveFavorite(list, window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'))
      .subscribe((response: any) => {
        this.getFav();
      })
  };
  
  deleteStock: boolean = false;
  deleteMessage: string = 'Delete';
  makeDeleteVisible() {   
    if(!this.deleteStock) { 
      this.deleteStock = true;
      this.deleteMessage = "Cancel"
    }
    else if(this.deleteStock) {
      this.deleteStock = false;
      this.deleteMessage = 'Delete'
    }
  }
  // delete favorite stock symbol by sending token, and userId to banckend
  deleteFavorite(id) {
    console.log('presed', id)
    this._user.deleteFavUser(window.sessionStorage.getItem('token'), id , window.sessionStorage.getItem('userId'))
      .subscribe( (response: any) => {
       
        
        this.getFav();
      })
  }

  onDeleteStock(symbol) {
    console.log("clicked", symbol)
  }

  searchStock() {
    console.log('search')
  }
}
