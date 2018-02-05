import { NgModule, APP_INITIALIZER, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AgmCoreModule } from '@agm/core';
import { CrashMealUtilModule } from "../crash-meal-util/crash-meal-util.module";


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
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CrashMealUtilModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCSDaTkl_YIMafkL3br1RvQn7IUGT9aT_I',
            libraries: ["places"]
        })
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
