import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/Product/';
  private loginURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/User/Login';

  prodFiltered: Array<Product> = [];
  prod: Product = new Product();

  constructor(private http: HttpClient) { }

  getByName(name: string): Promise<any> {
    return this.getAll()
      .then( response => {
        return response.find( product => product.name === name );
      })
      .catch( error => {
        alert("Get by name error:");
      })
  }

  /**
   * Get Product by id
   */
  async getById(id: number) {
    return this.getAll()
      .then( response => {
        return response.find( product => product.productId === id );
      })
      .catch( error => {
        alert("Get by id error: " + error.status);
      })
  }

  /**
   * Get all products
   */
  getAll(): Promise<any>{

    return this.http.get(this.apiURL)
      .toPromise();
  }

  /**
   * Get Product by category
   * @param id 
   */
  getByCategory(id: number){
    this.getAll()
      .then( response => {
        this.prodFiltered = response.filter( product => {
          return product.productCategoryId === id;
        });
      })
      .catch( error => {
        alert("Product service error: " + error.status);
      });

      return this.prodFiltered;
  }

  /**
   * Add a product
   * @param product 
   */
  async add(product: Product): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization' : await this.GetToken()
      })
    }

    return this.http.post(this.apiURL, product, httpOptions)
      .toPromise();
  }

  /**
   * Update a product
   * @param product 
   */
  async update(product: Product): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization' : await this.GetToken()
      })
    }

    return this.http.put(this.apiURL, product, httpOptions)
      .toPromise();
  }

  async delete(id: Number): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization' : await this.GetToken()
      })
    }

    return this.http.delete(this.apiURL + id, httpOptions)
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
