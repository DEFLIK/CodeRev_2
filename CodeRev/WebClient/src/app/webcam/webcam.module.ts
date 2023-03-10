/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import { NgModule } from '@angular/core';
import {SignalrComponent} from "./components/signalr.component";
import {FormsModule} from "@angular/forms";
import {WebcamRoutingModule} from "./webcam-routing.module";

@NgModule({
    declarations: [
        SignalrComponent
    ],
    imports: [
        WebcamRoutingModule,
        FormsModule
    ],
    exports: [
        SignalrComponent
    ]
})
export class WebcamModule { }
