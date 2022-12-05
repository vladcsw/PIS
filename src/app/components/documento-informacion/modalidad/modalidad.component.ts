import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Router, ActivatedRoute } from '@angular/router';
import { Modalidad } from 'src/app/demo/domain/modalidad';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styleUrls: ['./modalidad.component.scss']
})
export class ModalidadComponent implements OnInit {
  items: MenuItem[];
  
  modalidadDialog: boolean;
  tipoModalidad:any = [];
  modalidad:Modalidad;
  modalidades:any=[]
  modalidadesForm:any=[]

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
  if(this.modalidadesForm.length==0){
    this.modalidadesForm=[
      {descripcion: 'Delíto contra el cuerpo y la salud', id:1},
      {descripcion: 'Delito de drogas', id:2},
      {descripcion: 'Robo', id:3},
      {descripcion: 'Secuestro', id:4},
      {descripcion: 'Extorción', id:5},
    ]
  }
  if(this.tipoModalidad.length==0){
    this.tipoModalidad=[
      {descripcion: 'Con violencía', id:1},
      {descripcion: 'Sin violencia', id:2},
      {descripcion: 'Furtiva', id:3},
      
    ]
  }


  this.getModalidades()
  }


  getModalidades(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getModalidadDoc(params['id']).subscribe(
      res=>{
        this.modalidades = res
      },err=>console.log(err)
    )
  }

  newModalidad(){
    this.modalidad = {}
    this.modalidadDialog = true;
  }

  hideDialog() {
    this.modalidadDialog = false;  
  }


  delete(){

  }

  save(){
    const params = this.activatedRoute.snapshot.params;
    this.modalidad.documento_id=params['id']
    this.firstService.saveModalidadDoc(this.modalidad).subscribe(
      res=>{
        console.log(res);
        this.getModalidades()
      },err =>console.log(getMultipleValuesInSingleSelectionError)
    )
    this.modalidadDialog=false
  }

  replaceValuesTipo(idT:number){
    for (let valor of this.tipoModalidad){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }

  replaceValuesModalidad(idT:number){
    for (let valor of this.modalidadesForm){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }

}
