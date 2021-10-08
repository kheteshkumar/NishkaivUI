import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submission-failed',
  templateUrl: './submission-failed.component.html',
  styleUrls: ['./submission-failed.component.scss']
})
export class SubmissionFailedComponent implements OnInit {
  transactionStatus;
  routeParameter: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParameter = this.route.params.subscribe(params => {
      //console.log("params "+params)
      if(params){
        this.transactionStatus = params.status;
      }
    });
  }

}
