import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  url = 'https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json';

  constructor(private http: HttpClient) {}
  getCommonData(): Observable<any> {
    return this.http.get(this.url, { headers: { Accept: 'application/json' } });
  }
  ngOnInit() { 
    console.log('ngOnInit')
  }
}

