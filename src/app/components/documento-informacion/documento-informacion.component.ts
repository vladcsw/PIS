import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import{ FirstService } from '../../demo/service/first-service'
import { Persona } from 'src/app/demo/domain/persona';
import { DocumentoPersona } from 'src/app/demo/domain/documentoPersona';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { query } from '@angular/animations';

@Component({
  selector: 'app-documento-informacion',
  templateUrl: './documento-informacion.component.html',
  styleUrls: ['./documento-informacion.component.scss']
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
  personaEncontradaDialog:boolean;
  

  text: string;

  results2: any[];
  results: any[];

  

  constructor(public router: Router, private activatedRoute:ActivatedRoute, private firstService:FirstService) {}

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;

    this.items = [
      {label: 'PERSONAS', icon: 'pi pi-fw pi-users'},
      {label: 'INMUEBLES', icon: 'pi pi-fw pi-home', routerLink: ['/analista/docRecib/analisis/inmuebles', params['id']]},
      {label: 'EMPRESAS', icon: 'pi pi-fw pi-globe', routerLink: ['/analista/docRecib/analisis/empresas', params['id']]},
      {label: 'INSUMOS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/insumos', params['id']]},
      {label: 'ARMAS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/armas', params['id']]},
      {label: 'CUENTAS', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/cuentas', params['id']]},
      {label: 'MODALIDAD', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/modalidad', params['id']]},
      {label: 'AGENDA', icon: 'pi pi-fw pi-car', routerLink: ['/analista/docRecib/analisis/agenda', params['id']]},
      
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
      },err=>console.log(err)
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

      }, err => console.log(err)
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
                this.getPersonas()
              }, err => console.log(err)
            )
          }, err =>console.log(err)
        )
      }, err => console.log(err)
      
    );
    

    this.personaDialog = false;
    //agregar a la persona
    //buscarla 
    //agregarla al documento 
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
    console.log(this.personas.filter(item=> 
      item.dni == this.dniBuscar
    ))
    this.personaEncontradaDialog = true
  }


}
