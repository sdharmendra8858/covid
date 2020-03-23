import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Covid } from './covid.interface';

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

  //date
  lastChecked: Date;
  lastCheckedDate: string;
  hour: number;
  minute: number;
  second: number;
  date: number;
  month: string;
  year: number;

  //recived data
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

  titleCase(str) {
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
    country = this.titleCase(country);
    // this.url = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=' + country;
    this.url = 'https://'+ process.env.RAPID_API_HOST +'/v1/stats?country=' + country;
    console.log(country);
    this.getResponse(this.url);
    this.showCountry = true;
  }

  getResponse(url: string){
    this.http.get<Covid>(url, {
      headers: new HttpHeaders({ 
        'content-type': 'application/json; charset=utf-8',
        'RapidAPIproject': process.env.API_PROJECT,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.RAPID_API_KEY
        // 'RapidAPIproject': 'default-application_4278873',
        // 'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
        // 'X-RapidAPI-Key' : '20ff524c52msh9b813b8d445a645p14a5bcjsnc51e6a48d647'
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
