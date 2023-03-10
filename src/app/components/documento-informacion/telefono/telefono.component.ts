import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Router, ActivatedRoute } from '@angular/router';
import { Telefono } from 'src/app/demo/domain/telefono';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['../../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TelefonoComponent implements OnInit {


  
  telefonoDialog: boolean;
  items: MenuItem[];
  proveedores:any =[]
  telefonos:any =[]
  telefono:Telefono = {};


  editITelefonoOption: boolean = false;
  deleteTelefonoDialog: boolean = false;
  deleteSelectedTelefonoId: number;


    //personas para listar en el formularios posesionario y propietario
    personas:any=[]//total de personas
    personasDocrelacion:any=[]//registros de relaciones
    personasDoc:any=[]//personas del documento

  constructor(private firstService:FirstService, private activatedRoute:ActivatedRoute, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) { }


  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;

    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Documentos recibidos'},
      {label: 'Tratamiento de Informacion '},
      {label: 'Telefono '}

  ]);

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
  if(this.proveedores.length==0){
    this.proveedores=[
      {descripcion: 'Claro', id:1},
      {descripcion: 'Movistar', id:2},
      {descripcion: 'Enter', id:3},
      {descripcion: 'Bitel', id:4},
    ]
  }
  this.getPersonas()
  this.getTelefonos();
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
      }, err => console.log(err)
    )
  }

  getTelefonos(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getTelefonosDoc(params['id']).subscribe(
      res=>{
        this.telefonos = res
      },err=>console.log(err)
    )
  }

  newTelefono(){

    this.telefono = {}
    this.telefonoDialog = true
    this.editITelefonoOption = false;
  }

  editTelefono(telefono: Telefono){
    this.telefonoDialog = true
    this.editITelefonoOption = true;
    this.telefono = {...telefono};
  }
  deleteTelefono(id: number){
    this.deleteTelefonoDialog= true;
    this.deleteSelectedTelefonoId = id;
  }
  confirmDeleteTelefono(){
    this.deleteTelefonoDialog= false;
    this.firstService.deleteTelefonoDoc(this.deleteSelectedTelefonoId).subscribe(
      res => {
        console.log(res);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Telefono eliminado correctamente', life: 3000});
        this.getTelefonos();
      },
      err => console.log("error deleting telefono")
    )
    this.deleteSelectedTelefonoId = null;
  }
  hideDialog() {
    this.telefonoDialog= false;  
  }

  save(){
    const params = this.activatedRoute.snapshot.params;
    this.telefono.documento_id=params['id']
    this.firstService.saveTelefonoDoc(this.telefono).subscribe(
      res=>{
        this.getTelefonos()
        if(this.telefono.id){
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de Telefono Actualizado', life: 3000});
        }else{
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de telefono Creado', life: 3000});
        }
      },err=>console.log(err)
    )
    this.telefonoDialog= false;  
    this.editITelefonoOption = false;
  }
  replaceValuesPersona(idT:number){
    for (let valor of this.personasDoc){
      if(valor.id==idT){
        return valor.nombre
      }
    } 
    return "No clasificado"
  }

}
