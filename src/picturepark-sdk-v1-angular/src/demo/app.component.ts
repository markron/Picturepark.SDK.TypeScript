import { Component, Inject } from '@angular/core';

import { AuthService, ContentService, ContentSearchRequest } from '../picturepark.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  data = 'n/a';

  constructor(
    @Inject(AuthService) public authService: AuthService,
    public contentService: ContentService) {
  }

  search() {
    const request = new ContentSearchRequest();
    request.searchString = 'm';

    this.contentService.search(request).subscribe(response => {
      this.data = response ? JSON.stringify(response) : 'null';
    });
  }
}
