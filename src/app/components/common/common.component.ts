import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonService } from '../../common.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

interface CommonDataItem {
  actual_return_date: string;
  body: number;
  id: number;
  issuance_date: string;
  percent: number;
  return_date: string;
  user: string;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}
@Component({
  selector: 'app-common',
  standalone: true,
  imports: [NgFor, FormsModule, NgxDaterangepickerMd],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css',
})
  
export class CommonComponent implements OnInit {
  commonData: CommonDataItem[] = [];
  finalData: CommonDataItem[] = [];
  issuanceDatePerioud?: DateRange;
  actualReturnDatePerioud?: DateRange;
  returnDatePerriod: boolean = false;

  constructor(private commonService: CommonService, public element: ElementRef) { }  

  ngOnInit() {        
    this.fetchCommonData();
  }
  
  fetchCommonData(): void {
    this.commonService.getCommonData().subscribe((data: any) => {
    this.commonData = data;
    this.filteredData()
    });
  }
 
  onChangeIssuanceDatePerioud(event: any) {
    this.issuanceDatePerioud = event;
    this.filteredData();
  }

  onChangeActualReturnDatePerioud(event: any) {
    this.actualReturnDatePerioud = event;
    this.filteredData();
  }

  onApplyOverdueLoan() {
    this.returnDatePerriod = !this.returnDatePerriod;
    this.filteredData();
  }

  clearFillters() {
    this.actualReturnDatePerioud = undefined;
    this.issuanceDatePerioud = undefined;
    this.returnDatePerriod = false;
    this.filteredData();
  }

  filteredData() {
    this.finalData = this.commonData.filter((item) => {
      const issuanceDate = new Date(item.issuance_date);
      if (this.issuanceDatePerioud?.endDate && this.issuanceDatePerioud.startDate) {
    
        return issuanceDate >= this.issuanceDatePerioud.startDate && issuanceDate <= this.issuanceDatePerioud.endDate;
        
      }
      return true;
    }).filter((item) => {
      const actualDate = new Date(item.actual_return_date);
      if (this.actualReturnDatePerioud?.endDate && this.actualReturnDatePerioud.startDate) {
    
        return actualDate >= this.actualReturnDatePerioud.startDate && actualDate <= this.actualReturnDatePerioud.endDate;
    
      }
      return true;
    })
      .filter((item) => {
        if (this.returnDatePerriod) {
          const returnDate = new Date(item.return_date)
          const today = new Date();
          return !item.actual_return_date || new Date(item.actual_return_date) > returnDate || returnDate > today;
        }
        
        return true;
    })

  }
  
}
