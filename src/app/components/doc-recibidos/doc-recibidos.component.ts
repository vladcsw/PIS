import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { documento }  from '../../demo/domain/documento'
import { documentoClasificacion }  from '../../demo/domain/documentoClasificación'
import { documentoPrioridad }  from '../../demo/domain/documentoPrioridad'
import{ FirstService } from '../../demo/service/first-service'

@Component({
  selector: 'app-doc-recibidos',
  templateUrl: './doc-recibidos.component.html',
  styleUrls: ['./doc-recibidos.component.scss']
})
export class DocRecibidosComponent implements OnInit {

  documentoClasificacion: documentoClasificacion  [];
  documentoPrioridad: documentoPrioridad  [];
  documentos: any=[];
  nuevoDocumento: documento;


  constructor(private router: Router,  private firstService: FirstService) { }

  ngOnInit(): void {
    this.getDocuments()
    this.getPrioridadDocumento()
    this.getClasificacionDocumento()
  }
  redirect() {
    this.router.navigate(['analista/vistaDoc']);

  }

  getClasificacionDocumento(){
    this.firstService.getClasificacion().subscribe(
      res => {
        this.documentoClasificacion = res['data']['DOCUMENTO_CLASIFICACION']

      },
      err => console.log(err)
    )
  }
  getPrioridadDocumento(){
    this.firstService.getDocumentoPrioridad().subscribe(
      res => {
        this.documentoPrioridad = res['data']['PRIORIDAD']

      },
      err => console.log(err)
    )
  }
  getDocuments(){
    this.firstService.getDocumento().subscribe(
      res=>{
        this.documentos = res
      },
      err=>console.log(err)
    )
  }
  delete(id:number){
    this.firstService.deleteDocumento(id).subscribe(
      res =>{
        console.log(res);
        this.getDocuments()
      },
      err=> console.log(err)
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
