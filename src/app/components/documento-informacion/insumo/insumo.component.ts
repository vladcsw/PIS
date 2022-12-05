import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Insumo } from 'src/app/demo/domain/insumo';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.scss']
})
export class InsumoComponent implements OnInit {
  items: MenuItem[];
  insumo:Insumo;
  insumos:any = [];
  insumoDialog: boolean;
  calificacion:any=[]
  situacion:any=[]
  intervencion:any=[]


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

  if(this.calificacion.length ===0){
    this.calificacion=[
      {descripcion: 'Fiscalizado', id:'1'},
      {descripcion: 'No fiscalizado', id:'2'},
    ]
  }
  if(this.situacion.length ===0){
    this.situacion=[
      {descripcion: 'Decomiso', id:'1'},
      {descripcion: 'Incautado', id:'2'},
      {descripcion: 'Proceso administrativo', id:'3'},
    ]
  }
  if(this.intervencion.length ===0){
    this.intervencion=[
      {descripcion: 'SUNAT', id:'1'},
      {descripcion: 'Policía', id:'2'},
    ]
  }
  this.getInsumos()
  }

  getInsumos(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getInsumosDoc(params['id']).subscribe(

      res=>{
        this.insumos = res
      },err => console.log(err)
    )
  }

  newInsumo(){
    this.insumo= {};
    this.insumoDialog = true;
  }

  hideDialog() {
    this.insumoDialog = false;
  }


  delete(){

  }
  save(){
    const params = this.activatedRoute.snapshot.params;
    this.insumo.documento_id = params['id']
    this.firstService.saveInsumoDoc(this.insumo).subscribe(
      res=>{
        console.log(res)
        this.getInsumos()
      },err=>console.log(err)
    )
    this.insumoDialog=false
  }

  replaceValuesCalificacion(idT:number){
    for (let valor of this.calificacion){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }

  replaceValuesSituacion(idT:number){
    for (let valor of this.situacion){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }

  replaceValuesIntervenido(idT:number){
    for (let valor of this.intervencion){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }

}
