import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class FirstServideService {

  API_URI = 'http://localhost:8080/'

  constructor(private http: HttpClient) {

   }

   getClasificacion(){
    return this.http.get(`${this.API_URI}documento_clasificacion/list`)
   }
}
