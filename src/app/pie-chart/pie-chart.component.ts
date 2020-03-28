import { Component, OnChanges, AfterContentInit, DoCheck, AfterContentChecked, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import { CovidDataService } from '../covidData.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges{
  death: number;
  critical: number;
  recovered: number;
  active: number;
  subscribedData;

  constructor( private covidDataService: CovidDataService) {}

  ngOnInit(){
    this.subscribedData =  this.covidDataService.getCovidData()
      .subscribe(data => {
        this.active = data.response[0].cases.active;
        this.critical = data.response[0].cases.critical;
        this.recovered = data.response[0].cases.recovered;
        this.death = data.response[0].deaths.total;

        console.log(this.active);

        let chart = am4core.create("chartdiv", am4charts.PieChart);
    
        chart.data = [{
          "label": "Active",
          "numbers": this.active,
          "color": am4core.color("#FAC42F")
        }, {
          "label": "Critical",
          "numbers": this.critical,
          "color": am4core.color("#EA7773")
        }, {
          "label": "Recovered",
          "numbers": this.recovered,
          "color": am4core.color("#2ecc72")
        }, {
          "label": "Deaths",
          "numbers": this.death,
          "color": am4core.color("#B83227")
        }]

        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;
        chart.legend = new am4charts.Legend();
        let pieSeries = chart.series.push(new am4charts.PieSeries());

        pieSeries.dataFields.value = "numbers";
        pieSeries.dataFields.category = "label";
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.slices.template.propertyFields.fill = "color";
      });
  }

  ngOnChanges(){
    this.subscribedData.unsubscribe();
  }

}
