import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'https://utn-avanzada2-tp-final.herokuapp.com/api/Product/'

  constructor(private http: HttpClient) { }

  getAll(): Promise<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtbW9xdWluMUBlbmdhZGdldC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTWFyY2VsaWEgTW9xdWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJqdGkiOiI5ZDBhZDFjZS04MjM0LTRiYTctOWMyYi04NDc1OGNiMDkzNDkiLCJleHAiOjE2MDUyMTY3OTQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMS8ifQ.SENf4bAJ_EKnJoVg-69l2RZ4fKzI0y8GNn0PIlfRmQc'
      })
    }

    return this.http.get(this.apiURL, httpOptions)
      .toPromise();
  }
}
