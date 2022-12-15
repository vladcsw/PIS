import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import{ FirstService } from '../../../demo/service/first-service'
import { Router, ActivatedRoute } from '@angular/router';
import { CuentaBan } from 'src/app/demo/domain/cuentaBanc';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

@Component({
  selector: 'app-cuenta-ban',
  templateUrl: './cuenta-ban.component.html',
  styleUrls: ['../../../../assets/demo/badges.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CuentaBanComponent implements OnInit {
  items: MenuItem[];
  
  cuentaDialog: boolean;
  cuentas:any=[]
  cuenta:CuentaBan;

  editCuentaOption: boolean = false;
  deleteCuentaDialog: boolean = false;
  deleteSelectedCuentaId: number;



  constructor( private firstService:FirstService, private activatedRoute:ActivatedRoute, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.breadcrumbService.setItems([
      {label: 'Analista'},
      {label: 'Documentos recibidos'},
      {label: 'Tratamiento de Informacion '},
      {label: 'Cuenta bancaria '}

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
  this.getCuentasBan()
  }

  newCuenta(){
    this.cuenta= {};
    this.cuentaDialog = true;
    this.editCuentaOption = false;
  }
  editCuenta(cuenta : CuentaBan){
    this.cuentaDialog = true;
    this.editCuentaOption = true;
    this.cuenta = {...cuenta};
  }

  hideDialog() {
    this.cuentaDialog = false;  
  }


  deleteCuenta(id: number){
    this.deleteCuentaDialog = true;
    this.deleteSelectedCuentaId = id;
  }

  confirmDeleteCuenta(){
    this.deleteCuentaDialog = false;
    this.firstService.deleteCuentaBanDoc(this.deleteSelectedCuentaId).subscribe(
      res => {
        console.log(res);
        this.getCuentasBan();
      },
      err => console.log(err)
    )
    this.deleteSelectedCuentaId = null;
  }

  getCuentasBan(){
    
    const params = this.activatedRoute.snapshot.params;
    this.firstService.getCuentaBanDoc(params['id']).subscribe(
      res=>{
        this.cuentas=res;
        console.log()
      }, err=>console.log(err)
    )
  }
  save(){
    console.log(this.cuenta)
    const params = this.activatedRoute.snapshot.params;
    this.cuenta.documento_id=params['id']
    this.firstService.saveCuentaBanDOc(this.cuenta).subscribe(
      res=>{
        this.getCuentasBan()
        if(this.cuenta.id){
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Cuenta Registrada Actualizada', life: 3000});
        }else{
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Cuenta Creada', life: 3000});
        }
      },
      err=>console.log(err)
    )
    this.editCuentaOption = false;
    this.cuentaDialog=false;
  }

}
