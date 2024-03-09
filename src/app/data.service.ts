import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanData } from './types/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json';

  constructor(private http: HttpClient) {}
  getCommonData(): Observable<LoanData[]> {
    return this.http.get<LoanData[]>(this.url, { headers: { Accept: 'application/json' } });
  }
}

