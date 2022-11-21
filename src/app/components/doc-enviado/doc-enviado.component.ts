import { Component, HostBinding, OnInit } from '@angular/core';
import { DocEnviado } from 'src/app/models/DocEnviado';
import { DocEnviadoService } from 'src/app/services/doc-enviado.service';

@Component({
  selector: 'app-doc-enviado',
  templateUrl: './doc-enviado.component.html',
  styleUrls: ['./doc-enviado.component.scss']
})

export class DocEnviadoComponent implements OnInit {
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
  
  docEnviado: DocEnviado = {
    asunto:"asunto de descripcion",
    documento_prioridad:"alto",
    documento_clasificacion_id:1,
    //fechaObtención: Date(),
    documento_persona: "Juanito"
  }

  constructor(private documento: DocEnviadoService) { }
  docEnviadoDialog: boolean;

  index: number = 0;

  ngOnInit(): void {
  }
  newDocAngente(){
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
}