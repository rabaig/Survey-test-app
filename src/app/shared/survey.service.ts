import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attributes } from '../attributes.model';

@Injectable()
export class SurveyService {

  resultFile: any;
  public attributesArray: Attributes[] = [];
  
  public qns: Attributes[] = [];
  seconds: number = 0;
  timer: any;
  qnProgress: number = 0;
  filePath = '/assets/CSV_Files/GOC_round1__CSV_File.csv';

  constructor(private httpClient: HttpClient) {}

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getResultantFile() {
    this.resultFile = this.httpClient.get(this.filePath, {responseType: 'text'});
    return this.resultFile;
  }

}
