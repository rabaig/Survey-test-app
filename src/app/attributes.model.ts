import { Options } from "./options.model";

export class Attributes {
    question: String;
    options: Options[];
    answer?: number;
    QnID?: String;
    constructor(question: String, options: Options[], answer?: number, QnID?: String) {
      this.question = question;
      this.options = options;
      this.answer = answer;
      this.QnID = QnID;
    }
  }