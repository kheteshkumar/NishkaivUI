import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioModule } from 'angular-formio';
import { PublicFormsRoutingModule } from './public-forms-routing.module';
import { ShellComponent } from './shell/shell.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { NoFormFoundComponent } from './no-form-found/no-form-found.component';
import { PageComponent } from './page/page.component';
import { SubmissionSuccessComponent } from './submission-success/submission-success.component';
import { SubmissionFailedComponent } from './submission-failed/submission-failed.component';

@NgModule({
  declarations: [ShellComponent, FormComponent, LogoComponent, NoFormFoundComponent, PageComponent, SubmissionSuccessComponent, SubmissionFailedComponent],
  imports: [ReactiveFormsModule, CommonModule, PublicFormsRoutingModule, FormioModule],
})
export class PublicFormsModule {}
