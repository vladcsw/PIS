import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { FirstService } from 'src/app/demo/service/first-service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CarpetaComponent implements OnInit {

  carpetaDialog: boolean;//formulario 
  crearCarpetaDialog:boolean;//pregunta de confirmacion
  index: number = 0;
  carpetas:any = []
  carpeta:any ={}

  editICarpetaOption: boolean = false;
  deleteCarpetaDialog: boolean = false;
  deleteSelectedCarpetaId: number;
  

  constructor(private breadcrumbService: BreadcrumbService, private firstService:FirstService,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Bandeja de carpeta'},
  ]);
  this.getCarpetas()
    
  }

  getCarpetas(){
    this.firstService.getCarpetas().subscribe(
      res=>{
        this.carpetas = res['data']['CARPETA'];
      },err =>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        
        console.log(err)
      } 
    )
  }
  editCarpeta(carpeta : any){
    this.carpetaDialog = true;
    this.editICarpetaOption = true;
    this.carpeta = {...carpeta};

  }
  deleteTelefono(id: number){
    this.deleteCarpetaDialog= true;
    this.deleteSelectedCarpetaId = id;
  }
  
  confirmDeleteCarpeta(){
    this.deleteCarpetaDialog= false;
    this.firstService.deleteCarpeta(this.deleteSelectedCarpetaId).subscribe(
      res => {
        console.log(res);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Caarpeta eliminada correctamente', life: 3000});
        this.getCarpetas();
      },
      err => console.log("error deleting carpeta")
    )
    this.deleteSelectedCarpetaId = null;
  }

  save(){
    this.firstService.saveCarpeta(this.carpeta).subscribe(
      res =>{
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Carpeta Creada', life: 3000});
        this.getCarpetas();
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
    this.carpetaDialog = false
    this.editICarpetaOption = false;
  }

  openNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev() {
      this.index = (this.index === 0) ? 2 : this.index - 1;
  }

  crearCarpeta(){
    this.crearCarpetaDialog = true;
  }
  confirmCrearCarpeta(){
    this.crearCarpetaDialog = false;
    this.carpetaDialog = true;
  }
  hideDialog(){
    this.carpetaDialog = false;
  }

}
export class TabViewDemo {}