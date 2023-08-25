import { Component, OnInit } from '@angular/core';
import { Model } from "survey-core";

import * as surveyJson from "../assets/survey.json";
import { SurveyJSService } from './services/survey-js.service';
// const SURVEY_ID = 1;

// const surveyJson = {
//   elements: [{
//     name: "FirstName",
//     title: "Enter your first name:",
//     type: "text"
//   }, {
//     name: "LastName",
//     title: "Enter your last name:",
//     type: "text"
//   }]
// };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My First Survey';
  surveyModel: Model;
  alertResults (sender) {
    const results = JSON.stringify(sender.data);
    alert(results);
    console.log(results);
    // saveSurveyResults(
    //   "https://your-web-service.com/" + SURVEY_ID,
    //   sender.data
    // )
  }

  constructor(private surveyJSService: SurveyJSService) { }

  ngOnInit() {   
    this.getSurveyJson(); 
  }

  getSurveyJson() {
    this.surveyJSService.getSurveyJson().subscribe((resp: any) => {
      console.log(resp);
      const today: Date = new Date();
      const todayDateString: string = today.toISOString().split('T')[0];
      for (let page of resp.pages) {
        const objListFound = page.elements.filter(p => p.name.startsWith("today"));
        if (objListFound) {
          objListFound.forEach(i => i.max = todayDateString)
        }
      }
      const survey = new Model(resp);
      survey.onComplete.add(this.alertResults);
      this.surveyModel = survey;
    }, (err) => {

    }, () => {

    });
  }
}

// function saveSurveyResults(url, json) {
//   const request = new XMLHttpRequest();
//   request.open('POST', url);
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   request.addEventListener('load', () => {
//     // Handle "load"
//   });
//   request.addEventListener('error', () => {
//     // Handle "error"
//   });
//   request.send(JSON.stringify(json));
// }