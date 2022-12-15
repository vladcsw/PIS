import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Router, ActivatedRoute } from '@angular/router';
import {Arma} from '../../../demo/domain/arma'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-arma',
  templateUrl: './arma.component.html',
  styleUrls: ['../../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ArmaComponent implements OnInit {
  items: MenuItem[];
  arma:Arma={};
  armaDialog: boolean;
  tipoArma:any = [];
  calificacionArma:any = [];
  armas:any=[]
  
  editIArmaOption: boolean = false;
  deleteArmaDialog: boolean = false;
  deleteSelectedArmaId: number;

    //personas para listar en el formularios posesionario y propietario
    personas:any=[]//total de personas
    personasDocrelacion:any=[]//registros de relaciones
    personasDoc:any=[]//personas del documento

  constructor(private firstService:FirstService,private activatedRoute:ActivatedRoute, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Documentos recibidos'},
      {label: 'Tratamiento de Informacion '},
      {label: 'Armas '}

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

  if(this.tipoArma.length==0){
    this.tipoArma=[
      {descripcion: 'Revólver', id:1},
      {descripcion: 'Pistola', id:2},
      {descripcion: 'Fusil', id:3},
    ]
  }

  if(this.calificacionArma.length==0){
    this.calificacionArma=[
      {descripcion: 'Fabrica', id:1},
      {descripcion: 'Hechiza', id:2},
    ]
  }

  this.getArmas();
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
      }, err => console.log(err)
    )
  }

  getArmas(){
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getArmasDoc(params['id']).subscribe(
      res=>{
        this.armas = res
        console.log("armas")
        console.log(res)
      },
      err=>console.log(err)
    )
  }

  newArma(){
    this.arma = {}
    this.armaDialog = true;
    this.editIArmaOption = false;
  }

  editArma(arma: Arma){
    this.editIArmaOption = true;
    this.armaDialog = true;
    this.arma = {...arma}

  }

  hideDialog() {
    this.armaDialog = false;  
  }


  deleteArma(id: number){
    this.deleteArmaDialog = true;
    this.deleteSelectedArmaId = id;
  }

  confirmDeleteArma(){
    this.deleteArmaDialog = false;
    this.firstService.deleteArmaDoc(this.deleteSelectedArmaId).subscribe(
      res =>{console.log(res)
        this.getArmas()
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Arma Eliminada', life: 3000});
      }, err =>console.log(err)
    )
    
    this.deleteSelectedArmaId = null;
  }
  save(){
    const params = this.activatedRoute.snapshot.params;
    this.arma.documento_id = params['id']
    this.firstService.saveArmaDoc(this.arma).subscribe(
      res=>{
        if(this.arma.id){
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Arma Actualizada', life: 3000});
        }else{
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Arma Creada', life: 3000});
        }
        console.log(res);
        this.getArmas();
      }, err=>console.log(err)
    )
    this.armaDialog = false;
    this.editIArmaOption = false;
  }

  replaceValuesCalificacion(idT:number){
    for (let valor of this.calificacionArma){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }
  replaceValuesTipo(idT:number){
    for (let valor of this.tipoArma){
      if(valor.id==idT){
        return valor.descripcion
      }
    } 
    return "No clasificado"
  }
}

