import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import{ FirstService } from '../../demo/service/first-service'
import { documento }  from '../../demo/domain/documento'
import { documentoClasificacion }  from '../../demo/domain/documentoClasificación'
import { documentoPrioridad }  from '../../demo/domain/documentoPrioridad'



@Component({
  selector: 'app-doc-inteligencia',
  templateUrl: './doc-inteligencia.component.html',
  styleUrls: ['./doc-inteligencia.component.scss']
})
export class DocInteligenciaComponent implements OnInit {
  documentoClasificacion: documentoClasificacion  [];
  documentoPrioridad: documentoPrioridad  [];
  documento:documento;

  constructor( private firstService:FirstService, private router:Router, private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.getDocumento(params['id'])
    this.getClasificacionDocumento()
    this.getPrioridadDocumento()

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

  getDocumento(id:number){
    this.firstService.getUnDocumento(id).subscribe(
      res=>{
        this.documento = res['data']['documento']
      },
      err=>console.log(err)
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
