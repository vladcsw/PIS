import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { documento }  from '../../demo/domain/documento'
import { documentoClasificacion }  from '../../demo/domain/documentoClasificación'
import { documentoPrioridad }  from '../../demo/domain/documentoPrioridad'
import{ FirstService } from '../../demo/service/first-service'
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-doc-recibidos',
  templateUrl: './doc-recibidos.component.html',
  styleUrls: ['../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DocRecibidosComponent implements OnInit {

  documentoClasificacion: any = [];
  documentoPrioridad: any =[];
  documentos: any=[];
  allDocumentos: any = [];
  nuevoDocumento: documento;

    //filtros
    fechaInicio:any = ""
    fechaFin:any = ""

  constructor(private router: Router,  private firstService: FirstService,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
     ) {

      }

  ngOnInit(): void {
    /* Detectar si la ruta proviene de el archivo de documentos */
    const params = this.route.snapshot.queryParamMap;
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
    setTimeout(() => {
      if(params.get('fromStore')){

        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Documento Archivado', life: 3000});
      }
      if(params.get('fromFile')){
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Documento Agregado a Carpeta', life: 3000});
      }
    });

    

    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Documentos recibidos'}
  ]);

    this.getDocuments()
    this.getPrioridadDocumento()
    this.getClasificacionDocumento()
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

  redirect() {
    this.router.navigate(['analista/vistaDoc']);

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
  getDocuments(){
    this.firstService.getDocumento().subscribe(
      res=>{
        this.documentos = res
        this.allDocumentos=res
      },
      err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }
  delete(id:number){
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Documento Archivado', life: 3000});
    this.firstService.deleteDocumento(id).subscribe(
      res =>{
        console.log(res);
        this.getDocuments()
      },
      err=> {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )

  }




  aplicarFiltro(){
    this.documentos = this.allDocumentos.filter(item => {
      let fin:Date = new Date(this.fechaFin)
      let inicio:Date = new Date(this.fechaInicio)
      let fechaDoc:Date = new Date(item.obtencionInformacion)
      if(fechaDoc>=inicio && fechaDoc<=fin){return true
      }else{return false} 
    })
  }


}
