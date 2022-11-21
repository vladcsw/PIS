import { DocEnviado } from '../models/DocEnviado';
import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class DocEnviadoService {
    API_URI = 'http://localhost:8080';

    constructor(private http:HttpClient){}

    getDocEnviados(){
        return this.http.get(`${this.API_URI}/documento/lista`);
    }
    getDocEnviado(id: string) {
        return this.http.get(`${this.API_URI}/documentos/${id}`);
    }
    deleteDocEnviado(id: string) {
        return this.http.delete(`${this.API_URI}/documentos/${id}`);
    }
    saveDocEnviado(doc:  DocEnviado) {
        return this.http.post(`${this.API_URI}/documento/save`, doc);
    }
}