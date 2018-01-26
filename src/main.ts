import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//import { AppModule } from './app/app.module';
import { MainModule } from './main/main.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//platformBrowserDynamic().bootstrapModule(AppModule);
platformBrowserDynamic().bootstrapModule(MainModule);
