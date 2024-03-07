import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonService } from '../../common.service';
import { NgFor } from '@angular/common';

interface CommonDataItem {
  actual_return_date: string;
  body: number;
  id: number;
  issuance_date: string;
  percent: number;
  return_date: string;
  user: string;
}
@Component({
  selector: 'app-common',
  standalone: true,
  imports: [NgFor],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css',
})
  
export class CommonComponent implements OnInit {
  commonData: CommonDataItem[] = [];
  // 
  filteredData: CommonDataItem[] = [];
  // 
  
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private commonService: CommonService, public element: ElementRef) { }  

  ngOnInit() {        

    this.fetchCommonData();
  }
  ngAfterViewInit() {
    var div = this.element.nativeElement.querySelectorAll('input');

    div[0].click()
    console.log(div, 'ddd')
  }
fetchCommonData(): void {
  this.commonService.getCommonData().subscribe((data: any) => {
    console.log(data);
    this.commonData = data;
    // 
    this.filteredData = data;
    // 
  });
}


  filterData(event: any): void {
  // this.filteredData = this.commonData.filter(item => this.filterItem(item) && this.filterActual(item));
   this.filteredData = this.commonData.filter(item => this.filterItem(item));
  //  this.filteredData = this.filteredData.filter(item => this.filterActual(item));
  }



onStartDateChange(event: any) {
  this.startDate = new Date(event.target.value);
}

onEndDateChange(event: any) {
  this.endDate = new Date(event.target.value);
}

 filterItem(item: CommonDataItem): boolean {
    const issuanceDate = new Date(item.issuance_date);

    if (this.endDate && this.startDate) {
      return issuanceDate >= this.startDate && issuanceDate <= this.endDate;
    }

    return true;
  } 


  filterActual(item: CommonDataItem): boolean {
  const actualDate = new Date(item.actual_return_date);

  if (this.endDate && this.startDate) {
    return actualDate >= this.startDate && actualDate <= this.endDate;
  }

  return true;
}

  
}
