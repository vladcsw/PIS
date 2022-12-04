import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documento-informacion',
  templateUrl: './documento-informacion.component.html',
  styleUrls: ['./documento-informacion.component.scss']
})
export class DocumentoInformacionComponent implements OnInit {

  items: MenuItem[];    
  

  constructor(public router: Router) {}

  ngOnInit(): void {
    
    this.items = [
      {label: 'PERSONAS', icon: 'pi pi-fw pi-users'},
      {label: 'INMUEBLES', icon: 'pi pi-fw pi-home', routerLink: ['/analista/docRecib/analisis/inmuebles']},
      {label: 'EMPRESAS', icon: 'pi pi-fw pi-globe', routerLink: ['/analista/docRecib/analisis/empresas']},
      {label: 'INSUMOS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/insumos']},
      {label: 'ARMAS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/armas']},
      {label: 'CUENTAS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/cuentas']},
      {label: 'MODALIDAD', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/modalidad']},
      {label: 'AGENDA', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/agenda']},
      {label: 'PERS. JURIDICA', icon: 'pi pi-fw pi-phone', routerLink: ['/analista/docRecib/analisis/juridica']}
  ];
  }

}
