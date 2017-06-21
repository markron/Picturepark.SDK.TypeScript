# Picturepark Content Platform Angular Components

## @picturepark/sdk-v1-angular

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-angular/api/index.html)

### Usage

**1. Installation**

Install the following NPM package:

- [@picturepark/sdk-v1-angular](https://www.npmjs.com/package/@picturepark/sdk-v1-angular): The client proxies to access the Picturepark API

**2. Module registration**

Register the Picturepark SDK module in your Angular app module and define the Picturepark server URL with the `PICTUREPARK_URL` token:

```ts
import { PICTUREPARK_URL, PictureparkModule } from '@picturepark/sdk-v1-angular';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    PictureparkModule
  ],
  providers: [
    { provide: PICTUREPARK_URL, useValue: "https://devnext.preview-picturepark.com" }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**3. Inject services**

Now, all required services are registered in the dependency injection container and can be used via constructor injection: 

```ts
import { Component, AfterViewInit } from '@angular/core';
import { AuthService, ContentService, ContentSearchRequest } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  constructor(
    public authService: AuthService,
    public contentService: ContentService) {

  }

  async ngAfterViewInit() {
    let username = prompt('Username: ');
    let password = prompt('Password: ');

    if (username && password) {
      await this.authService.login(username, password);

      const request = new ContentSearchRequest();
      request.searchString = 'm';

      this.contentService.search(request).subscribe(response => {
        alert(JSON.stringify(response));
      });
    }
  }
}

```

### Classes

- [AuthService](AuthService.md): Authenticates the user on the Picturepark server.