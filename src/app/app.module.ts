import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Alpha2CodeService } from './shared/alpha2code.service';
import { DataTransferService } from './shared/data-transfer.service';
import { HeaderComponent } from './header/header.component';
import { CovidDataService } from './covidData.service';
import { HistoricalLineComponent } from './historical-line/historical-line.component';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import { NewsLetterItemComponent } from './news-letter/news-letter-item/news-letter-item.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HistoricalLineComponent,
    NewsLetterComponent,
    NewsLetterItemComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [Alpha2CodeService, DataTransferService, CovidDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
