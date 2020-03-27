import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { HeaderComponent } from './components/header/header.component';

import { BnaService } from './services/bna.service';

@NgModule({
    declarations: [
        AppComponent,
        ProductRowComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [BnaService],
    bootstrap: [AppComponent]
})
export class AppModule { }
