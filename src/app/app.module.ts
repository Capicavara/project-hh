import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { 
  FormsModule, 
  ReactiveFormsModule } from '@angular/forms';

//Imports
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { Tab1Component } from './pages/tab1/tab1.component';
import { Tab2Component } from './pages/tab2/tab2.component';
import { Tab3Component } from './pages/tab3/tab3.component';
import { HardcorekingComponent } from './pages/hardcoreking/hardcoreking.component';
import { TagsPipe } from './filtro/tags.pipe';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule } from '@angular/material';
import { LoginComponent } from './pages/login/login.component';
import { ConversaComponent } from './pages/conversa/conversa.component';
import { RegisterComponent } from './pages/register/register.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('602049097058522')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
],
entryComponents: [Tab1Component, Tab2Component, Tab3Component],
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    Tab1Component,
    Tab2Component,
    Tab3Component,
    HardcorekingComponent,
    TagsPipe,
    LoginComponent,
    ConversaComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    SocialLoginModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    InfiniteScrollModule,
    BrowserAnimationsModule
  ],
  providers: [
    ReactiveFormsModule,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    LoginComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
