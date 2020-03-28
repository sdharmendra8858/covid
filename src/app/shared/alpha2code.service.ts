import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RootObject } from './alpha2code.interface'

@Injectable()
export class Alpha2CodeService{
    code: string;
    constructor(private http: HttpClient) {}

    getAlpha2Code(country: string){
        var url: string = 'https://restcountries.eu/rest/v2/name/'+country+'?fullText=true';
        this.http.get<RootObject>(url)
            .subscribe( response => {
                this.code = response[0].alpha2Code;
            });
        return this.code;
    }
}