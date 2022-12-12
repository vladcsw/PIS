import { Component, OnInit } from '@angular/core';
import{ FirstService } from '../../demo/service/first-service'
import { Router,ActivatedRoute } from '@angular/router';
import { documento }  from '../../demo/domain/documento'
import { documentoClasificacion }  from '../../demo/domain/documentoClasificación'
import { documentoPrioridad }  from '../../demo/domain/documentoPrioridad'

@Component({
  selector: 'app-doc-archivado',
  templateUrl: './doc-archivado.component.html',
  styleUrls: ['./doc-archivado.component.scss']
})
export class DocArchivadoComponent implements OnInit {

  documentoClasificacion:any = [];
  documentoPrioridad :any = [];
  documentos:any = [];

  constructor(private firstService: FirstService, ) { }

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

      },
      err => console.log(err)
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

}
