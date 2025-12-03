import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; // <-- modern replacement

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // <-- replaces HttpClientModule
    importProvidersFrom(BrowserAnimationsModule) // for Angular Material
  ]
}).catch(err => console.error(err));
// ading coment to test 
//now telling the shanshank how to do that 