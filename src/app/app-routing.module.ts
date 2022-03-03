import { Tab1Component } from './pages/tab1/tab1.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { HardcorekingComponent } from './pages/hardcoreking/hardcoreking.component';
import { LoginComponent } from './pages/login/login.component';
import { ConversaComponent } from './pages/conversa/conversa.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  // ANCHOR Paginas/Routes
  { path: 'home', component: HomeComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'tab1', component: Tab1Component },
  { path: 'hardcoreking', component: HardcorekingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ConversaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
