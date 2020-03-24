import { HttpClient } from '@angular/common/http';
import { RootObject } from './alpha2code.interface'
import { Injectable } from '@angular/core';

@Injectable()
export class Alpha2CodeService{
    code: string;
    constructor(private http: HttpClient) {}

    getAlpha2Code(country: string){
    var url: string = 'https://restcountries.eu/rest/v2/name/'+country+'?fullText=true';
    return this.http.get<RootObject>(url);
    }
}