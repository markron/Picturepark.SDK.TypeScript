import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ContentBrowserModule } from '../content-browser/content-browser.module';

import { LayerPanelsModule } from '../layer-panels/layer-panels.module';
import { NotificationModule } from '../notification/notification.module';
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ContentDownloadDialogComponent } from './components/content-download-dialog/content-download-dialog.component';

@NgModule({
  declarations: [
    ContentDownloadDialogComponent,
  ],
  imports: [
    CommonModule,
    ContentBrowserModule,
    LayerPanelsModule,
    NotificationModule,
    SharedModule
  ],
  exports: [
    ContentDownloadDialogComponent,

  ],
  entryComponents: [
    ContentDownloadDialogComponent,
    // ShareContentRecipientsInputComponent
  ]
})
export class DialogModule {}