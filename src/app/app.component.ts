import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import { getTestBed } from '@angular/core/testing';

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
  lastChecked: Date;
  lastCheckedDate: string;
  hour: number;
  minute: number;
  second: number;
  date: number;
  month: string;
  year: number;
  confirmed: number;
  deaths: number;
  recovered: number;

  constructor(private http: HttpClient){}

  ngOnInit(){
  }

  getDate(lastChecked){
    lastChecked = new Date(lastChecked);
    // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(lastChecked.getSeconds());
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

  onSubmitCountry(country: string){
    this.showCountry = false;
    this.error = '';
    country = country[0].toUpperCase() +  
    country.slice(1);
    this.url = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=' + country;
    console.log(country);
    this.getResponse(this.url);
    this.showCountry = true;
  }

  getResponse(url: string){
    this.http.get(url, {
      headers: new HttpHeaders({ 
        'content-type': 'application/json; charset=utf-8',
        'RapidAPIproject': 'default-application_4278873',
        'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
        'X-RapidAPI-Key' : '20ff524c52msh9b813b8d445a645p14a5bcjsnc51e6a48d647'
     })
    }).subscribe( posts => {
      console.log(posts);
      if(posts.statusCode !== 200 || posts.message !== 'OK'){
        this.error = posts.message;
      }else{
        let responseData = posts.data.covid19Stats[0];
        this.lastCheckedDate = this.getDate(posts.data.lastChecked);
        this.fetchedProvince = responseData.province;
        this.fetchedCountry = responseData.country;
        this.lastUpdated = this.getDate(responseData.lastUpdate);

        //displaying data
        console.log(responseData.confirmed)
        this.confirmed = responseData.confirmed;
        this.deaths = responseData.deaths;
        this.recovered = responseData.recovered;
      }
    } );
  }
}
