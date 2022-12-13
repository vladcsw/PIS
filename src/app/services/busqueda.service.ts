import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { options } from 'preact';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
    API_URI = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

    getData(tabla: string){
    return this.http.get(`${this.API_URI}/${tabla}/lista`);
    }

    getDocumento(id: string){
        return this.http.get(`${this.API_URI}/documento/get/${id}`);
    }

    getDataPost(tabla: string){

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/json')
        headers.append("id2", "1");

        let se = new HttpParams();
        se = se.append('id2',1);
        se = se.append('id2',2);

        let provincia : any = {'descripcion':'asdsa', 'departamento_id':1}

        return this.http.post<any>(`${this.API_URI}/${tabla}/prueba`, provincia, {params:se});
        }

}
