import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { DataTransferService } from './shared/data-transfer.service';
import { Covid } from './covid.interface';

@Injectable()
export class CovidDataService implements OnInit{
    country: string;
    url: string;
    constructor(private http: HttpClient, private dataTransferService: DataTransferService) {}

    ngOnInit(){
        this.country = this.dataTransferService.getCountry();
    }

    getCovidData(){
        this.country = this.dataTransferService.getCountry();
        this.url = "https://covid-193.p.rapidapi.com/statistics?country=" + this.country;
        return this.http.get<Covid>(this.url, {
            headers: new HttpHeaders({
                'content-type': 'application/json; charset=utf-8',
                'X-RapidAPI-Key' : '20ff524c52msh9b813b8d445a645p14a5bcjsnc51e6a48d647'
            })
        });
    }

    getHistoricalData(){
        this.country = this.dataTransferService.getCountry();
        this.url = "https://covid-193.p.rapidapi.com/history?country=" + this.country;
        return this.http.get<Covid>(this.url, {
            headers: new HttpHeaders({
                'content-type': 'application/json; charset=utf-8',
                'X-RapidAPI-Key' : '20ff524c52msh9b813b8d445a645p14a5bcjsnc51e6a48d647'
            })
        });
    }
}