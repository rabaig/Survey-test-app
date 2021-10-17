import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../shared/survey.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  resultScore: number = 0;

  constructor(public surveyService: SurveyService, private router: Router) { }

  ngOnInit() {
    this.resultScore = 0;
    this.surveyService.qns.forEach(item => {
      if (item.answer === 0) {
        this.resultScore+= 3;
      } else if(item.answer === 1) {
        this.resultScore+= 5;
      } else {
        this.resultScore+= 10;
      }
    });
  }

  get getNameOfParticipant() {
    return localStorage.getItem('Participant');
  }

  takeMeToSurveyPage() {
    this.router.navigate(['/survey']);
    this.resultScore = 0;
  }

  takeMeToRegisterPage() {
    localStorage.clear();
    this.router.navigate(['/register']);
  }

  get getGradeBasedOnScore() {
    if (this.resultScore < 40) {
      return 'C';
    } else if (this.resultScore < 75 && this.resultScore > 40) {
      return 'B';
    } else {
      return 'A';
    }
  }
}
