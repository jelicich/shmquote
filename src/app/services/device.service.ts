import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    private isMobile: boolean;
    breakPoint = 1124;

    constructor() {
        window.onresize = this.evaluateDevice;
        this.evaluateDevice();
    }

    public getIsMobile(): boolean {
        return this.isMobile;
    }

    evaluateDevice = () => {
        if (window.innerWidth <= this.breakPoint) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }
}
