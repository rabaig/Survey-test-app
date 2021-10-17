import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attributes } from '../attributes.model';
import { Options } from '../options.model';
import { SurveyService } from '../shared/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  resultArray: Attributes[] = [];
  csvToRowArray: any;
  outputfile: any;
  public isLoading = true;
  options: Options[];

  constructor(public surveyService: SurveyService, private router: Router) { }

  ngOnInit() {
    this.surveyService.seconds = 0;
    this.surveyService.qnProgress = 0;
    this.surveyService.qns = [];
    this.isLoading = true;

    this.surveyService.getResultantFile().subscribe((file: any) => {
      this.csvToRowArray = file.split("\n");
      for (let index = 0; index < this.csvToRowArray.length; index++) {
        const row = this.csvToRowArray[index].split(/\"+\,+\"/);
        this.options = [row[1], row[2], row[3]];
        this.resultArray.push(new Attributes(row[0], this.options));
      }
      this.isLoading = false;
      for (let i = 0; i < 10; i++) {
        const rand = this.resultArray[Math.floor(Math.random() * this.resultArray.length)];
        let sameQuestionOccurs = false;
        if (rand.question) {
          // validation: duplicate question shouldn't come.
          for (let j = 0; j < this.surveyService.qns.length; j++) {
            if (rand.question === this.surveyService.qns[j].question) {
              sameQuestionOccurs = true;
              break;
            }
          }
          // If duplicate question occurs, skip to next iteration
          if (sameQuestionOccurs) {
            i--;
            continue;
          } else {
            this.surveyService.qns.push(rand);
          }

        } else {
          i--;
          continue;
        }
      }
    }
    );
    this.startTimer();
  }

  startTimer() {
    this.surveyService.timer = setInterval(() => {
      this.surveyService.seconds++;
    }, 1000);
  }

  get hasQuestionAndOptions() {
    const questionAndOptionsArray = this.resultArray[this.surveyService.qnProgress];
    return !!questionAndOptionsArray.question;
  }

  answer(choice: number) {
    this.surveyService.qns[this.surveyService.qnProgress].answer = choice;
    this.surveyService.qnProgress++;
    if (this.surveyService.qnProgress == 10) {
      clearInterval(this.surveyService.timer);
      this.router.navigate(['/result']);
    }
  }
}
