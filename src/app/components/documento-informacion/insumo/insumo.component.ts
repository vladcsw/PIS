import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Insumo } from 'src/app/demo/domain/insumo';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['../../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InsumoComponent implements OnInit {
  items: MenuItem[];
  insumo:Insumo;
  insumos:any = [];
  insumoDialog: boolean;
  calificacion:any=[]
  situacion:any=[]
  intervencion:any=[]

  editInsumoOption: boolean = false;
  deleteInsumoDialog: boolean = false;
  deleteSelectedInsumoId: number;


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

  if(this.calificacion.length ===0){
    this.calificacion=[
      {descripcion: 'Fiscalizado', id:1},
      {descripcion: 'No fiscalizado', id:2},
    ]
  }
  if(this.situacion.length ===0){
    this.situacion=[
      {descripcion: 'Decomiso', id:1},
      {descripcion: 'Incautado', id:2},
      {descripcion: 'Proceso administrativo', id:3},
    ]
  }
  if(this.intervencion.length ===0){
    this.intervencion=[
      {descripcion: 'SUNAT', id:1},
      {descripcion: 'Policía', id:2},
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
    this.editInsumoOption = false;
  }

  hideDialog() {
    this.insumoDialog = false;
  }
  editInsumo(insumo: Insumo) {
    this.insumoDialog = true;
    this.insumo= {...insumo};
    this.editInsumoOption = true;
  }

  deleteInsumo(id: number){
    this.deleteSelectedInsumoId = id;
    this.deleteInsumoDialog = true;
  }
  confirDeleteInsumo(){
    this.deleteInsumoDialog = false;
    this.firstService.deleteInsumoDoc(this.deleteSelectedInsumoId).subscribe(
      res =>{console.log(res)
        this.getInsumos()
      }, err =>console.log(err)
    )
    this.deleteSelectedInsumoId = null;
  }

  save(){
    const params = this.activatedRoute.snapshot.params;
    this.insumo.documento_id = params['id']
    this.firstService.saveInsumoDoc(this.insumo).subscribe(
      res=>{
        console.log(res)
        this.getInsumos()
        if(this.insumo.id){
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de Inusmo Actualizado', life: 3000});
        }else{
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de insumo creado', life: 3000});
        }
      },err=>console.log(err)
    )
    this.editInsumoOption = false;
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
