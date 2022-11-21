import { Component, HostBinding, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/PersonaNoIdentificada';
import { PersonaNoIdentificadaService } from 'src/app/services/persona-no-identificada.service';

@Component({
  selector: 'app-persona-no-identificada',
  templateUrl: './persona-no-identificada.component.html',
  styleUrls: ['./persona-no-identificada.component.scss']
})
export class PersonaNoIdentificadaComponent implements OnInit {
  estadocivil = [
    { name: 'Soltero', code: 'Soltero' },
    { name: 'Casado', code: 'Casado' }
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
    nombre: "Karen",
    apellido: "Aurelio",
    edad: 10,
    estadoCivil: "soltero",
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
