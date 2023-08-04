import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyJSService {

  constructor(
    private http: HttpClient
  ) { }

  getSurveyJson() {
    // return this.http.get('http://apscredity02dev.icc.crifnet.com:8085/surveyJson');
    // return this.http.get('http://localhost:8085/surveyJson');
    return this.http.get('https://crifsurvey.free.beeceptor.com/surveyJson');
  }
}
