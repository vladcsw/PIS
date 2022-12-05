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
    return this.http.get(`${this.API_URI}documento/normal`)
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

   archivarDoc(id:any){
    return this.http.get(`${this.API_URI}documento/mandar_papelera/${id}`)
   }

   getArmasDoc(id:number){
    return this.http.get(`${this.API_URI}tratamiento/arma/${id}`)
   }
   saveArmaDoc(arma:any){
    return this.http.post(`${this.API_URI}documento_arma/save`,arma);
   }
   saveCuentaBanDOc(cuenta:any){
    return this.http.post(`${this.API_URI}documento_cuenta_bancaria/save`,cuenta);
   }
   getCuentaBanDoc(id:number){
    return this.http.get(`${this.API_URI}tratamiento/cuenta_bancaria/${id}`)
   }

   getInmuebleDoc(id:number){
    return this.http.get(`${this.API_URI}tratamiento/inmueble/${id}`)
   }
   saveInmuebleDOc(inmueble:any){
    return this.http.post(`${this.API_URI}documento_inmueble/save`,inmueble);
   }

   getInsumosDoc(id:number){
    return this.http.get(`${this.API_URI}tratamiento/insumo/${id}`)
   }
   saveInsumoDoc(insumo:any){
    return this.http.post(`${this.API_URI}documento_insumo/save`,insumo);
   }
   getModalidadDoc(id:number){
    return this.http.get(`${this.API_URI}tratamiento/modalidad/${id}`)
   }

   saveModalidadDoc(modalidad:any){
    return this.http.post(`${this.API_URI}documento_modalidad/save`,modalidad);
   }
}