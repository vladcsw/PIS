import { Component, HostBinding, OnInit } from '@angular/core';
import { DocEnviado } from 'src/app/models/DocEnviado';
import { DocEnviadoService } from 'src/app/services/doc-enviado.service';
import { documento }  from '../../demo/domain/documento'
import { documentoClasificacion }  from '../../demo/domain/documentoClasificaciÃ³n'
import { documentoPrioridad }  from '../../demo/domain/documentoPrioridad'
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import{ FirstService } from '../../demo/service/first-service'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-doc-enviado',
  templateUrl: './doc-enviado.component.html',
  styleUrls: ['../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})

export class DocEnviadoComponent implements OnInit {
  documentoClasificacion: any = [];
  documentoPrioridad: any =[];
  documentos: any = [];
  allDocumentos: any = [];
  nuevoDocumento: documento = {};
  organosPoliciales:any = [];
  subOrganos:any = [];
  tipoDocumento:any = [];

  //Lista de archivos seleccionados
  selectedFiles: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = []
  //Mensaje que almacena la respuesta de las Apis
  message = '';
  //Nombre del archivo para usarlo posteriormente en la vista html
  fileName = "";
  fileInfos: Observable<any>;

  auxID: string;

  //filtros
  fechaInicio:any = ""
  fechaFin:any = ""

  editIDocumentoOption: boolean = false;
  deleteDocumentoDialog: boolean = false;
  deleteSelectedDocumentoId: number;



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



  constructor(private documento: DocEnviadoService, private firstService: FirstService, private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  docEnviadoDialog: boolean;




  index: number = 0;




  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {label: 'Agente'},
      {label: 'Envio de Documentos'}
  ]);
    this.getDocumentos()
    //this.getClasificacion()
    //this.getPrioridades()

    if (this.organosPoliciales.length==0){
      this.organosPoliciales=[
        {descripcion: 'DirecciÃ³n Nacional de InvestigaciÃ³n Criminal', id:1},
        {descripcion: 'DirecciÃ³n Antidrogas PNP', id:2},
        {descripcion: 'DirecciÃ³n de InvestigaciÃ³n Criminal', id:3},
        {descripcion: 'DirecciÃ³n de InvestigaciÃ³n de Lavado de Activos', id:4},
        {descripcion: 'DirecciÃ³n Contra la Trata de Personas y TrÃ¡fico Ilicito de Migrantes', id:5},
        {descripcion: 'DirecciÃ³n Contra la CorrupciÃ³n', id:6},
        {descripcion: 'DirecciÃ³n de PolicÃ­a Fiscal', id:7},
        {descripcion: 'DirecciÃ³n Nacional de Orden y Seguridad', id:8},
        {descripcion: 'DirecciÃ³n de Seguridad de Estado', id:9},
      ]
    }

    if (this.tipoDocumento.length==0){
      this.tipoDocumento=[
        {descripcion: 'Nota de agente', id:1},
        {descripcion: 'Solicitud de informaciÃ³n', id:2},
      ]
    }

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

  getPrioridades(){
    this.firstService.getDocumentoPrioridad().subscribe(
      res => {
        this.documentoPrioridad = res['data']['PRIORIDAD']

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo saliÃ³ mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }

  getClasificacion(){
    this.firstService.getClasificacion().subscribe(
      res => {
        this.documentoClasificacion = res['data']['DOCUMENTO_CLASIFICACION']

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo saliÃ³ mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }

  getDocumentos(){
    this.firstService.getDocumento().subscribe(
      res=>{
        this.documentos = res
        this.allDocumentos=res
      },
      err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo saliÃ³ mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )


  }

  newDocAngente(){
    this.nuevoDocumento = {};
    this.docEnviadoDialog = true;
  }

  editDocumento(nuevoDocumento: documento){
    this.docEnviadoDialog = true
    this.editIDocumentoOption = true;
    this.nuevoDocumento = {...nuevoDocumento, "tipoDocumento":this.ConvertTipoDocumento(this.nuevoDocumento.tipoDocumento)};
   
  }

  ConvertTipoDocumento(cadena: string ): string {
    const newCadena : string= cadena?.charAt(0)?.toUpperCase() + cadena?.slice(1)?.toLowerCase();
    console.log(newCadena)
    return newCadena
  }

 

  uploadfun(event) {
    this.progressInfo = [];
    event.files.length == 1 ? this.fileName = event.files[0].name : this.fileName = event.files.length + " archivos";
    this.selectedFiles = event.files;
    console.log("Multiple Files are uploaded: ", event.files);
    console.log(this.selectedFiles)

  }
  uploadAllFiles(){
    console.log("Iniciando subida");
    this.message = '';
    if (this.selectedFiles)
    {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
      console.log("Subiendo el archivo: ", this.selectedFiles[i]);
    }
    console.log("Se terminaron de subir");
}
  }
  upload(index, file)
  {

    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.documento.upload(file, this.auxID).subscribe(
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

    this.documento.saveDocEnviado(this.nuevoDocumento)
    .subscribe(
      res => {

        this.auxID = res['data']['documento']['id']
        
        this.uploadAllFiles();
        this.selectedFiles = null;

        
        this.getDocumentos()
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Documento Creado', life: 3000});
      },
      err =>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo saliÃ³ mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
        )
        this.docEnviadoDialog = false;
        this.editIDocumentoOption = false;

  }
  getDocuments(){
    this.firstService.getDocumento().subscribe(
      res=>{
        this.documentos = res['data']['documentos']
      },
      err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo saliÃ³ mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }
  delete(id:number){
    this.firstService.deleteDocumento(id).subscribe(
      res =>{
        console.log(res);
        this.getDocuments()
        this.getDocumentos()
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Documento eliminado', life: 3000});
      },
      err=> {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo saliÃ³ mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
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
  replaceValuesOrgano(idT:number){
    for (let valor of this.organosPoliciales){
      if(valor.id==idT){
        return valor.descripcion
      }
    }
    return "No clasificado"
  }
  

  hideDialog(){
    this.nuevoDocumento = {}
    this.docEnviadoDialog = false;
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
export class TabViewDemo {}


