import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
