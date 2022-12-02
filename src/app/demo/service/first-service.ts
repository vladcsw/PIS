import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { documento } from '../domain/documento';


@Injectable({
  providedIn: 'root'
})
export class FirstService {

  API_URI = 'http://localhost:8080/'

  constructor(private http: HttpClient) {

   }

   getClasificacion(){
    return this.http.get(`${this.API_URI}documento_clasificacion/list`)
   }

   getDocumento(){
    return this.http.get(`${this.API_URI}documento/list`)
   }

   saveDocumento(documento:documento){
    return this.http.post(`${this.API_URI}documento/save`,documento)
   }
   getDocumentoPrioridad(){
    return this.http.get(`${this.API_URI}prioridad/list`)
   }
   deleteDocumento(id:number){
    return this.http.delete(`${this.API_URI}documento/delete/${id}`)
   }
   getUnDocumento(id:number){
    return this.http.get(`${this.API_URI}documento/get/${id}`)
   }
    
   getCarpeta(){
    return this.http.get(`${this.API_URI}carpeta/list`)
   }

}
