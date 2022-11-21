import { Component, HostBinding, OnInit } from '@angular/core';
import { DocEnviado } from 'src/app/models/DocEnviado';
import { DocEnviadoService } from 'src/app/services/doc-enviado.service';
import { documento }  from '../../demo/domain/documento'


import{ FirstServideService } from '../../demo/service/first-servide.service'
@Component({
  selector: 'app-doc-enviado',
  templateUrl: './doc-enviado.component.html',
  styleUrls: ['./doc-enviado.component.scss']
})

export class DocEnviadoComponent implements OnInit {

  documentos: documento[];
  nuevoDocumento: documento;
  documento_prioridad= [
    { name: "alto", code: "alto" },
    { name: "medio", code: "medio" },
    { name: "bajo", code: "bajo" }

];
documento_clasificacion_id = [
    { name: 5, code: 5 },
    { name: 500, code: 500 }
];


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

  

  constructor(private documento: DocEnviadoService, private firstService: FirstServideService) { }
  docEnviadoDialog: boolean;

  documentoClasificacion: any = [];

  index: number = 0;

  


  ngOnInit(): void {
    this.firstService.getClasificacion().subscribe(
      res => {
        this.documentoClasificacion = res['data']['DOCUMENTO_CLASIFICACION']

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

  openNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
  }

  save(){
    console.log(this.docEnviado);
    this.documento.saveDocEnviado(this.docEnviado)
    .subscribe(
      res => {console.log(res);},
      err => {console.log("backend no responde");}
        )
    
  }
  


  getDocumentoClasificación(){

  }
}
export class TabViewDemo {}

