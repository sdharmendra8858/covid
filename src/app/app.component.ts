import { Component, OnInit} from '@angular/core';
import { Alpha2CodeService } from './shared/alpha2code.service';
import { DataTransferService } from './shared/data-transfer.service';
import { CovidDataService } from './covidData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  showCountry = false;
  lastUpdated: string = "";
  fetchedCountry: string;
  fetchedProvince: string;
  error: string;
  title = 'covid';
  url: string;

  historicaldata: boolean = false;

  codeForFlag: string;

  //date
  hour: number;
  minute: number;
  second: number;
  date: number;
  month: string;
  year: number;

  //recived data
  active: number;
  recovered: number;
  total: number;

  death: number;

  constructor(private covidDataService: CovidDataService,
              private dataTransferService: DataTransferService,
              private alpha2CodeService: Alpha2CodeService){}

  ngOnInit(){
    this.getResponse();
  }

  getDate(lastChecked){
    lastChecked = new Date(lastChecked);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.date = lastChecked.getDate();
    this.month = months[lastChecked.getMonth()];
    this.year = lastChecked.getFullYear();
    this.hour = lastChecked.getHours();
    this.minute = lastChecked.getMinutes();
    this.second = lastChecked.getSeconds();

    return this.date + ' ' + this.month + ',' + this.year + ' | ' + this.hour + ':' + this.minute + ':' + this.second;
  }

  UpperTransform(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

  onSubmitCountry(country: string){

    this.dataTransferService.setCountry(country);
    this.historicaldata = false;
    this.showCountry = false;
    this.error = '';
    this.getResponse();
    this.lastUpdated = "Loading...";
    this.showCountry = true;
  }

  getResponse(){
    this.covidDataService.getCovidData()
    .subscribe( posts => {
      if(!posts.results){
        this.error = "No Data Found!";
      }else{
        let responseData = posts.response[0];
        this.lastUpdated = this.getDate(responseData.time);
        this.fetchedCountry = responseData.country;
        // console.log(responseData);

        //displaying data
        this.active = responseData.cases.active;
        this.recovered = responseData.cases.recovered;
        this.total = responseData.cases.total;

        this.death = responseData.deaths.total;
        if((this.fetchedCountry).toLowerCase() !== 'all'){
          this.alpha2CodeService.getAlpha2Code(this.fetchedCountry)
            .subscribe(response => {
              this.codeForFlag = response[0].alpha2Code;
            }, error => {
              this.codeForFlag = this.fetchedCountry.slice(0,2);
            });
        }else{
          this.fetchedCountry = "World Data";
          this.codeForFlag = "";
        }
      }
    }, error => {
      this.error = error.message;
    } );
  }

  getHistoricalData(){
    this.historicaldata = this.historicaldata ? false : true;
  }
}
