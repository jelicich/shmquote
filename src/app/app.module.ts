import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { HeaderComponent } from './components/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { BnaService } from './services/bna.service';
import { FileService } from './services/file.service';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { PdfExporterComponent } from './components/pdf-exporter/pdf-exporter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [
        AppComponent,
        ProductRowComponent,
        HeaderComponent,
        FileManagerComponent,
        PdfExporterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCheckboxModule
    ],
    providers: [BnaService, FileService],
    bootstrap: [AppComponent]
})
export class AppModule { }
