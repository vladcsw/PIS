import { Component, OnInit } from '@angular/core';
import{ FirstService } from '../../demo/service/first-service'
import { Router,ActivatedRoute } from '@angular/router';
import { documento }  from '../../demo/domain/documento'
import { documentoClasificacion }  from '../../demo/domain/documentoClasificación'
import { documentoPrioridad }  from '../../demo/domain/documentoPrioridad'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-doc-archivado',
  templateUrl: './doc-archivado.component.html',
  styleUrls: ['../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DocArchivadoComponent implements OnInit {

  documentoClasificacion:any = [];
  documentoPrioridad :any = [];
  documentos:any = [];
  allDocumentos: any = [];

  //filtros
  fechaInicio:any = ""
  fechaFin:any = ""

  constructor(private firstService: FirstService, private messageService: MessageService,
    private confirmationService: ConfirmationService ) { }

  ngOnInit(): void {

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
    this.getDocumentos();
  }

  getDocumentos(){
    this.firstService.getDocumentosArchivados().subscribe(
      res => {
        this.documentos = res
        this.allDocumentos = res
        

      },
      err => {
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
