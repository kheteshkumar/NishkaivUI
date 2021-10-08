import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submission-success',
  templateUrl: './submission-success.component.html',
  styleUrls: ['./submission-success.component.scss']
})
export class SubmissionSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  transactionStatus;
  routeParameter: any;
  ngOnInit() {
    this.routeParameter = this.route.params.subscribe(params => {
      //console.log("params "+params)
      if(params){
        this.transactionStatus = params.status;
      }
    });
  }

}
