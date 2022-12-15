import { Component, OnInit } from '@angular/core';
import{ FirstService } from '../../../demo/service/first-service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
  allDocumentos:any = [];//tal de documentos
  documentos:any = [];///documentos de la carpeta
  constructor(private firstService:FirstService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.getDocumentos()
  }


  getDocumentos(){
    console.log("here")
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getDocumento().subscribe(
      res =>{
        this.allDocumentos = res
        this.documentos= this.allDocumentos.filter(item=>item.carpeta_id == params['id'])
        console.log("todos los documentos")
        console.log(this.allDocumentos)
        console.log("Docs de la carpeta")
        console.log(this.documentos)
      },err =>console.log(err)
    )
  }

}
