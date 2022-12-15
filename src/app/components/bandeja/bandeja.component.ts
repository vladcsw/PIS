import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.scss'],
  providers: [MessageService]
})
export class BandejaComponent implements OnInit,  AfterViewChecked{

    id:any;
    msg:any;
    aux:any;
    firma:any;
    @ViewChild('divx') myDiv: any;
    r:number = 0;
  constructor(private busquedaService: BusquedaService, private route: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService, private messageService: MessageService) {

    if (this.router.getCurrentNavigation().extras.state){
        setTimeout(() => {
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Solicitud Enviada', life: 3000});

    });

    }

    //'analista/docInteligencia/:id'
    this.id = this.route.snapshot.paramMap.get('id');
    this.firma = this.route.snapshot.paramMap.get('firma');

    if(this.firma === '2')
    {
        this.breadcrumbService.setItems([
            {label: 'Agente', routerLink:['/agente/docsEnv']},
            {label: 'Solicitudes', routerLink:['/solicitudes']},
        ]);
    }
    if(this.firma === '1')
    {
        this.breadcrumbService.setItems([
            {label: 'Analista', routerLink:['/analista/docRecibidos']},
            {label: 'Documento', routerLink:['/analista/docInteligencia',this.route.snapshot.paramMap.get('id')]},
        ]);
    }

    console.log(this.firma)
   }

    ngAfterViewChecked(): void {
        if (this.r < 5) {
            this.get()
        }

    }


  ngOnInit(): void {
    this.busquedaService.getPedido(this.id).subscribe(xd =>{
        this.msg = xd;
        this.aux = this.msg[this.msg.length-1]
    })


  }

  solicitud(){
    this.router.navigate(['/analista/pedidoInf',this.id, 1],{state:{id:1}});


  }

  get(){
    this.myDiv.nativeElement.scrollIntoView()
    this.r=this.r+1
  }


}
