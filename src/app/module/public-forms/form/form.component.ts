import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { NgRecaptcha3Service } from 'ng-recaptcha3';
import { PublicFormsService } from 'src/app/services/public-forms.service';
import { Title } from '@angular/platform-browser';
import { LogoService } from 'src/app/services/logo.service';
import { environment } from 'src/environments/environment';
import { TransactionStatusEnum } from 'src/app/enum/transaction-status.enum';
import { TransactionStatusMapEnum } from 'src/app/enum/transaction-status-map.enum';
import { Exception } from 'src/app/exceptions/exception';

export interface Details {
  createdBy: string;
  createdDate: string;
  fields: { components: any[] };
  formDescription: string;
  formKey: string;
  formTitle: string;
  id: string;
  isActivated: number;
  isDeleted: boolean;
  modifiedBy: string;
  modifiedDate: string;
  providerId: string;
  providerLogoUrl: string;
  publicUrl: string;
  status: number;
  userType: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {
  token: any;
  formId: string;
  details: Details;

  isError = false;
  isWarning = false;
  isLoader = false;
  errorMessage = '';
  transactionResponseWaitingCount = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private publicForm: PublicFormsService,
    private titleService: Title,
    private logoService: LogoService,
    private recaptcha3: NgRecaptcha3Service
  ) { }

  ngOnInit() {
    this.isLoader = true;
    this.route.params
      .pipe(
        switchMap((res) => {
          console.log("response in switch map :: " + JSON.stringify(res));
          this.logoService.updateLogo(res.provider);
          this.logoService.updateTheme(res.provider);
          // return this.publicForm.getTokenDetails(res.token);
          return this.publicForm.getTokenDetails(res.formId);
        }),
      )
      .subscribe(
        (res: Details) => {
          this.details = res;
          console.log("this.details :: " + this.details);
          // 0 means deactivated
          this.titleService.setTitle(`HPT-Forms - ${this.details.formTitle} `);
          if (this.details.isActivated === 0) {
            this.isError = true;
            this.errorMessage = 'The form has been deactivated.';
          }
          this.isLoader = false;
        },
        (error) => {
          console.log("error :: " + JSON.stringify(error));

          this.isLoader = false;
          console.error(error);
          this.router.navigate(['/', 'not-found']);
        },
      );
    this.recaptcha3.init(environment.siteKey);
  }
  public ngOnDestroy() {
    this.recaptcha3.destroy();
  }
  onSubmit(value) {
    const payload: any = {
      formId: this.details.id,
      submission: value,
      providerId: this.details.providerId,
    };

    // generate new token
    this.recaptcha3.getToken().then(token => {
      payload.captcha = token;
      // send data with token to backend
      this.publicForm.addSubmission(payload).subscribe(
        (res: any) => {
          // 0 means deactivated
          // this.isLoader = false;
          if (res.formType === 1) {
            //res.transactionDetails.transactionStatus = TransactionStatusMapEnum[TransactionStatusEnum[res.transactionDetails.transactionStatus]];
            // console.log(res.transactionDetails.transactionStatus)
            // console.log(TransactionStatusMapEnum[TransactionStatusEnum[res.transactionDetails.transactionStatus]])
            let transactionStatus = TransactionStatusMapEnum[TransactionStatusEnum[res.transactionDetails.transactionStatus]];
            if (transactionStatus === 'Failed'
              || transactionStatus === 'Hold'
              || transactionStatus === 'Denied'
              || transactionStatus === 'Closed') {
              this.transactionResponseWaitingCount = 0;
              this.router.navigate(['/failed', transactionStatus]);
            } else if (transactionStatus === 'Authorized'
              || transactionStatus === 'Success'
              || this.transactionResponseWaitingCount === 5) {
              this.transactionResponseWaitingCount = 0;
              this.router.navigate(['/success', transactionStatus]);
            } else {
              this.getTransactionStatusById(res.transactionDetails.id, res);
            }
          } else {
            this.router.navigate(['/', 'success']);
          }
        },
        (error) => {
          this.isLoader = false;
          this.isError = true;
          this.isWarning = true;
          const toastMessage = Exception.exceptionMessage(error);
          if (toastMessage.length === 1 && toastMessage[0] === 'Something went wrong. Please contact administrator.') {
            this.router.navigate(['/', 'failed']);
          } else {
            this.errorMessage = toastMessage.join(', ');
          }
        })
    }, (error) => {
      // get error, e.g. if key is invalid
      this.isError = true;
      this.isWarning = true;
      this.errorMessage = 'Error in getting captcha token. Please try again';
    })
  }
  getTransactionStatusById(transactionId, transaction) {
    //console.log("Transaction :: " + JSON.stringify(transaction))
    this.publicForm.getTransactionStatus(transaction.providerId, transactionId).subscribe(
      (response: any) => {
        let transactionStatus = TransactionStatusMapEnum[TransactionStatusEnum[response.status]];
        if (transactionStatus === 'Failed'
          || transactionStatus === 'Hold'
          || transactionStatus === 'Denied'
          || transactionStatus === 'Closed') {
          this.transactionResponseWaitingCount = 0;
          this.router.navigate(['/failed', transactionStatus]);
        } else if (transactionStatus === 'Authorized'
          || transactionStatus === 'Success'
          || this.transactionResponseWaitingCount === 5) {
          this.transactionResponseWaitingCount = 0;
          this.router.navigate(['/success', transactionStatus]);
        } else {
          setTimeout(() => {
            this.transactionResponseWaitingCount++;
            this.getTransactionStatusById(transactionId, transaction);
          }, 5000);
        }
      }, error => {
        this.isError = true;
        this.isWarning = true;
        this.errorMessage = 'Error in getting transaction status.';
      });
  }
}
