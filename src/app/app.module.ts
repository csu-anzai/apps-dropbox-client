import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { MatInputModule, MatGridListModule} from '@angular/material';
import { MatIconModule, MatProgressBarModule,MatToolbarModule} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent
  ],
  imports: [
    MatInputModule,
    HttpClientModule,  
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
