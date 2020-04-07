import { Directive, Input, ElementRef, Optional, Renderer2, Self } from '@angular/core';
// import { MediaMarshaller, LayoutDirective, StyleUtils, LayoutStyleBuilder } from '@angular/flex-layout';
import { ShowHideDirective, MediaMonitor, LayoutDirective, negativeOf, StyleUtils } from '@angular/flex-layout';


@Directive({
    selector: `
    [fxHide.mob],
    [fxShow.mob],
  `
})
export class ShowHideExtDirective extends ShowHideDirective {
    constructor(monitor: MediaMonitor,
        @Optional() @Self() protected _layout: LayoutDirective,
        protected elRef: ElementRef,
        protected renderer: Renderer2,
        protected styleUtils: StyleUtils) {
        super(monitor, _layout, elRef, styleUtils, {}, false)
    }

    @Input('fxHide.mob') set hideMob(val) {
        this._cacheInput("showMob", negativeOf(val))
    }

    @Input('fxShow.mob') set showMob(val: boolean) {
        this._cacheInput("showMob", <boolean>val)
    }
}
