import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '../../data.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TimePeriod } from 'ngx-daterangepicker-material/daterangepicker.component'
import dayjs from 'dayjs';

import { LoanData } from '../../types/data';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [NgFor, FormsModule, NgxDaterangepickerMd],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css',
})
  
export class CommonComponent implements OnInit {
  commonData: LoanData[] = [];
  finalData: LoanData[] = [];
  issuanceDatePerioud?: TimePeriod | null;
  actualReturnDatePerioud?: TimePeriod | null;
  returnDatePerriod: boolean = false;

  constructor(private commonService: DataService, public element: ElementRef) { }  

  ngOnInit() {        
    this.fetchCommonData();
  }
  
  fetchCommonData() {
    this.commonService.getCommonData().subscribe((data) => {
    this.commonData = data;
    this.filteredData()
    });
  }

  findDateRagne() {
    const initDateRange: TimePeriod = {
      startDate: dayjs(Math.min(...this.commonData.map(loan => +dayjs(loan.issuance_date)))),
      endDate: dayjs(),
    };
    this.issuanceDatePerioud = initDateRange;
    this.actualReturnDatePerioud = initDateRange;
  }
 
  
  onChangeIssuanceDatePerioud(event: TimePeriod | null) {
    this.issuanceDatePerioud = event;
    this.filteredData();
  }

  onChangeActualReturnDatePerioud(event?: TimePeriod | null) {
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
      const issuanceDate = dayjs(item.issuance_date);
    
      if (this.issuanceDatePerioud?.endDate && this.issuanceDatePerioud.startDate) {
        return issuanceDate >= this.issuanceDatePerioud.startDate && issuanceDate <= this.issuanceDatePerioud.endDate;
        
      }
      return true;
    }).filter((item) => {
      const actualDate = dayjs(item.actual_return_date);
      if (this.actualReturnDatePerioud?.endDate && this.actualReturnDatePerioud.startDate) {
    
        return actualDate >= this.actualReturnDatePerioud.startDate && actualDate <= this.actualReturnDatePerioud.endDate;
    
      }
      return true;
    })
      .filter((item) => {
        if (this.returnDatePerriod) {
          const returnDate = dayjs(item.return_date);
          const today = dayjs();
          return dayjs(item.actual_return_date) > returnDate || !item.actual_return_date && returnDate < today;
        }
        
        return true;
    })

  }
  
}
