import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoComponent } from '../info/info.component';
import { DeviceService } from '../../services/device.service';

@Component({
    selector: 'HeaderComponent',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() dolar;
	@Output() add = new EventEmitter();
    @Output() copy = new EventEmitter();
    @Output() export = new EventEmitter();
	@Output() save = new EventEmitter();
    @Output() open = new EventEmitter();
    
    constructor(private bottomSheet: MatBottomSheet, public device: DeviceService) { }

    ngOnInit(): void {   
        
    }

    ngOnChanges() {
        if(this.dolar) {
            const nfObject = new Intl.NumberFormat('en-US',{minimumFractionDigits: 2}); 
            this.dolar = nfObject.format(this.dolar);
        }
    }

    showInfo() {
        this.bottomSheet.open(InfoComponent);
    }
}
