import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { NoFormFoundComponent } from './no-form-found/no-form-found.component';
import { PageComponent } from './page/page.component';
import { SubmissionSuccessComponent } from './submission-success/submission-success.component';
import { SubmissionFailedComponent } from './submission-failed/submission-failed.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      { path: 'not-found', component: NoFormFoundComponent },
      { path: 'success', component: SubmissionSuccessComponent },
      { path: 'success/:status', component: SubmissionSuccessComponent },
      { path: 'failed', component: SubmissionFailedComponent },
      { path: 'failed/:status', component: SubmissionFailedComponent },
      {
        path: ':provider',
        children: [
          { path: ':formId', component: FormComponent },
          {
            path: '**',
            redirectTo: '/not-found',
          },
        ],
      }
      // {
      //   path: ':provider',
      //   children: [
      //     { path: ':token', component: FormComponent },
      //     {
      //       path: '**',
      //       redirectTo: '/not-found',
      //     },
      //   ],
      // },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicFormsRoutingModule {}
