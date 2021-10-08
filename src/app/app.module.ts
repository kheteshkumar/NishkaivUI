// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '../../node_modules/@ngx-translate/core';
import { TranslateHttpLoader } from '../../node_modules/@ngx-translate/http-loader';


// Component
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import semantic from '@formio/semantic';
import { Formio } from 'formiojs';
import { NgRecaptcha3Service } from 'ng-recaptcha3';
Formio.use(semantic);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
//   // Change this to your upload POST address:
//    url: 'http://hpg2-ui.s3-website.us-east-2.amazonaws.com',
//    maxFilesize: 50,
//    acceptedFiles: 'image/*'
//  };
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // SuiModule,
    // SharedModule,
    HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule,
    AppRoutingModule,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
    // DropzoneModule,
    // NgxDropzoneModule,
    // NguCarouselModule,
    // ColorPickerModule,
    // NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // FlatpickrModule.forRoot(),
    // BrowserAnimationsModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
  ],
  providers: [
    NgRecaptcha3Service
    // {provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
