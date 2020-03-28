import { Injectable } from '@angular/core';

import { Alpha2CodeService } from './alpha2code.service';

@Injectable()
export class DataTransferService {
    country: string;

    constructor(private alpa2CodeService: Alpha2CodeService){}
    
    setCountry(country: string){
        this.country = country;
    }

    getCountry(){
        return this.country;
    }

    getCountryCode(){
        return this.alpa2CodeService.getAlpha2Code(this.country);
    }
}