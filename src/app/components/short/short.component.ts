import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

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

  
  constructor(private apiService: CommonService) {}

  ngOnInit(): void {
    this.apiService.getCommonData().subscribe(data => {
      this.calculateLoansByMonth(data);
      this.calculateAverageAmount(data);
      this.calculateTotalSum(data);
      // this.calculateTotalInterest(data);
      this.calculateTotalReturnedLoans(data);
    });
  }

    private calculateLoansByMonth(data: any[]): void {
    this.totalLoans = data.length;
    }
  
  private calculateAverageAmount(data: any[]): void {
    const sum = data.reduce((acc, loan) => acc + loan.body, 0);
    this.averageAmount = sum / data.length;
  }
  private calculateTotalSum(data: any[]): void {
    this.totalSum = data.reduce((acc, loan) => acc + loan.body, 0);
  }
  // private calculateTotalInterest(data: any[]): void {
  //   this.totalInterest = data.reduce((total, loan) => total + loan.percent, 0);
  // }
    private calculateTotalReturnedLoans(data: any[]): void {
    this.totalReturnedLoans = data.filter(loan => loan.actual_return_date !== null).length;
  }

}