import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { HomeComponent } from './componentes/home/home.component';
import { CaptchaComponent } from './componentes/captcha/captcha.component';
import { LoginComponent } from './componentes/login/login.component';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MozoComponent } from './componentes/mozo/mozo.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './componentes/menu/menu.component';
import { CardMenuComponent } from './componentes/card-menu/card-menu.component';
import { ListaDeComidasComponent } from './componentes/lista-de-comidas/lista-de-comidas.component';
import { GalleriaModule } from 'primeng/galleria';
import {SplitButtonModule} from 'primeng/splitbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componentes/header/header.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CocineroComponent } from './componentes/cocinero/cocinero.component';
import { BartenderComponent } from './componentes/bartender/bartender.component';
import { CerveceroComponent } from './componentes/cervecero/cervecero.component';
import {PickListModule} from 'primeng/picklist';
import {SliderModule} from 'primeng/slider';
import { DialogMenuDetalladoComponent } from './componentes/dialog-menu-detallado/dialog-menu-detallado.component';
import {GMapModule} from 'primeng/gmap';
import { GoogleMapsComponent } from './componentes/google-maps/google-maps.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { DialogDetalleDeOrdenComponent } from './componentes/dialog-detalle-de-orden/dialog-detalle-de-orden.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TablaOrdenPedidoComponent } from './componentes/tabla-orden-pedido/tabla-orden-pedido.component';;
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { DialogConfirmarComponent } from './componentes/dialog-confirmar/dialog-confirmar.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { HighlightDirective } from './directivas/highlight.directive';
import { SeleccionDeMesaComponent } from './componentes/seleccion-de-mesa/seleccion-de-mesa.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    MozoComponent,
    MenuComponent,
    CardMenuComponent,
    ListaDeComidasComponent,
    HeaderComponent,
    PrincipalComponent,
    CocineroComponent,
    BartenderComponent,
    CerveceroComponent,
    DialogMenuDetalladoComponent,
    GoogleMapsComponent,
    FooterComponent,
    DialogDetalleDeOrdenComponent,
    TablaOrdenPedidoComponent,
    DialogConfirmarComponent,
    CaptchaComponent,
    HighlightDirective,
    SeleccionDeMesaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GalleriaModule,
    SplitButtonModule,
    PickListModule,
    SliderModule,
    GMapModule,
    InputSwitchModule,
    ConfirmDialogModule,
    RadioButtonModule,
  ],
  providers: [FormBuilder,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
