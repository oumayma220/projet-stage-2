import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { HomeComponent } from './home/home.component';
import { ForgotPswComponent } from './forgot-psw/forgot-psw.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotLoggedInGuard } from './not-logged-in.guard';
import { AuthGuard } from './auth.guard';
import { AdminauthGuard } from './adminauth.guard';
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

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[NotLoggedInGuard]},
  {path:"home",component:HomeComponent,canActivate:[NotLoggedInGuard]},
  {path:"login",component:LoginComponent,canActivate:[NotLoggedInGuard]},
  {path:"registration",component:RegistrationComponent,canActivate:[NotLoggedInGuard]},
  {path:"header", component:HeaderComponent},
  {path:"adminpage",component:AdminpageComponent,canActivate:[AdminauthGuard]},
  {path:"loginsuccess",component:LoginsuccessComponent,canActivate:[AuthGuard]},
  {path:"admin-template",component:AdminTemplateComponent ,canActivate:[AdminauthGuard]},
  {path:"forgot-psw",component:ForgotPswComponent,canActivate:[NotLoggedInGuard]},
  {path:"reset-psw",component:ResetPasswordComponent,canActivate:[NotLoggedInGuard]},
  {path:"user",component:UserComponent,canActivate:[AdminauthGuard]},
  {path:"newuser",component:NewuserComponent,canActivate:[AdminauthGuard]},
  {path:'modifier/:id',component:ModifierComponent,canActivate:[AdminauthGuard]},
  {path:"plat",component:PlatComponent,canActivate:[AdminauthGuard]},
  {path:"addplat",component:AddplatComponent,canActivate:[AdminauthGuard]},
  {path:'modifierplat/:id',component:ModifierplatComponent,canActivate:[AdminauthGuard]},
  {path:"table",component:TableComponent,canActivate:[AdminauthGuard]},
  {path:"addtable",component:AddtableComponent,canActivate:[AdminauthGuard]},
  {path:'modifiertable/:id',component:ModifiertableComponent,canActivate:[AdminauthGuard]},
  {path:"panier",component:PanierComponent,canActivate:[AuthGuard]},
  { path: 'commande/:id', component: CommandeComponent, canActivate: [AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
