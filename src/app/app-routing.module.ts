import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// /****** provider route starts ******/
// let routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full', data: { breadcrumb: 'login' } },
//   { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
//   {
//     path: '', component: SecureComponent, canActivate: [AuthGuard],
//     data: { title: 'Secure Views' }, children: SECURE_ROUTES
//   },
//   { path: '**', redirectTo: 'login' },
// ];
// /****** provider route ends ******/

/****** patient route starts ******/
// let routes: Routes = [
//       { path: '', redirectTo: 'login', pathMatch: 'full', data: { breadcrumb: 'login' } },
//       { path: '', component: PatientPublicComponent, data: { title: 'Public Views' }, children: PATIENT_PUBLIC_ROUTES },
//       {
//         path: '', component: SecureComponent, canActivate: [AuthGuard],
//         data: { title: 'Secure Views' }, children: SECURE_ROUTES
//       },
//       { path: '**', redirectTo: 'login' },
//     ];
/****** patient route ends ******/

// // if (window.location.host.includes('login.') || window.location.host.includes('logindev.') || window.location.host.includes('localhost:')) {
// if (window.location.host.includes('login.') || window.location.host.includes('logindev.')) {
//   routes = [
//     { path: '', redirectTo: 'login', pathMatch: 'full', data: { breadcrumb: 'login' } },
//     { path: '', component: PatientPublicComponent, data: { title: 'Public Views' }, children: PATIENT_PUBLIC_ROUTES },
//     {
//       path: '', component: SecureComponent, canActivate: [AuthGuard],
//       data: { title: 'Secure Views' }, children: SECURE_ROUTES
//     },
//     { path: '**', redirectTo: 'login' },
//   ];
// }

/****** public forms route starts ******/
// const routes = [
//       { path: 'forms', loadChildren: 'src/app/module/public-forms/public-forms.module#PublicFormsModule' },
// ];
const routes: Routes = [
  { path: '', loadChildren: 'src/app/module/public-forms/public-forms.module#PublicFormsModule' },
  { path: '**', redirectTo: 'not-found' },
];
/****** public forms route ends ******/

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
