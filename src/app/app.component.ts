import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { BnaService } from './services/bna.service';
import { ProductRowComponent } from './components/product-row/product-row.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    
    @ViewChildren(ProductRowComponent) productRows: QueryList<ProductRowComponent>;
    
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

    copyToClipboard() {
        // this.productRows.forEach(row => console.log(row));
        let table = this.generateTable();

		const el = document.createElement('div');
		el.innerHTML = table;
		document.body.appendChild(el);

		window.getSelection().removeAllRanges()

		// el.select();
		var range = document.createRange()
		range.selectNode(el)
		window.getSelection().addRange(range)

		document.execCommand('copy')
		
		document.body.removeChild(el);
    }

    generateTable() {
        let rows = '';
        this.productRows.forEach((row) => {
            rows += row.generateTableRow();
        });

        const table = `
			<table style="border-collapse: collapse; width: 1200px;" >
				<tr>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">SKU</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Nombre</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Precio USD</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Precio AR$</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">IVA</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Cant.</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Importe USD</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Importe AR$</td>
				</tr>
                ${rows}
                <tr>
                    <td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" colspan="6">Total: </td>
                    <td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">USD ${this.fTotal}</td>
                    <td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">AR$ ${this.fTotalAr}</td>
                </tr>
			</table>
		`;
		// console.log(table);
		return table;
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
