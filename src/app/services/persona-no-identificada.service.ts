import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Persona } from '../models/PersonaNoIdentificada';
@Injectable({
  providedIn: 'root'
})
export class PersonaNoIdentificadaService {
  API_URL ="http://localhost:8080/persona";

  constructor(private http: HttpClient) { }

  getPersonasNoIdentificadas() {
    return this.http.get(`${this.API_URL}/lista`);
  }
  savePersonaNoIdentificada(persona: Persona){
    return this.http.post(`${this.API_URL}/save`, persona);
  }
}
