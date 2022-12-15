import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { query } from '@angular/animations';

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.component.html',
  styleUrls: ['./pedido-info.component.scss'],
})
export class PedidoInfoComponent implements OnInit {

    id: string;
    firma: string;
    prioridades : any;
    selected: any;
    selectedAgent: any;
    agentes: any;
    solicitud: any;
    documento: any;
    pedidoForm: any;
    test:any;
    asunto:any;
    pedido:any;
    confirmar:boolean = false;
    usuario:FormGroup;
    navi: boolean = false;

  constructor(private busquedaSevice: BusquedaService, private route: ActivatedRoute, private location: Location, private router: Router) {


    if(this.router.getCurrentNavigation().extras.state){
        this.navi = true
    }

    this.id = this.route.snapshot.paramMap.get('id');
    this.firma = this.route.snapshot.paramMap.get('firma');
    console.log(this.firma)
    this.prioridades = [
        'Alta', 'Media', 'Baja'

    ];
    this.selected = 'Media'

    this.busquedaSevice.getDocumento(this.id).subscribe(xd =>{
        if(this.firma === '1'){
            this.solicitud = 'SOLICITUD '+xd['data']['documento']['codigo']
        }
        if(this.firma === '2'){
            this.solicitud = 'RESPUESTA SOLICITUD '+xd['data']['documento']['codigo']
        }

    })

    if( this.firma === "1")
   {
        this.agentes = [
            'Tte. Carla Tezza'
        ];
        this.selectedAgent = 'Tte. Carla Tezza'
        this.usuario = new FormGroup({
        para:new FormControl(),
        pedido:new FormControl(null,[Validators.required]),
        prioridad:new FormControl(),
        asunto:new FormControl(null,[Validators.required]),
        de:new FormControl('Co. Juan Díaz'),
        firma:new FormControl(this.route.snapshot.paramMap.get('firma')),
        documento_id:new FormControl(this.route.snapshot.paramMap.get('id'))

       })
   }
   if( this.firma === "2")
   {
        this.agentes = [
            'Co. Juan Díaz'
        ];
        this.selectedAgent = 'Co. Juan Díaz'
        this.usuario = new FormGroup({
        para:new FormControl(),
        pedido:new FormControl(null,[Validators.required]),
        prioridad:new FormControl(),
        asunto:new FormControl(null,[Validators.required]),
        de:new FormControl('Tte. Carla Tezza'),
        firma:new FormControl(this.route.snapshot.paramMap.get('firma')),
        documento_id:new FormControl(this.route.snapshot.paramMap.get('id'))

       })
   }
   }

  ngOnInit(): void {
    console.log(this.usuario)
    }

save(){

    this.confirmar = true;
    if (this.usuario.valid)
    {
        this.busquedaSevice.savePedido('pedido',this.usuario.value).subscribe()

        if(this.firma === '1'){
            this.router.navigate(['bandeja',this.id,1], {state:{id:1}});
        }
        if(this.firma === '2'){
            this.router.navigate(['bandeja',this.id,2], {state:{id:1}});
        }

    }
}

}
