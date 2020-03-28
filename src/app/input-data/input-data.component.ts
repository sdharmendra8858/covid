import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../shared/data-transfer.service';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
  }

  // onSubmitCountry(country: string){
  //   console.log('enter');
  //   this.dataTransferService.setCountry(country);
  // }

}
