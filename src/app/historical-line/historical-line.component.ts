import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { CovidDataService } from '../covidData.service';
import { CovidData } from '../covid.interface';

@Component({
  selector: 'app-historical-line',
  templateUrl: './historical-line.component.html',
  styleUrls: ['./historical-line.component.css']
})
export class HistoricalLineComponent implements OnInit {
  record: CovidData;
  pushingRecord: {};

  constructor( private covidDataService: CovidDataService) { }

  ngOnInit(): void {
    this.covidDataService.getHistoricalData()
      .subscribe(data => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.data = [];
        for( this.record of data.response ){
          this.pushingRecord = {
            "Date": this.record.day,
            "Cases": this.record.cases.total
          };
          chart.data.unshift(this.pushingRecord);
        }

        chart.legend = new am4charts.Legend();

          let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "Date";
          categoryAxis.title.text = "Date";
      
          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.title.text = "Total Cases";
      
          let series = chart.series.push(new am4charts.LineSeries());
          series.name = "Cases";
          series.strokeWidth = 2;
          series.bullets.push(new am4charts.CircleBullet());
          series.connect = false;
          series.dataFields.valueY = "Cases";
          series.dataFields.categoryX = "Date"; 
      })
  }


}
