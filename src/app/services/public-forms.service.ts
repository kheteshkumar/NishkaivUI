import { Injectable } from '@angular/core';
import { AppSetting } from '../common/constants/appsetting.constant';
import { CommonApiFuncService } from './common-api-func.service';
import { tap, catchError, map } from 'rxjs/operators';
import { Details } from '../module/public-forms/form/form.component';

@Injectable({
  providedIn: 'root',
})
export class PublicFormsService {
  basicInfo = {
    "title": "Patient Detail",
    "theme": "default",
    "collapsible": true,
    "key": "patientDetail",
    "type": "panel",
    "label": "Patient Detail",
    "input": false,
    "tableView": false,
    "components": [
      {
        "label": "Columns",
        "columns": [
          {
            "components": [
              {
                "label": "First Name",
                "tableView": true, "validate": {
                  required: true,
                  "maxLength": 50,
                  "pattern": "^[a-zA-Z]+([a-zA-Z ,.\\'-]+)*$",
                  "customMessage": "Invalid First Name"
                },
                "key": "uqiFname",
                "type": "textfield",
                "input": true,
                "hideOnChildrenHidden": false
              }
            ],
            "push": 0,
            "pull": 0,
            "size": "md",
            "width": 14,
            "offset": 0
          },
          {
            "components": [],
            "push": 0,
            "pull": 0,
            "size": "md",
            "offset": 0,
            "width": 2
          },
          {
            "components": [
              {
                "label": "Last Name",
                "tableView": true,
                "validate": {
                  required: true,
                  "maxLength": 50,
                  "pattern": "^[a-zA-Z]+([a-zA-Z ,.\\'-]+)*$",
                  "customMessage": "Invalid Last Name"
                },
                "key": "uqiLname",
                "type": "textfield",
                "input": true,
                "hideOnChildrenHidden": false
              }
            ],
            "size": "md",
            "width": 14,
            "offset": 0,
            "push": 0,
            "pull": 0
          },
          {
            "components": [],
            "size": "md",
            "offset": 0,
            "push": 0,
            "pull": 0,
            "width": 2
          },
          {
            "components": [
              {
                "label": "Phone Number",
                "tableView": true,
                "validate": {
                  required: true
                },
                "key": "uqiPhone",
                "type": "phoneNumber",
                "input": true,
                "hideOnChildrenHidden": false
              }
            ],
            "size": "md",
            "width": 14,
            "offset": 0,
            "push": 0,
            "pull": 0
          },
          {
            "components": [],
            "size": "md",
            "offset": 0,
            "push": 0,
            "pull": 0,
            "width": 2
          },
          {
            "components": [
              {
                "label": "Date Of Birth",
                "labelPosition": "",
                "format": "MM/dd/yyyy",
                "placeholder": "__/__/____",
                "enableMinDateInput": false,
                "datePicker": {
                  "disableWeekends": false,
                  "disableWeekdays": false
                },
                "enableMaxDateInput": false,
                "enableTime": false,
                "validate": {
                  "required": true,
                  "custom": "maxDate = new Date();\r\nminDate = new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDay());\r\nif (!(new Date(input) > minDate && new Date(input) <= maxDate)) {\r\n  valid = 'Date of Birth is not valid'\r\n}else{\r\n  valid = true;\r\n}"
                },
                "redrawOn": "data",
                "calculateValue": "let d = moment(value).format('YYYY-MM-DD'); value = d;",
                "type": "datetime",
                "input": true,
                "key": "uqiDob",
                "tableView": false,
                "widget": {
                  "type": "calendar",
                  "displayInTimezone": "viewer",
                  "locale": "en",
                  "useLocaleSettings": false,
                  "allowInput": true,
                  "mode": "single",
                  "enableTime": false,
                  "noCalendar": false,
                  "format": "yyyy-MM-dd",
                  "hourIncrement": 1,
                  "minuteIncrement": 1,
                  "time_24hr": false,
                  "minDate": null,
                  "disableWeekends": false,
                  "disableWeekdays": false,
                  "maxDate": null
                }
              }
            ],
            "size": "md",
            "width": 14,
            "offset": 0,
            "push": 0,
            "pull": 0
          },
          {
            "components": [],
            "size": "md",
            "offset": 0,
            "push": 0,
            "pull": 0,
            "width": 2
          },
          {
            "components": [
              {
                "label": "Email",
                "tableView": true,
                "key": "uqiEmail",
                "type": "email",
                "input": true,
                "hideOnChildrenHidden": false
              }
            ],
            "size": "md",
            "width": 14,
            "offset": 0,
            "push": 0,
            "pull": 0
          },
          {
            "components": [],
            "size": "md",
            "offset": 0,
            "push": 0,
            "pull": 0,
            "width": 2
          },
        ],
        "key": "columnsPatientDetail",
        "type": "columns",
        "input": false,
        "tableView": false
      },
    ],
    "collapsed": false
  }

  constructor(private commonAPIFuncService: CommonApiFuncService) { }

  // getTokenDetails(token) {
  //   const url = AppSetting.publicForms.getTokenDetails;
  //   const body = {
  //     token,
  //   };
  //   return this.commonAPIFuncService.post(url, body).pipe(
  //     map((res: Details) => {
  //       this.addBasicIntoForm(res.fields);
  //       return res;
  //     }),
  //     catchError(this.commonAPIFuncService.handleError('', [])),
  //   );
  // }

  getTokenDetails(formId) {
    const url = AppSetting.publicForms.getTokenDetails;
    const body = {
      formId,
    };
    return this.commonAPIFuncService.post(url, body).pipe(
      map((res: Details) => {
        this.addBasicIntoForm(res.fields);
        return res;
      }),
      catchError(this.commonAPIFuncService.handleError('', [])),
    );
  }

  addSubmission(payload) {
    const url = AppSetting.publicForms.submissions;
    const nPayload = {
      ...payload,
    };
    console.log("adding submission " + JSON.stringify(nPayload));
    return this.commonAPIFuncService
      .post(url, nPayload)
      .pipe(catchError(this.commonAPIFuncService.handleError('add', {})));
  }
  getTransactionStatus(providerId, paymentId) {
    const url = AppSetting.publicForms.getTransactionStatus.replace('{parentId}', providerId)
      .replace('{paymentId}', paymentId)
    return this.commonAPIFuncService.get(url).pipe(
      // tap((a) => console.log('fetched', a)),
      catchError(this.commonAPIFuncService.handleError('', [])),
    );
  }
  addBasicIntoForm(form) {
    console.log("form ::::::::::: " + JSON.stringify(form));
    form.components = [this.basicInfo, ...form.components];
  }
}
