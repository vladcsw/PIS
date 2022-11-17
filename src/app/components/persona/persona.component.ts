import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
  tieredItems: MenuItem[];
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
departamentos  = [
  { name: 'Amazonas', code: 'Amazonas' },
  { name: 'Arequipa', code: 'Arequipa' }
];
provincias  = [
  { name: 'Amazonas', code: 'Amazonas' },
  { name: 'Arequipa', code: 'Arequipa' }
];
distritos  = [
  { name: 'Amazonas', code: 'Amazonas' },
  { name: 'Arequipa', code: 'Arequipa' }
];

  constructor() { }

  ngOnInit(): void {
    this.tieredItems = [
      {label:'CARPETA POLICIAL '},
      {label:'CARPETA FISCAL'},
      {label:'PERSONAS INTERVINIENTES'},
      {label:'PERSONAS IMPLICADAS'},
      {label:'DROGAS'},
      {label:'INSUMO'},
      {label:'DOCUMENTOS DIGITALIZADOS'},
      {label:'GENERACIÓN DE DOCUMENTOS'},
      {label:'PAC'},
      {label:'ARMAS'},
      {label:'INMUEBLES'},
      {label:'CUENTA BANCARIA'},
      {label:'DINERO'},
      {label:'TELÉFONO'},
      {label:'VEHICULO'},
      {label:'LABORATORIO'},
      {label:'ERRADICACIÓN'},
      {label:'ENCOMIENDAS'},
      {label:'MODALIDAD EMPLEADA'},
      {label:'RESULTADO DE DOCUMENTOS'},
      {label:'MULTIMEDIA'},
      {label:'DOCUMENTOS PERICIALES'},
      {label:'ORGORM'},
      {label:'CALIDAD'},
      {label:'AGENDA TELEFÓNICA'},
      {label:'PERSONA JURIDICA'},
      {label:'NOTIFICACIÓN PROCURADURÍA '},
    ]
  }

}
