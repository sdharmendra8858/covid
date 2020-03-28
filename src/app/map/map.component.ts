import { Component, NgZone, OnDestroy } from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import * as am4maps from "@amcharts/amcharts4/maps";

import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import { DataTransferService } from '../shared/data-transfer.service';

am4core.useTheme(am4themes_animated);

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnDestroy {
  country: string;

  ngOnInit(): void {
  }

  
  private chart;

  constructor(private zone: NgZone, 
              private dataTransferService: DataTransferService
              ) {}
           
  getCode(): string {
    console.log(this.dataTransferService.getCountryCode());
    return this.dataTransferService.getCountryCode();
    // console.log(this.country);
    // console.log(this.alpha2CodeService.getAlpha2Code(this.country));
    // return this.alpha2CodeService.getAlpha2Code(this.country);
  }
  
  ngAfterViewInit() {
    let code: string = this.getCode();

    this.zone.runOutsideAngular(() => {
      /**
     * ---------------------------------------
     * This demo was created using amCharts 4.
     *
     * For more information visit:
     * https://www.amcharts.com/
     *
     * Documentation is available at:
     * https://www.amcharts.com/docs/v4/
     * ---------------------------------------
     */

      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_worldLow;

      // Set projection
      chart.projection = new am4maps.projections.Miller();

      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = am4core.color("#cccccc");

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#aaaaaa");

      // code = this.getCode()
      console.log(code);

      polygonSeries.include = ["IN"];
      // polygonSeries.include = ["PT", "ES", "FR", "DE", "BE", "NL", "IT", "AT", "GB", "IE", "CH", "LU"];
  
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
