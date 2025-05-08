import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { FuncionamientoComponent } from './funcionamiento/funcionamiento.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PrendaListComponent } from './prenda-list/prenda-list.component';
import { PrendaCreateComponent } from './prenda-create/prenda-create.component';
import { OutfitListComponent } from './outfit-list/outfit-list.component';
import { ClosetsListComponent } from './closets-list/closets-list.component';
import { ClosetComponent } from './closet/closet.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PrendaEditComponent } from './prenda-edit/prenda-edit.component';
import { ClosetListFilterPipe } from './pipes/closet-list-filter.pipe';
import { OutfitListFilterPipe } from './pipes/outfit-list-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CategoriaFilterPipe } from './pipes/categoria-filter.pipe';
import { TemporadaFilterPipe } from './pipes/temporada-filter.pipe';
import { EstiloFilterPipe } from './pipes/estilo-filter.pipe';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarioComponent } from './calendario/calendario.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    InicioComponent,
    FuncionamientoComponent,
    WelcomeComponent,
    PrendaListComponent,
    PrendaCreateComponent,
    OutfitListComponent,
    ClosetsListComponent,
    ClosetComponent,
    LoginComponent,
    RegistroComponent,
    PrendaEditComponent,
    ClosetListFilterPipe,
    OutfitListFilterPipe,
    ColorFilterPipe,
    CategoriaFilterPipe,
    TemporadaFilterPipe,
    EstiloFilterPipe,
    CalendarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
