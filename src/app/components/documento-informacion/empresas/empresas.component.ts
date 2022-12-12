import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import{ FirstService } from '../../../demo/service/first-service'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['../../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EmpresasComponent implements OnInit {
  items: MenuItem[];
  constructor(private firstService:FirstService, private activatedRoute:ActivatedRoute, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.items = [
      {label: 'PERSONAS', icon: 'pi pi-fw pi-users', routerLink: ['/analista/docRecib/analisis', params['id'] ]},
      {label: 'INMUEBLES', icon: 'pi pi-fw pi-home', routerLink: ['/analista/docRecib/analisis/inmuebles', params['id']]},
      {label: 'EMPRESAS', icon: 'pi pi-fw pi-globe', routerLink: ['/analista/docRecib/analisis/empresas', params['id']]},
      {label: 'INSUMOS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/insumos', params['id']]},
      {label: 'ARMAS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/armas', params['id']]},
      {label: 'CUENTAS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/cuentas', params['id']]},
      {label: 'MODALIDAD', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/modalidad', params['id']]},
      {label: 'AGENDA', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/agenda', params['id']]},
      {label: 'TELEFONO', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/telefono', params['id']]},
      
  ];
  }

}
