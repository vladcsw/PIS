import { DocEnviado } from '../models/DocEnviado';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest,HttpEvent, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
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
    upload(file: File, archivo: string): Observable<HttpEvent<any>>{
        const formData: FormData = new FormData();
        formData.append('files', file);
        console.log('archivo-'+archivo)
        formData.append('archivo', archivo);

        //formData.append('archivo', JSON.stringify(archivo));

        //return this.http.post<any>(`${this.API_URI}/upload`, formData, {   });
        const req = new HttpRequest('POST', `${this.API_URI}/upload`, formData, {
          reportProgress: true,
          responseType: 'json',
          //headers:new HttpHeaders({'Content-Type': undefined})

        });
        return this.http.request(req);
      }
      getFiles(){
        return this.http.get(`${this.API_URI}/files`);
      }

}
