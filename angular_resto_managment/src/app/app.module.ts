import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ForgotPswComponent } from './forgot-psw/forgot-psw.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserComponent } from './user/user.component';
import { NewuserComponent } from './newuser/newuser.component';
import { ModifierComponent } from './modifier/modifier.component';
import { PlatComponent } from './plat/plat.component';
import { AddplatComponent } from './addplat/addplat.component';
import { ModifierplatComponent } from './modifierplat/modifierplat.component';
import { TableComponent } from './table/table.component';
import { AddtableComponent } from './addtable/addtable.component';
import { ModifiertableComponent } from './modifiertable/modifiertable.component';
import { PanierComponent } from './panier/panier.component';
import { CommandeComponent } from './commande/commande.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    AdminpageComponent,
    LoginsuccessComponent,
    HomeComponent,
    ForgotPswComponent,
    ResetPasswordComponent,
    UserComponent,
    NewuserComponent,
    ModifierComponent,
    PlatComponent,
    AddplatComponent,
    ModifierplatComponent,
    TableComponent,
    AddtableComponent,
    ModifiertableComponent,
    PanierComponent,
    CommandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
