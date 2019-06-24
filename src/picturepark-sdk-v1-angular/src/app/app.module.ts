import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// LIBRARIES
import { PictureparkOidcAuthConfiguration, PictureparkOidcModule } from '@picturepark/sdk-v1-angular-oidc';
import { PictureparkUiModule } from '@picturepark/sdk-v1-angular-ui';
import { PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';

// MODULES
import { AppRoutingModule } from './app-routing.module';


// COMPONENTS
import { AppComponent } from './app.component';
import { ContentPickerComponent } from './content-picker/content-picker.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { HomeComponent } from './home/home.component';

export function LocaleIdFactory() {
  return (<any>navigator).languages ? (<any>navigator).languages[0] : navigator.language;
}

// CLIENT CONFIG
export function PictureparkConfigurationFactory() {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return <PictureparkOidcAuthConfiguration>{
    apiServer: appRootTag.getAttribute('picturepark-api-server'),
    stsServer: appRootTag.getAttribute('picturepark-sts-server'),
    customerId: appRootTag.getAttribute('picturepark-customer-id'),
    redirectServer: appRootTag.getAttribute('picturepark-redirect-server'),
    customerAlias: appRootTag.getAttribute('picturepark-customer-alias'),
    clientId: appRootTag.getAttribute('picturepark-client-id'),
    scope: appRootTag.getAttribute('picturepark-scope')
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentPickerComponent,
    DetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    PictureparkUiModule,
    PictureparkOidcModule
    /*RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'details', component: AppComponent },
      { path: 'pcpToken/:type?postUrl=:postUrl', redirectTo: '/content-picker?postUrl=:postUrl' }
    ]),*/
  ],
  providers: [
    { provide: LOCALE_ID, useFactory: LocaleIdFactory },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DetailsDialogComponent]
})
export class AppModule {
}
