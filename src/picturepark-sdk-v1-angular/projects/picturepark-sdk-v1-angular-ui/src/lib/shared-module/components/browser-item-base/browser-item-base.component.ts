import { Input, Output, EventEmitter } from '@angular/core';
import { ThumbnailSize, IEntityBase } from '@picturepark/sdk-v1-angular';
import { Subject } from 'rxjs';
import { ContentModel } from '../../models/content-model';
import { BaseComponent } from '../base.component';
import { BaseBrowserComponent } from '../browser-base/browser-base.component';

export abstract class BaseBrowserItemComponent<TEntity extends IEntityBase> extends BaseComponent {
    // INPUTS
    @Input() public itemModel: ContentModel<TEntity>;
    @Input() thumbnailSize: ThumbnailSize | null;
    @Input() isListView: boolean;
    @Input() browser: BaseBrowserComponent<TEntity>;

    // OUTPUTS
    @Output() public previewItemChange = new EventEmitter<ContentModel<TEntity>>();

    protected isVisible = false;
    protected loadItem = new Subject<void>();

    public markAsVisible() {
        this.isVisible = true;
        this.loadItem.next();
    }

    public previewItem() {
        this.previewItemChange.emit(this.itemModel);
    }
}
