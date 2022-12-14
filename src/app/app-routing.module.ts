import { ModuloInicioComponent } from './components/modulo-inicio/modulo-inicio.component';
import {RouterModule} from '@angular/router';
import { NgModule, Component } from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {IconsComponent} from './utilities/icons.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {AppWizardComponent} from './pages/app.wizard.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { PersonaComponent } from './components/persona/persona.component';
import { LoginComponent } from './components/login/login.component';
import { DocEnviadoComponent } from './components/doc-enviado/doc-enviado.component';
import { CarpetaComponent } from './components/carpeta/carpeta.component'
import { DocumentosComponent } from './components/carpeta/documentos/documentos.component'
import { DocInteligenciaComponent } from './components/doc-inteligencia/doc-inteligencia.component';
import { CrearCarpetaComponent } from './components/crear-carpeta/crear-carpeta.component';
import { PersonaNoIdentificadaComponent } from './components/persona-no-identificada/persona-no-identificada.component';
import { VincularCarpetaComponent } from './components/vincular-carpeta/vincular-carpeta.component';
import { DocRecibidosComponent } from './components/doc-recibidos/doc-recibidos.component';
import { VistaDocComponent } from './components/vista-doc/vista-doc.component';
import { PedidoInfoComponent } from './components/pedido-info/pedido-info.component';
import { DocArchivadoComponent } from './components/doc-archivado/doc-archivado.component';
import { DocumentoInformacionComponent} from './components/documento-informacion/documento-informacion.component';
import { InmueblesComponent } from './components/documento-informacion/inmuebles/inmuebles.component';
import { AgendaComponent } from './components/documento-informacion/agenda/agenda.component';
import { ArmaComponent } from './components/documento-informacion/arma/arma.component';
import { CuentaBanComponent } from './components/documento-informacion/cuenta-ban/cuenta-ban.component';
import {EmpresasComponent } from './components/documento-informacion/empresas/empresas.component';
import { InsumoComponent } from './components/documento-informacion/insumo/insumo.component';
import { ModalidadComponent } from './components/documento-informacion/modalidad/modalidad.component';
import {  TelefonoComponent } from './components/documento-informacion/telefono/telefono.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';




@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: LoginComponent},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'persona', component: PersonaComponent},
                    {path: 'personaNoIdentificada', component: PersonaNoIdentificadaComponent},
                    {path: 'agente/docsEnv', component: DocEnviadoComponent},
                    {path: 'carpeta/carpeEnv', component: CarpetaComponent},
                    {path: 'carpeta/carpeEnv/documentos/:id', component: DocumentosComponent},
                    {path: 'analista/crearCarpeta', component: CrearCarpetaComponent},
                    {path: 'modulo', component: ModuloInicioComponent},// agrege
                    {path: 'vincularc/:id', component: VincularCarpetaComponent},//agregue
                    {path: 'analista/docInteligencia/:id',component:DocInteligenciaComponent},
                    {path: 'analista/docRecibidos', component: DocRecibidosComponent},
                    {path: 'analista/vistaDoc', component: VistaDocComponent},
                    {path: 'analista/pedidoInf', component: PedidoInfoComponent},
                    {path: 'analista/docRecib/analisis/:id', component: DocumentoInformacionComponent},
                    {path: 'analista/docRecib/analisis/inmuebles/:id', component: InmueblesComponent},
                    {path: 'analista/docRecib/analisis/empresas/:id', component: EmpresasComponent},
                    {path: 'analista/docRecib/analisis/insumos/:id', component: InsumoComponent},
                    {path: 'analista/docRecib/analisis/armas/:id', component: ArmaComponent},
                    {path: 'analista/docRecib/analisis/cuentas/:id', component: CuentaBanComponent},
                    {path: 'analista/docRecib/analisis/modalidad/:id', component: ModalidadComponent},
                    {path: 'analista/docRecib/analisis/agenda/:id', component: AgendaComponent},
                    {path: 'analista/docRecib/analisis/juridica/:id', component: DocumentoInformacionComponent},
                    {path: 'analista/docRecib/analisis/telefono/:id', component: TelefonoComponent},
                    {path: 'analista/docArchivado', component: DocArchivadoComponent},
                    {path: 'busqueda', component: BusquedaComponent},
                ]
            },
            {path: 'login', component: LoginComponent},
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},

            {path: 'wizard', component: AppWizardComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
