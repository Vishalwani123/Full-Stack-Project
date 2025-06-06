import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { StorageService } from '../../../services/storage/storage.service';

const BASE_URL = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  postCar(formData: any): Observable<any>{
    console.log("Api is working fine for angular");
    return this.http.post(BASE_URL + "api/customer/car", formData, {
      headers : this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    console.log("Api Token is working fine for angular");
    let authHeaders: HttpHeaders = new HttpHeaders();
    console.log("abc " + StorageService.getToken());
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }  
}

