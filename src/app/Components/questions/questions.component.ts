import { Component, OnInit } from '@angular/core';
import { IQuestion } from 'src/app/interfaces/iquestion';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {


  QuestionList:IQuestion[];

  question;


  constructor(private service:SharedService) { }

  ngOnInit(): void {


    this.refreshQuestionList();

    this.question = {
      questions: '',
      answer: 'في انتظار الرد',
      status: 1
    }


  }

  refreshQuestionList(){
    this.service.getQuestionList().subscribe(data=>{
      this.QuestionList=data;
    });
  }

  sendQuestion() {
     this.service.addQuestion(this.question).subscribe(
       response => {
         alert(' لقد تم ارسال سؤالك')
        //  document.getElementById("sentquest").nodeValue=" ";
       },
       error => console.log('error', error)
       );

  }


}
