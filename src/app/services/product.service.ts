import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/Product/'

  constructor(private http: HttpClient) { }

  getAll(): Promise<any>{
    return this.http.get(this.apiURL)
      .toPromise();
  }
}
