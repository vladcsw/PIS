import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import{ FirstService } from '../../demo/service/first-service'
import { documento }  from '../../demo/domain/documento'
import { documentoClasificacion }  from '../../demo/domain/documentoClasificación'
import { documentoPrioridad }  from '../../demo/domain/documentoPrioridad'
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { compileClassMetadata } from '@angular/compiler';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-doc-inteligencia',
  templateUrl: './doc-inteligencia.component.html',
  styleUrls: ['../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DocInteligenciaComponent implements OnInit {
  documentoClasificacion: documentoClasificacion  [];
  documentoPrioridad: documentoPrioridad  [];
  documento:documento;
  t: any = [];

  constructor(private breadcrumbService: BreadcrumbService, private firstService:FirstService, private router:Router, private activatedRoute:ActivatedRoute,private messageService: MessageService,
    private confirmationService: ConfirmationService, private busquedaService: BusquedaService) {



        if (this.router.getCurrentNavigation().extras.state){
            console.log(this.router.getCurrentNavigation().extras.state.example);
            setTimeout(() => {
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Solicitud Enviada', life: 3000});
        });
        }
     }

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
    this.getDocumento(params['id'])
    this.getClasificacionDocumento()
    this.getPrioridadDocumento()

    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Documentos recibidos'},
      {label: 'Detalle'}
      
  ]);

  if(this.documentoClasificacion.length ==0){
    this.documentoClasificacion=[
      {descripcion: 'baja', id:1},
      {descripcion: 'media', id:2},
      {descripcion: 'alta', id:3},
    ]
  }
  if (this.documentoPrioridad.length==0){
    this.documentoPrioridad = [
      {descripcion: 'baja', id:1},
      {descripcion: 'media', id:2},
      {descripcion: 'alta', id:3},
    ]
  }

  }


  getClasificacionDocumento(){
    this.firstService.getClasificacion().subscribe(
      res => {
        this.documentoClasificacion = res['data']['DOCUMENTO_CLASIFICACION']

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }
  getPrioridadDocumento(){
    this.firstService.getDocumentoPrioridad().subscribe(
      res => {
        this.documentoPrioridad = res['data']['PRIORIDAD']

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }

  getDocumento(id:number){
    this.firstService.getUnDocumento(id).subscribe(
      res=>{
        this.documento = res['data']['documento']
      },
      err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }

  replaceValuesClasificacion(idT:number){
    for (let valor of this.documentoClasificacion){
      if(valor.id==idT){
        return valor.descripcion
      }
    }
    return "No clasificado"
  }
  replaceValuesPrioridad(idT:number){
    for (let valor of this.documentoPrioridad){
      if(valor.id==idT){
        return valor.descripcion
      }
    }
    return "No clasificado"
  }

  sendToStore(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.archivarDoc(params['id']).subscribe(
      res=>{
        console.log(res)

        this.router.navigate(["/analista/docRecibidos"],{queryParams:{fromStore: 'si'}})
      },err=> {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        {
          this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
          console.log(err)
        } 
      } 
    )
  }
}
