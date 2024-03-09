import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';
import { LoanData } from '../../types/data';


@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.css']
})
export class ShortComponent implements OnInit {
  totalLoans: number = 0;
  averageAmount: number = 0;
  totalSum: number = 0;
  totalInterest: number = 0;
  totalReturnedLoans: number = 0;

  
  constructor(private apiService: DataService) {}

  ngOnInit() {
    this.apiService.getCommonData().subscribe(data => {
      this.calculateLoansByMonth(data);
      this.calculateAverageAmount(data);
      this.calculateTotalSum(data);
      this.calculateTotalReturnedLoans(data);
    });
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
 
    private calculateTotalReturnedLoans(data: LoanData[]) {
    this.totalReturnedLoans = data.filter(loan => loan.actual_return_date !== null).length;
  }

}