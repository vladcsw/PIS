import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { BusquedaService } from 'src/app/services/busqueda.service';

import {MenuItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { addDays } from '@fullcalendar/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {


    loading: boolean = true;
    items: MenuItem[];
    estado = 'PERSONAS'
    estadoaux = 'persona'
    busquedas: any;

  constructor(private busquedaSevice: BusquedaService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('estadoAux')){
        this.estadoaux = localStorage.getItem('estadoAux')
        this.estado = localStorage.getItem('estado')
    }else{
        this.estadoaux = 'persona'
        this.estado = 'PERSONAS'
    }

    this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
        this.busquedas = xd;
        this.busquedas.forEach(ad => {
            this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {

                ad = Object.assign(ad,{estadoAuxiliar:''})
                if(xd['data']['documento']['disposicion']===1)
                {
                    ad['estadoAuxiliar']=true
                }
                else{
                    ad['estadoAuxiliar']=false
                }
            })
        }
        )
        this.loading = false;
    })

    this.items = [
        {label: 'PERSONAS', icon: 'pi pi-fw pi-users', command: (event) =>{

            this.loading = true;
            this.estado = "PERSONAS"
            this.estadoaux = "persona"
            localStorage.setItem('estadoAux',this.estadoaux)
            localStorage.setItem('estado',this.estado)
            this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
                this.busquedas = xd;
                this.busquedas.forEach(ad => {
                    this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {
                        ad = Object.assign(ad,{estadoAuxiliar:''})
                        if(xd['data']['documento']['disposicion']===1)
                        {
                            ad['estadoAuxiliar']=true
                        }
                        else{
                            ad['estadoAuxiliar']=false
                        }
                    })
                }
                )
                this.loading = false;
            })
        }},
        {label: 'INMUEBLES', icon: 'pi pi-fw pi-home', fragment:"card1", preserveFragment:true, command: (event) =>{
            this.loading = true;
            this.estado = "INMUEBLES"
            this.estadoaux = "documento_inmueble"
            localStorage.setItem('estadoAux',this.estadoaux)
            localStorage.setItem('estado',this.estado)
            this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
                this.busquedas = xd;
                this.busquedas.forEach(ad => {
                    this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {
                        ad = Object.assign(ad,{estadoAuxiliar:''})
                        if(xd['data']['documento']['disposicion']===1)
                        {
                            ad['estadoAuxiliar']=true
                        }
                        else{
                            ad['estadoAuxiliar']=false
                        }
                    })
                }
                )
                this.loading = false;
            })
        }},
        {label: 'EMPRESAS', icon: 'pi pi-fw pi-globe', command: (event) =>{
            this.loading = true;
            this.estado = "EMPRESAS"
            this.estadoaux = "documento_empresa"
            localStorage.setItem('estadoAux',this.estadoaux)
            localStorage.setItem('estado',this.estado)
            this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
                this.busquedas = xd;
                this.busquedas.forEach(ad => {
                    this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {
                        ad = Object.assign(ad,{estadoAuxiliar:''})
                        if(xd['data']['documento']['disposicion']===1)
                        {
                            ad['estadoAuxiliar']=true
                        }
                        else{
                            ad['estadoAuxiliar']=false
                        }
                    })
                }
                )
                this.loading = false;
            })
        }},
        {label: 'INSUMOS', icon: 'pi pi-fw pi-car', command: (event) =>{
            this.loading = true;
            this.estado = "INSUMOS"
            this.estadoaux = "documento_insumo"
            localStorage.setItem('estadoAux',this.estadoaux)
            localStorage.setItem('estado',this.estado)
            this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
                this.busquedas = xd;
                this.busquedas.forEach(ad => {
                    this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {
                        ad = Object.assign(ad,{estadoAuxiliar:''})
                        if(xd['data']['documento']['disposicion']===1)
                        {
                            ad['estadoAuxiliar']=true
                        }
                        else{
                            ad['estadoAuxiliar']=false
                        }
                    })
                }
                )
                this.loading = false;
            })
        }},
        {label: 'ARMAS', icon: 'pi pi-fw pi-car', command: (event) =>{
            this.loading = true;
            this.estado = "ARMAS"
            this.estadoaux = "documento_arma"
            localStorage.setItem('estadoAux',this.estadoaux)
            localStorage.setItem('estado',this.estado)
            this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
                this.busquedas = xd;
                this.busquedas.forEach(ad => {
                    this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {
                        ad = Object.assign(ad,{estadoAuxiliar:''})
                        if(xd['data']['documento']['disposicion']===1)
                        {
                            ad['estadoAuxiliar']=true
                        }
                        else{
                            ad['estadoAuxiliar']=false
                        }
                    })
                }
                )
                this.loading = false;
            })
        }},
        {label: 'CUENTAS', icon: 'pi pi-fw pi-car', command: (event) =>{
            this.loading = true;
            this.estado = "CUENTAS"
            this.estadoaux = "documento_cuenta_bancaria"
            localStorage.setItem('estadoAux',this.estadoaux)
            localStorage.setItem('estado',this.estado)
            this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
                this.busquedas = xd;
                this.busquedas.forEach(ad => {
                    this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {
                        ad = Object.assign(ad,{estadoAuxiliar:''})
                        if(xd['data']['documento']['disposicion']===1)
                        {
                            ad['estadoAuxiliar']=true
                        }
                        else{
                            ad['estadoAuxiliar']=false
                        }
                    })
                }
                )
                this.loading = false;
            })
        }},
        {label: 'MODALIDADES', icon: 'pi pi-fw pi-car', command: (event) =>{
            this.loading = true;
            this.estado = "MODALIDADES"
            this.estadoaux = "documento_modalidad"
            localStorage.setItem('estadoAux',this.estadoaux)
            localStorage.setItem('estado',this.estado)
            this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
                this.busquedas = xd;
                this.busquedas.forEach(ad => {
                    this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {
                        ad = Object.assign(ad,{estadoAuxiliar:''})
                        if(xd['data']['documento']['disposicion']===1)
                        {
                            ad['estadoAuxiliar']=true
                        }
                        else{
                            ad['estadoAuxiliar']=false
                        }
                    })
                }
                )
                this.loading = false;
            })
        }},
        {label: 'AGENDAS', icon: 'pi pi-fw pi-car', command: (event) =>{
            this.loading = true;
            this.estado = "AGENDAS"
            this.estadoaux = "documento_agenda"
            localStorage.setItem('estadoAux',this.estadoaux)
            localStorage.setItem('estado',this.estado)
            this.busquedaSevice.getData(this.estadoaux).subscribe(xd =>{
                this.busquedas = xd;
                this.busquedas.forEach(ad => {
                    this.busquedaSevice.getDocumento(ad.documento_id).subscribe( xd => {
                        ad = Object.assign(ad,{estadoAuxiliar:''})
                        if(xd['data']['documento']['disposicion']===1)
                        {
                            ad['estadoAuxiliar']=true
                        }
                        else{
                            ad['estadoAuxiliar']=false
                        }
                    })
                }
                )
                this.loading = false;
            })
        }},

    ];

  }

  clear(table: Table) {
    table.clear();
}

}
