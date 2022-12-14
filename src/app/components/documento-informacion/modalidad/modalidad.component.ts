import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Router, ActivatedRoute } from '@angular/router';
import { Modalidad } from 'src/app/demo/domain/modalidad';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styleUrls: ['../../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ModalidadComponent implements OnInit {
  items: MenuItem[];
  
  modalidadDialog: boolean;
  tipoModalidad:any = [];
  modalidad:Modalidad;
  modalidades:any=[]
  modalidadesForm:any=[]

  editModalidadOption: boolean = false;
  deleteModalidadDialog: boolean = false;
  deleteModalidadId: number;

  constructor(private firstService:FirstService, private activatedRoute:ActivatedRoute, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.items = [
      {label: 'PERSONAS', icon: 'pi pi-fw pi-users', routerLink: ['/analista/docRecib/analisis', params['id']]},
      {label: 'INMUEBLES', icon: 'pi pi-fw pi-home', routerLink: ['/analista/docRecib/analisis/inmuebles', params['id']]},
      //{label: 'EMPRESAS', icon: 'pi pi-fw pi-globe', routerLink: ['/analista/docRecib/analisis/empresas', params['id']]},
      {label: 'INSUMOS', icon: 'pi pi-fw pi-box', routerLink: ['/analista/docRecib/analisis/insumos', params['id']]},
      {label: 'ARMAS', icon: 'pi pi-fw pi-shield', routerLink: ['/analista/docRecib/analisis/armas', params['id']]},
      {label: 'CUENTAS', icon: 'pi pi-fw pi-wallet', routerLink: ['/analista/docRecib/analisis/cuentas', params['id']]},
      {label: 'MODALIDAD', icon: 'pi pi-fw pi-sitemap', routerLink: ['/analista/docRecib/analisis/modalidad', params['id']]},
      {label: 'TELEFONO', icon: 'pi pi-fw pi-phone', routerLink: ['/analista/docRecib/analisis/telefono', params['id']]},  
      
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
    this.editModalidadOption = false;
  }
  editModalidad(modalidad : Modalidad){
    this.editModalidadOption = true;
    this.modalidadDialog = true;
    this.modalidad = {...modalidad};
  }

  hideDialog() {
    this.modalidadDialog = false;  
  }

  deleteModalidad(id: number){
    this.deleteModalidadDialog = true;
    this.deleteModalidadId = id;
  }

  confirmDeleteModalidad(){
    this.deleteModalidadDialog = false;
    this.firstService.deleteModalidadDoc(this.deleteModalidadId).subscribe(
      res => {
        console.log(res);
        this.getModalidades();
      },
      err => console.log(err)
    )
    this.deleteModalidadId = null;

  }

  save(){
    const params = this.activatedRoute.snapshot.params;
    this.modalidad.documento_id=params['id']
    console.log(this.modalidad);
    this.firstService.saveModalidadDoc(this.modalidad).subscribe(
      res=>{
        console.log(res);
        this.getModalidades()
        if(this.modalidad.id){
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de Modalidad Actualizado', life: 3000});
        }else{
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de Modalidad Agregada', life: 3000});
        }
      },err =>console.log(getMultipleValuesInSingleSelectionError)
    )
    this.modalidadDialog=false
    this.editModalidadOption = false;
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
