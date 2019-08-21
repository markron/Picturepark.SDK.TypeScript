import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// LIBRARIES
import { ShareService, ShareContentDetail, IShareDataBasic, IMailRecipient, ShareDeleteManyRequest, ShareDetail } from '@picturepark/sdk-v1-angular';
import { ContentDownloadDialogService } from '@picturepark/sdk-v1-angular-ui';

@Component({
  selector: 'app-share-manager-item',
  templateUrl: './share-manager-item.component.html',
  styleUrls: ['./share-manager-item.component.scss']
})
export class ShareManagerItemComponent implements OnInit, OnDestroy {

  // SUBSCRIPTIONS
  susbcription = new Subscription();

  // VARS
  creationDate: Date;
  modificationDate: Date;
  items: ShareContentDetail[] = [];
  mailRecipients: IMailRecipient[] = [];
  toolBarOptions: any[];
  userId: string | undefined;
  subject: string;
  accessOriginal: string;
  share: ShareDetail;

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shareService: ShareService,
    private contentDownloadService: ContentDownloadDialogService,
    private router: Router
  ) {

    this.toolBarOptions = [{
      name: 'Download all contents',
      icon: 'file_download',
      action: () => {
        this.contentDownloadService.showDialog(this.items);
      }
    },
    /*{
      name: 'Share all contents',
      icon: 'share',
      action: 'share'
    },
    {
      name: 'Embed all contents',
      icon: 'code'
    },
    {
      name: 'Expire',
      icon: 'schedule',
      action: () => {
        this.share.expirationDate = new Date();
      }
    },*/
    {
      name: 'Delete',
      icon: 'delete',
      action: () => {
        // TODO: Add confirm dialog
        this.shareService.deleteMany(new ShareDeleteManyRequest({ ids: [this.share.id] }))
        .subscribe(i => {
          this.router.navigate(['./share-manager']);
        });
      }
    }];

  }

  // GET SHARE INFO
  loadShare(shareId: string): void {
    this.shareService.get(shareId).subscribe(data => {
      this.share = data;

      this.items = data.contentSelections;
      this.creationDate = data.audit.creationDate;
      this.modificationDate = data.audit.modificationDate;
      this.userId = data.audit.createdByUser;

      const shareDataBasic = <IShareDataBasic | undefined>data.data;

      this.mailRecipients = shareDataBasic!.mailRecipients;

      this.subject = data.name;
      this.accessOriginal = data.outputAccess;
      this.creationDate = data.audit.creationDate;

      setTimeout(() => { this.isLoading = false; }, 0);

    });
  }

  ngOnInit() {

    // ROUTE SUBSCRIBER
    const activatedRoute = this.activatedRoute.params.subscribe(params => {
      this.loadShare(params.shareId);
    });

    // ADD TO SUBSCRIBERS
    this.susbcription.add(activatedRoute);

  }

  ngOnDestroy() {

    // UNSUBSCRIBE
    if (this.susbcription) {
      this.susbcription.unsubscribe();
    }

  }

}