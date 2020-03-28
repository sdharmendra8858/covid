import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Alpha2CodeService } from './shared/alpha2code.service';
import { MapComponent } from './map/map.component';
import { DataTransferService } from './shared/data-transfer.service';
import { HeaderComponent } from './header/header.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { CovidDataService } from './covidData.service';
import { InputDataComponent } from './input-data/input-data.component';
import { HistoricalLineComponent } from './historical-line/historical-line.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    PieChartComponent,
    InputDataComponent,
    HistoricalLineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [Alpha2CodeService, DataTransferService, CovidDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
