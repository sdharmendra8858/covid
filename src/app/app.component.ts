import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Covid } from './covid.interface';
import { Alpha2CodeService } from './alpha2code.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  showCountry = false;
  lastUpdated: string = "Loading...";
  fetchedCountry: string;
  fetchedProvince: string;
  error: string;
  title = 'covid';
  url: string;

  codeForFlag: string;

  //date
  hour: number;
  minute: number;
  second: number;
  date: number;
  month: string;
  year: number;

  //recived data
  newCases: string;
  active: number;
  critical: number;
  deaths: number;
  recovered: number;
  total: number;

  newDeaths: string;
  totalDeaths: number;

  constructor(private http: HttpClient, private alpha2CodeService: Alpha2CodeService){}

  ngOnInit(){
  }

  getDate(lastChecked){
    lastChecked = new Date(lastChecked);
    // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // console.log(lastChecked.getSeconds());
    // this.day = days[lastChecked.getDay()];
    this.date = lastChecked.getDate();
    this.month = months[lastChecked.getMonth() + 1];
    this.year = lastChecked.getFullYear();
    this.hour = lastChecked.getHours();
    this.minute = lastChecked.getMinutes();
    this.second = lastChecked.getSeconds();

    return this.date + ' ' + this.month + ',' + this.year + ' | ' + this.hour + ':' + this.minute + ':' + this.second;
    // this.lastCheckedDate = this.date + ' ' + this.month + ',' + this.year + ' | ' + this.hour + ':' + this.minute + ':' + this.second;
    // console.log(this.lastCheckedDate);
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
    this.showCountry = false;
    this.error = '';
    // country = country[0].toUpperCase() +  
    // country.slice(1);
    country = this.UpperTransform(country);
    this.url = "https://covid-193.p.rapidapi.com/statistics?country=" + country;
    // console.log(country);
    this.getResponse(this.url);
    this.showCountry = true;
  }

  getResponse(url: string){
    this.http.get<Covid>(url, {
      headers: new HttpHeaders({ 
        'content-type': 'application/json; charset=utf-8',
        // 'RapidAPIproject': 'default-application_4278873',
        // 'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
        'X-RapidAPI-Key' : '20ff524c52msh9b813b8d445a645p14a5bcjsnc51e6a48d647'
     })
    }).subscribe( posts => {
      if(!posts.results){
        this.error = "No Data Found!";
      }else{
        let responseData = posts.response[0];
        this.lastUpdated = this.getDate(responseData.time);
        this.fetchedCountry = responseData.country;
        // console.log(responseData);

        //displaying data
        this.newCases = responseData.cases.new;
        this.active = responseData.cases.active;
        this.critical = responseData.cases.critical;
        this.recovered = responseData.cases.recovered;
        this.total = responseData.cases.total;

        this.newDeaths = responseData.deaths.new || 'null';
        this.totalDeaths = responseData.deaths.total;

        this.alpha2CodeService.getAlpha2Code(this.fetchedCountry)
          .subscribe( response => {
            this.codeForFlag = response[0].alpha2Code;
          });
      }
    }, error => {
      this.error = error.message;
    } );
  }
}
