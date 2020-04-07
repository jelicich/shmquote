import { Directive, Input, ElementRef } from '@angular/core';
// import { MediaMarshaller, LayoutDirective, StyleUtils, LayoutStyleBuilder } from '@angular/flex-layout';
import { MediaMonitor, LayoutDirective, StyleUtils } from '@angular/flex-layout';


@Directive({
    selector: `
  [fxLayout.mob],[fxShow.mob],[fxHide.mob]
`})
export class LayoutExtDirective extends LayoutDirective {

    constructor(monitor: MediaMonitor, elRef: ElementRef, styleUtils: StyleUtils) {
        super(monitor, elRef, styleUtils);
    }

    @Input('fxLayout.mob')
    set layoutMob(val) {
        this._cacheInput('layoutMob', val);
    }
}