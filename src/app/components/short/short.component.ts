import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

import { DataService } from '../../data.service';
import { LoanData } from '../../types/data';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.css']
})
export class ShortComponent implements OnInit {
  date = new FormControl(moment());
  datePerioud = moment();
  totalLoans: number = 0;
  averageAmount: number = 0;
  totalSum: number = 0;
  totalInterest: number = 0;
  totalReturnedLoans: number = 0;
  loanData: LoanData[] = [];

  
  constructor(private apiService: DataService) {}

  ngOnInit() {
    this.apiService.getCommonData().subscribe(data => {
      this.loanData = data;
      this.applyFilter();
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
  
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.datePerioud = ctrlValue;
    this.applyFilter();
  }

  private calculateLoansByMonth(data: LoanData[]) {
    this.totalLoans = data.length;
  }
  
  private calculateAverageAmount(data: LoanData[]) {
    const sum = data.reduce((acc, loan) => acc + loan.body, 0);
    this.averageAmount = sum / data.length;
  }
  private calculateTotalSum(data: LoanData[]) {
    this.totalSum = data.reduce((acc, loan) => acc + loan.body, 0);
   
  }
  private calculateTotalPercent(data: LoanData[]) {
    this.totalInterest = data.reduce((acc, loan) => acc + loan.percent, 0);
  }
 
  private calculateTotalReturnedLoans(data: LoanData[]) {
    this.totalReturnedLoans = data.length;
  }
  
  private applyFilter() {
    const dataFilteredByIssuanceDate = this.loanData.filter((loan) => {
      const issuanceDate = moment(loan.issuance_date);
      return issuanceDate.isSame(this.datePerioud, 'year') && issuanceDate.isSame(this.datePerioud, 'month')
    })
    this.calculateLoansByMonth(dataFilteredByIssuanceDate);
    this.calculateAverageAmount(dataFilteredByIssuanceDate);
    this.calculateTotalSum(dataFilteredByIssuanceDate);
    this.calculateTotalPercent(dataFilteredByIssuanceDate);

    const dataFilteredByActualReturnDate = this.loanData.filter((loan) => {
      if (!loan.actual_return_date) {
        return false;
      }
      const actualReturnDate = moment(loan.actual_return_date);
      return actualReturnDate.isSame(this.datePerioud, 'year') && actualReturnDate.isSame(this.datePerioud, 'month')
    })

    this.calculateTotalReturnedLoans(dataFilteredByActualReturnDate);
  }

}