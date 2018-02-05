import {CommonModule} from "@angular/common";
import {Popover} from "./popover-component/Popover";
import {PopoverContent} from "./popover-component/PopoverContent";
import {NgModule} from "@angular/core";

export * from "./popover-component/Popover";
export * from "./popover-component/PopoverContent";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PopoverContent,
        Popover,
    ],
    exports: [
        PopoverContent,
        Popover,
    ],
    entryComponents: [
        PopoverContent
    ]
})
export class CrashMealUtilModule {

}