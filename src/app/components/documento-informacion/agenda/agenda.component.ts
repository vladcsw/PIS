import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  agenda:any;
  items: MenuItem[];
  tipotelefonos: any = [];
  telefonos:any =[];
  agendaDialog: boolean;
  constructor(private firstService:FirstService, private activatedRoute:ActivatedRoute) { }

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

  this.getTelefonos();

  }

  getTelefonos(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getTelefonosDoc(params['id']).subscribe(
      res=>{
        this.telefonos = res
      },err=>console.log(err)
    )
  }
  
  replaceValuesTipo(idT:number){
    for (let valor of this.tipotelefonos){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }

  getAgendas(){

  }

  newAgenda(){
    this.agenda = {};
    this.agendaDialog = true;
  }

  delete(){

  }
  hideDialog() {
    this.agendaDialog = false;  
  }


}
