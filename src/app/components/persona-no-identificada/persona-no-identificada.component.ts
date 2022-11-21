import { Component, HostBinding, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/PersonaNoIdentificada';

import { PersonaNoIdentificadaService } from 'src/app/services/persona-no-identificada.service';

@Component({
  selector: 'app-persona-no-identificada',
  templateUrl: './persona-no-identificada.component.html',
  styleUrls: ['./persona-no-identificada.component.scss']
})
export class PersonaNoIdentificadaComponent implements OnInit {
  estadocivil = ["Soltero", "Casado"
   
];
genero = [
  { name: 'Masculino', code: 'Masculino' },
  { name: 'Femenino', code: 'Femenino' }
];

documentos = [
  { name: 'DNI', code: 'DNI' },
  { name: 'CUI', code: 'CUI' }
];
nacionalidades  = [
  { name: 'Peru', code: 'Peru' },
  { name: 'Ecuador', code: 'Ecuador' },
  { name: 'Venezuela', code: 'Venezuela' }
];

  @HostBinding("class") classes ="row";

  personaNoIdentificada: Persona = {
    nombre: "",
    apellido: "",
    edad: 0,
    estadoCivil: "",
    
  }

  constructor(private persona: PersonaNoIdentificadaService) { }

  ngOnInit(): void {
  }
  
  save(){
    
    console.log(this.personaNoIdentificada);
    this.persona.savePersonaNoIdentificada(this.personaNoIdentificada)
    .subscribe(
      res => {console.log(res);},
      err => {console.log("backend no responde");}
        )
    
  }

}
