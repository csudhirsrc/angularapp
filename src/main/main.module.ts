import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LocalizationModule, LocaleValidationModule, LocaleService, TranslationService, TranslationModule } from 'angular-l10n';
import { CookieService } from 'ngx-cookie';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CrashmealHeaderComponent } from './landing-page/crashmeal-header.component';
import { FirstLayerComponent } from './landing-page/first-layer.component';
import { CrashmealFooterComponent } from './landing-page/crashmeal-footer.component';
import { SecondLayerComponent } from './landing-page/second-layer.component';
import { ThirdLayerComponent } from './landing-page/third-layer.component';
import { FourthLayerComponent } from './landing-page/fourth-layer.component';
import { LoginSignupComponent } from './landing-page/login-singup.component';

@NgModule({
    declarations: [
        LandingPageComponent,
        CrashmealHeaderComponent,
        FirstLayerComponent,
        CrashmealFooterComponent,
        SecondLayerComponent,
        ThirdLayerComponent,
        FourthLayerComponent,
        LoginSignupComponent 
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule        
    ],

    providers: [
        
    ],

    entryComponents: [
        
    ],

    bootstrap: [
        LandingPageComponent
    ],

})

export class MainModule {
}
