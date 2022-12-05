import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import{ FirstService } from '../../../demo/service/first-service'
import { Inmueble } from 'src/app/demo/domain/inmueble';
@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.scss']
})
export class InmueblesComponent implements OnInit {

  items: MenuItem[];
  inmueble:Inmueble;
  inmuebles:any=[]
  inmuebleDialog: boolean;
  tipoInmueble:any = []
  zonaInmueble:any = []
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
      
  ];
  if(this.tipoInmueble.length == 0){
    this.tipoInmueble=[
      {descripcion: 'Terreno', id:'1'},
      {descripcion: 'Casa', id:'2'},
    ]
  }

  if(this.zonaInmueble.length == 0){
    this.zonaInmueble=[
      {descripcion: 'Rural', id:'1'},
      {descripcion: 'Urbano', id:'2'},
    ]

    this.getInmuebles()
  }

  }

  getInmuebles(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getInmuebleDoc(params['id']).subscribe(
      res=>{
        this.inmuebles = res
      },err=>console.log(err)
    )
  }

  newInmueble(){
    this.inmueble= {};
    this.inmuebleDialog = true;
  }

  hideDialog() {
    this.inmuebleDialog = false;  
  }


  delete(){

  }
  save(){
    const params = this.activatedRoute.snapshot.params;
    this.inmueble.documento_id=params['id']
    this.firstService.saveInmuebleDOc(this.inmueble).subscribe(
      res=>{
        console.log(res);
        this.getInmuebles()
      },
      err=>console.log(err)
    )
    this.inmuebleDialog=false
  }


  replaceValuesTipo(idT:number){
    for (let valor of this.tipoInmueble){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }

  replaceValuesZona(idT:number){
    for (let valor of this.zonaInmueble){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }


}