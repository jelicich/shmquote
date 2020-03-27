import { Component, OnInit } from '@angular/core';
import { BnaService } from './services/bna.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'shmquote';
    rows = [{
        id: this.generateId(),
    }];

    totals = [];

    fTotal: string;
    fTotalAr: string;

    usd: number;

    constructor(
        private bnaService: BnaService
    ){}

    ngOnInit() {
        this.setUsd();
    }
    
    addRow() {
        this.rows.push({id: this.generateId()});
    }

    deleteRow(id) {
        this.rows = this.rows.filter(row => row.id !== id);
    }

    updateTotals(newTotals) {
        this.totals = this.totals.filter(row => row.id !== newTotals.id)
        this.totals.push(newTotals);
        
        this.calculateTotals();
    }

    generateId(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    calculateTotals() {
        let total = 0;
        let totalAr = 0;
        this.totals.map((row) => {
            total += row.totalPrice;
            totalAr += row.totalPriceAr;
        })
        const nfObject = new Intl.NumberFormat('en-US',{minimumFractionDigits: 2}); 
        this.fTotal = nfObject.format(total);
        this.fTotalAr = nfObject.format(totalAr);
    }

    setUsd() {
        this.bnaService.getUsd().then((response: any) => {
            response.map((dolar)=> {
                if(dolar.casa.nombre == 'Banco Nación Billete') {
                    this.usd = parseFloat(dolar.casa.venta.replace(',','.'));
                }
            })
        })
    }
}
