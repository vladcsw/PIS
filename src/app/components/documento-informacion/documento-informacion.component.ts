import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-documento-informacion',
  templateUrl: './documento-informacion.component.html',
  styleUrls: ['./documento-informacion.component.scss']
})
export class DocumentoInformacionComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {label: 'PERSONAS', icon: 'pi pi-fw pi-users'},
      {label: 'INMUEBLES', icon: 'pi pi-fw pi-home'},
      {label: 'EMPRESAS', icon: 'pi pi-fw pi-globe'},
      {label: 'VEHÍCULOS', icon: 'pi pi-fw pi-car'},
      {label: 'TELÉFONOS', icon: 'pi pi-fw pi-phone'}
  ];
  }

}
