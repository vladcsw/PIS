import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import{ FirstService } from '../../demo/service/first-service'
import { Persona } from 'src/app/demo/domain/persona';
import { DocumentoPersona } from 'src/app/demo/domain/documentoPersona';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { query } from '@angular/animations';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-documento-informacion',
  templateUrl: './documento-informacion.component.html',
  styleUrls: ['../../../assets/demo/badges.scss'],
  
  providers: [MessageService, ConfirmationService]
})
export class DocumentoInformacionComponent implements OnInit {

  items: MenuItem[]; 
  persona:Persona;
  allPersonas:any = [];
  
  personas:any=[];

  personaDialog: boolean;   
  personasDoc:any = []
  documentoPersona:DocumentoPersona;
  generos:any =[];
  estadoCivil:any =[];
  tipoDocumentos:any =[];
  nacionalidades:any =[];
  rowsPerPageOptions = [5, 10, 20];
  dniBuscar:any="";


  personaEncontradaDiv:boolean;
  personaNoEncontrada:boolean;
  personaEncontrada:any =[];

  text: string;

  results2: any[];
  results: any[];

  


  constructor(private breadcrumbService: BreadcrumbService, public router: Router, private activatedRoute:ActivatedRoute, private firstService:FirstService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {}


  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Documentos recibidos'},
      {label: 'Tratamiento de Informacion '}
  ]);
    
  const params = this.activatedRoute.snapshot.params;

    this.items = [
      {label: 'PERSONAS', icon: 'pi pi-fw pi-users'},
      {label: 'INMUEBLES', icon: 'pi pi-fw pi-home', routerLink: ['/analista/docRecib/analisis/inmuebles', params['id']]},
      //{label: 'EMPRESAS', icon: 'pi pi-fw pi-globe', routerLink: ['/analista/docRecib/analisis/empresas', params['id']]},
      {label: 'INSUMOS', icon: 'pi pi-fw pi-box', routerLink: ['/analista/docRecib/analisis/insumos', params['id']]},
      {label: 'ARMAS', icon: 'pi pi-fw pi-shield', routerLink: ['/analista/docRecib/analisis/armas', params['id']]},
      {label: 'CUENTAS', icon: 'pi pi-fw pi-wallet', routerLink: ['/analista/docRecib/analisis/cuentas', params['id']]},
      {label: 'MODALIDAD', icon: 'pi pi-fw pi-sitemap', routerLink: ['/analista/docRecib/analisis/modalidad', params['id']]},
      {label: 'TELEFONO', icon: 'pi pi-fw pi-phone', routerLink: ['/analista/docRecib/analisis/telefono', params['id']]},  
      
      
  ];


  if(this.generos.length==0){
    this.generos=[
      {descripcion: 'Masculino', id:'1'},
      {descripcion: 'Femenino', id:'2'},
    ]
  }
  if(this.estadoCivil.length==0){
    this.estadoCivil=[
      {descripcion: 'Soltero', id:'1'},
      {descripcion: 'Casado', id:'2'},
      {descripcion: 'Divorciado', id:'3'},
      {descripcion: 'Voiudo', id:'4'},
    ]
  }
  if(this.tipoDocumentos.length==0){
    this.tipoDocumentos=[
      {descripcion: 'DNI', id:'1'},
      {descripcion: 'Pasaporte', id:'2'},
      {descripcion: 'Carnet de extragería', id:'3'},
      {descripcion: 'Partida de nacimiento', id:'4'},
    ]
  }
  if(this.nacionalidades.length==0){
    this.nacionalidades=[
      {descripcion: 'Peruana', id:'1'},
      {descripcion: 'Venezolana', id:'2'},
      {descripcion: 'Argentino', id:'3'},
      {descripcion: 'Colombiano', id:'4'},
      {descripcion: 'Chileno', id:'5'},
      {descripcion: 'Español', id:'6'},
      {descripcion: 'Americano', id:'7'},
      {descripcion: 'Ingles', id:'8'},
      {descripcion: 'Ruso', id:'9'},
      {descripcion: 'Frances', id:'10'},
      {descripcion: 'Italiano', id:'11'},
    ]
  }
  
    this.getPersonas()
  }

  search(event) {
    //<p-autoComplete [(ngModel)]="text" [suggestions]="results" field="nombre" (completeMethod)="search($event)"></p-autoComplete>
    console.log(event.query)
    this.results2  = [
      "Iron Man",
      "Iron Man1",
      "Iron Man",
      "Iron Man",
      "Iron Man3",
      "Iron Man4",
      "Spiderman",
      "Thor",
      "Spiderman2",
      "Spiderman3",
      "Spiderman4",
      "Hulk",
      "Black Widow",
      "Hawk Eye"
  ];
  
  console.log(this.personas)
  this.results= this.personas.filter(item=> {
    console.log(item)
    item = item.nombre.toLowerCase()
    event.query = event.query.toLowerCase()
    return item.includes(event.query)
  })
 }

  getPersonas(){
    this.personas=[]
    this.firstService.getAllPersonas().subscribe(
      res=>{
        this.allPersonas = res['data']['personas']
      },err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getPersonaDoc(params['id']).subscribe(
      res=>{
        console.log(res)
        this.personasDoc = res
        for (let valor of this.personasDoc){
          for(let valor2 of this.allPersonas){
            if(valor.persona_id == valor2.id){
              this.personas.push(valor2)
            }
          }
        }

      }, err =>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )

  }

  newPersona(){
    this.persona = {}
    this.documentoPersona = {}
    this.personaDialog = true;
    
  }

  hideDialog() {
    this.personaDialog = false;  
  }


  delete(){

  }
  save(){
    const params = this.activatedRoute.snapshot.params;
    this.documentoPersona.documento_id = params['id']
    this.firstService.savePersona(this.persona).subscribe(
      res=>{
        this.firstService.getPersonaByDni(this.persona.dni).subscribe(
          res=>{
            this.documentoPersona.persona_id = res['data']['persona']['id']
            this.firstService.savePersonaDoc(this.documentoPersona).subscribe(
              res=>{
                
                console.log(res);
                
                if(this.documentoPersona.id){
                  this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de Persona Actualizado', life: 3000});
                }else{
                  this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Registro de Persona Creado', life: 3000});
                }
                this.getPersonas()
              }, err => console.log(err)
            )
          }, err =>console.log(err)
        )
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    );
    

    this.personaDialog = false;
    //agregar a la persona
    //buscarla 
    //agregarla al documento 
  }
  saveV2(){
    this.documentoPersona = {}
    const params = this.activatedRoute.snapshot.params;
    this.documentoPersona.documento_id = params['id']
    this.documentoPersona.persona_id = this.personaEncontrada.id
    
    this.firstService.savePersonaDoc(this.documentoPersona).subscribe(
      res=>{
        this.getPersonas()
      },err=>{
        this.messageService.add({ severity: 'error', summary: 'Ups!! algo salió mal', detail: 'No se puede obtener los datos neecesarios', life: 3000 });  
        console.log(err)
      } 
    )
  }

  replaceValuesGenero(idT:number){
    for (let valor of this.generos){
      if(valor.id==idT){
        return valor.descripcion
      }
    }
    return "No clasificado"
  }
  replaceValuesNacionalidad(idT:number){
    for (let valor of this.nacionalidades){
      if(valor.id==idT){
        return valor.descripcion
      }
    }
    return "No clasificado"
  }
  replaceValuesDocumento(idT:number){
    for (let valor of this.tipoDocumentos){
      if(valor.id==idT){
        return valor.descripcion
      }
    }
    return "No clasificado"
  }

  nombreBusqueda(nombre:any){

  }
  DniBusqueda(){
    
    this.personaEncontrada=this.allPersonas.filter(item=> 
      item.dni == this.dniBuscar
    )[0]
    console.log(this.personaEncontrada)
    if(this.personaEncontrada != undefined && this.personaEncontrada.length !=0  ){
      this.personaEncontradaDiv = true
      this.personaNoEncontrada = false;
    }else{
      this.personaNoEncontrada = true;
      this.personaEncontradaDiv = false
    }
    
    
  }


}
