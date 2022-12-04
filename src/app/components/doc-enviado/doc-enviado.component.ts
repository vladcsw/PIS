import { Component, HostBinding, OnInit } from '@angular/core';
import { DocEnviado } from 'src/app/models/DocEnviado';
import { DocEnviadoService } from 'src/app/services/doc-enviado.service';
import { documento }  from '../../demo/domain/documento'
import { documentoClasificacion }  from '../../demo/domain/documentoClasificación'
import { documentoPrioridad }  from '../../demo/domain/documentoPrioridad'
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import{ FirstService } from '../../demo/service/first-service'
@Component({
  selector: 'app-doc-enviado',
  templateUrl: './doc-enviado.component.html',
  styleUrls: ['./doc-enviado.component.scss']
})

export class DocEnviadoComponent implements OnInit {
  documentoClasificacion: documentoClasificacion  [];
  documentoPrioridad: documentoPrioridad  [];
  documentos: documento[];
  nuevoDocumento: documento;

  //Lista de archivos seleccionados
  selectedFiles: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = []
  //Mensaje que almacena la respuesta de las Apis
  message = '';
  //Nombre del archivo para usarlo posteriormente en la vista html
  fileName = "";
  fileInfos: Observable<any>;


  @HostBinding("class") classes ="row";

  dateObj = new Date();
  month = this.dateObj.getUTCMonth() + 1; //months from 1-12
  day = this.dateObj.getUTCDate();
  year = this.dateObj.getUTCFullYear();

  docEnviado: DocEnviado = {
    asunto:"",
    documento_prioridad:"",
    documento_clasificacion_id:1,
    fechaObtencion: `${this.year}-${this.month}-${this.day}`,
    documento_persona: "",
    descripcion: ""
  }



  constructor(private documento: DocEnviadoService, private firstService: FirstService) { }
  docEnviadoDialog: boolean;




  index: number = 0;




  ngOnInit(): void {
    this.firstService.getClasificacion().subscribe(
      res => {
        this.documentoClasificacion = res['data']['DOCUMENTO_CLASIFICACION']

      },
      err => console.log(err)
    )


    this.firstService.getDocumentoPrioridad().subscribe(
      res => {
        this.documentoPrioridad = res['data']['PRIORIDAD']

      },
      err => console.log(err)
    )



    this.firstService.getDocumento().subscribe(
      res=>{
        this.documentos = res['data']['documentos']
      },
      err=>console.log(err)
    )



  }
  newDocAngente(){
    this.nuevoDocumento = {};
    this.docEnviadoDialog = true;
  }
  uploadfun(event) {
    this.progressInfo = [];
    event.files.length == 1 ? this.fileName = event.files[0].name : this.fileName = event.files.length + " archivos";
    this.selectedFiles = event.files;
    console.log("Multiple Files are uploaded: ", event.files);

  }
  uploadAllFiles(){
    console.log("Iniciando subida");
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
      console.log("Subiendo el archivo: ", this.selectedFiles[i]);
    }
    console.log("Se terminaron de subir");
  }
  upload(index, file)
  {

    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.documento.upload(file, this.docEnviado).subscribe(
      event => {

        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.documento.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });

  }

  openNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
  }

  save(){
    console.log("este documento se va a enviar:")
    console.log(this.docEnviado);
    this.documento.saveDocEnviado(this.docEnviado)
    .subscribe(
      res => {console.log(res);},
      err => {console.log("backend no responde");}
        )

  }
  getDocuments(){
    this.firstService.getDocumento().subscribe(
      res=>{
        this.documentos = res['data']['documentos']
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
export class TabViewDemo {}


