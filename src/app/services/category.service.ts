import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/ProductCategory/';

  constructor(private http: HttpClient) { }

  getAll(): Promise<any>{
    return this.http.get(this.apiURL)
      .toPromise();
  }
}
