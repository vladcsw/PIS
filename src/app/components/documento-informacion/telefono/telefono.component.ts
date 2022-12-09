import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Router, ActivatedRoute } from '@angular/router';
import { Telefono } from 'src/app/demo/domain/telefono';
@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.scss']
})
export class TelefonoComponent implements OnInit {


  
  telefonoDialog: boolean;
  items: MenuItem[];
  proveedores:any =[]
  telefonos:any =[]
  telefono:Telefono = {};

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
      {label: 'TELEFONO', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/telefono/:id', params['id']]},  
  ];
  if(this.proveedores.length==0){
    this.proveedores=[
      {descripcion: 'Claro', id:1},
      {descripcion: 'Movistar', id:2},
      {descripcion: 'Enter', id:3},
      {descripcion: 'Bitel', id:4},
    ]
  }
  }

  getTelefonos(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getTelefonosDoc(params['id']).subscribe(
      res=>{
        this.telefonos = res
      },err=>console.log(err)
    )
  }

  newTelefono(){
    this.telefono = {}
    this.telefonoDialog = true
  }

  hideDialog() {
    this.telefonoDialog= false;  
  }

  save(){
    const params = this.activatedRoute.snapshot.params;
    this.telefono.documento_id=params['id']
    this.firstService.saveTelefonoDoc(this.telefono).subscribe(
      res=>{
        this.getTelefonos()
      },err=>console.log(err)
    )
    this.telefonoDialog= false;  
  }

}
