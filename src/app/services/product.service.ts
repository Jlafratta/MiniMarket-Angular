import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/Product';
  private loginURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/User/Login';

  constructor(private http: HttpClient) { }

  async getAll(): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : await this.GetToken()
      })
    }

    return this.http.get(this.apiURL, httpOptions)
      .toPromise();
  }

  async add(product: Product): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization' : await this.GetToken()
      })
    }

    this.http.post(this.apiURL, product, httpOptions)
      .toPromise();
  }


  // AUTH METHODS

  private async GetToken(){
    class Token{
      token: string;
    };
    let token = new Token();

    await this.Login()
    .then( response => {
      token = response;
    }).catch( error => {
      alert("Login service error: " + error);
    });

    return 'bearer ' + token.token;
  }

  private Login(): Promise<any>{

    let loginJson='{"email": "mmoquin1@engadget.com","password": "O2PTLXKPPqL"}';

    const httpOptions = {
      headers:new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    
    return this.http.post(this.loginURL,loginJson,httpOptions).toPromise();
  }
}
