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
import { SplitButtonModule } from 'primeng/splitbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componentes/header/header.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CocineroComponent } from './componentes/cocinero/cocinero.component';
import { BartenderComponent } from './componentes/bartender/bartender.component';
import { CerveceroComponent } from './componentes/cervecero/cervecero.component';
import { PickListModule } from 'primeng/picklist';
import { SliderModule } from 'primeng/slider';
import { DialogMenuDetalladoComponent } from './componentes/dialog-menu-detallado/dialog-menu-detallado.component';
import { GMapModule } from 'primeng/gmap';
import { GoogleMapsComponent } from './componentes/google-maps/google-maps.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { DialogDetalleDeOrdenComponent } from './componentes/dialog-detalle-de-orden/dialog-detalle-de-orden.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TablaOrdenPedidoComponent } from './componentes/tabla-orden-pedido/tabla-orden-pedido.component';;
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogConfirmarComponent } from './componentes/dialog-confirmar/dialog-confirmar.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HighlightDirective } from './directivas/highlight.directive';
import { SeleccionDeMesaComponent } from './componentes/seleccion-de-mesa/seleccion-de-mesa.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PrepararPedidoComponent } from './componentes/preparar-pedido/preparar-pedido.component';
import { DemoraPipe } from './pipes/demora.pipe';
import { DialogInfoPedidoComponent } from './componentes/dialog-info-pedido/dialog-info-pedido.component';
import { PrecioPipe } from './pipes/precio.pipe';
import { PropinaPipe } from './pipes/propina.pipe';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChartModule } from 'primeng/chart';
import { TablaInformePedidoComponent } from './componentes/tabla-informe-pedido/tabla-informe-pedido.component';
import { FieldSetToggleComponent } from './componentes/field-set-toggle/field-set-toggle.component';
import {FieldsetModule} from 'primeng/fieldset';
import { EmojiPuntuacionPipe } from './pipes/emoji-puntuacion.pipe';
import { ColorPuntuacionPipe } from './pipes/color-puntuacion.pipe';

const primeNGModules = [
  ToastModule,
  GalleriaModule,
  PickListModule,
  SliderModule,
  GMapModule,
  InputSwitchModule,
  ConfirmDialogModule,
  RadioButtonModule,
  SidebarModule,
  DialogModule,
  RatingModule,
  InputTextareaModule,
  ChartModule,
  FieldsetModule
]
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
    SeleccionDeMesaComponent,
    PrepararPedidoComponent,
    DemoraPipe,
    DialogInfoPedidoComponent,
    PrecioPipe,
    PropinaPipe,
    TablaInformePedidoComponent,
    FieldSetToggleComponent,
    EmojiPuntuacionPipe,
    ColorPuntuacionPipe
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
    SplitButtonModule,
    RadioButtonModule,
    primeNGModules
  ],
  providers: [FormBuilder, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
