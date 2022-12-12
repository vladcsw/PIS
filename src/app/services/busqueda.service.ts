import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}
