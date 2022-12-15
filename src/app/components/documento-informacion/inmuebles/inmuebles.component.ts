import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import{ FirstService } from '../../../demo/service/first-service'
import { Inmueble } from 'src/app/demo/domain/inmueble';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['../../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InmueblesComponent implements OnInit {

  items: MenuItem[];
  inmueble:Inmueble;
  inmuebles:any=[]
  inmuebleDialog: boolean;
  tipoInmueble:any = []
  zonaInmueble:any = []

  editInmuebleOption: boolean = false;
  deleteInmuebleDialog: boolean = false;
  deleteSelectedInmuebleId: number;

  //personas para listar en el formularios posesionario y propietario
  personas:any=[]//total de personas
  personasDocrelacion:any=[]//registros de relaciones
  personasDoc:any=[]//personas del documento
  
  constructor(private firstService:FirstService, private activatedRoute:ActivatedRoute, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Documentos recibidos'},
      {label: 'Tratamiento de Informacion '},
      {label: 'Inmuebles '}

  ]);

    const params = this.activatedRoute.snapshot.params;
    this.items = [
      {label: 'PERSONAS', icon: 'pi pi-fw pi-users', routerLink: ['/analista/docRecib/analisis', params['id']]},
      {label: 'INMUEBLES', icon: 'pi pi-fw pi-home', routerLink: ['/analista/docRecib/analisis/inmuebles', params['id']]},
      //{label: 'EMPRESAS', icon: 'pi pi-fw pi-globe', routerLink: ['/analista/docRecib/analisis/empresas', params['id']]},
      {label: 'INSUMOS', icon: 'pi pi-fw pi-box', routerLink: ['/analista/docRecib/analisis/insumos', params['id']]},
      {label: 'ARMAS', icon: 'pi pi-fw pi-shield', routerLink: ['/analista/docRecib/analisis/armas', params['id']]},
      {label: 'CUENTAS', icon: 'pi pi-fw pi-wallet', routerLink: ['/analista/docRecib/analisis/cuentas', params['id']]},
      {label: 'MODALIDAD', icon: 'pi pi-fw pi-sitemap', routerLink: ['/analista/docRecib/analisis/modalidad', params['id']]},
      {label: 'TELEFONO', icon: 'pi pi-fw pi-phone', routerLink: ['/analista/docRecib/analisis/telefono', params['id']]},  
      
  ];
  if(this.tipoInmueble.length == 0){
    this.tipoInmueble=[
      {descripcion: 'Terreno', id:1},
      {descripcion: 'Casa', id:2},
    ]
  }

  if(this.zonaInmueble.length == 0){
    this.zonaInmueble=[
      {descripcion: 'Rural', id:1},
      {descripcion: 'Urbano', id:2},
    ]

    this.getInmuebles()
  }
  this.getPersonas()

  }

  getPersonas(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getAllPersonas().subscribe(
      res=>{
        this.personas = res['data']['personas']
        this.firstService.getPersonaDoc(params['id']).subscribe(
          res=>{
            //revisar con el arreglo de perosnas, que id hay en el arreglo de relaciones
            this.personasDocrelacion = res;
            
            this.personasDoc = this.personas.filter(item=>{return this.personasDocrelacion.some(
              person => {
                if(person.persona_id == item.id){
                  return true
                }else{
                  return false
                }
              }
              )}
            )
            
            
          }
        )
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }
  editInmueble(inmueble: Inmueble) {
    this.inmuebleDialog = true;
    this.inmueble= {...inmueble};
    this.editInmuebleOption = true;
  }
  deleteInmueble(id: number){
    this.deleteSelectedInmuebleId = id;
    this.deleteInmuebleDialog = true;
  }

  comfirmDeleteInmueble(){
    this.deleteInmuebleDialog = false;
    this.firstService.deleteInmuebleDoc(this.deleteSelectedInmuebleId).subscribe(
      res => {
        console.log("Inmueble eliminado");
        this.getInmuebles()
      },
      err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
    this.deleteSelectedInmuebleId = null;
  }
  
  getInmuebles(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getInmuebleDoc(params['id']).subscribe(
      res=>{
        this.inmuebles = res
      },err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }

  newInmueble(){
    this.inmueble= {};
    this.inmuebleDialog = true;
    this.editInmuebleOption = false
  }

  hideDialog() {
    this.inmuebleDialog = false;  
  }


 
  save(){
    
    const params = this.activatedRoute.snapshot.params;
    this.inmueble.documento_id=params['id']
    this.firstService.saveInmuebleDOc(this.inmueble).subscribe(
      res=>{
        console.log(res);

        this.getInmuebles()
        if(this.inmueble.id){
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de Inmueble Actualizado', life: 3000});
        }else{
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de Inmueble Creada', life: 3000});
        }
      },
      err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
    
    this.editInmuebleOption = false
    this.inmuebleDialog=false
  }


  replaceValuesTipo(idT:number){
    for (let valor of this.tipoInmueble){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }

  replaceValuesZona(idT:number){
    for (let valor of this.zonaInmueble){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }


}
