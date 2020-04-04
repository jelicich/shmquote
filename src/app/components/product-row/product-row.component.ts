import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {tax} from '../../config/quote';

@Component({
	selector: 'ProductRowComponent',
	templateUrl: './product-row.component.html',
	styleUrls: ['./product-row.component.scss']
})

export class ProductRowComponent implements OnInit {
	@Input() props;
	@Input() usd;
	@Output() remove = new EventEmitter<number>(); 
	@Output() update = new EventEmitter<any>();
	
	componentId: number;

	sku: string;
	name: string;

	price: number; //precio final sin iva
	priceAr: number; //precio final sin iva en pesos
	totalPrice: number; //precio total sin iva
	totalPriceAr: number; //precio total sin iva en pesos
	finalPrice: number; //precio final con iva
	buyPrice: number; //precio de compra (costo)
	quantity: number;
	profit: number;
	iva = "10.5";
	impInt = "0";

	fPrice: string;
	fPriceAr: string;
	fTotalPrice: string;
	fTotalPriceAr: string;
	
	finalProfitPercent: number;
	profitStatusClass = '';
	rowStatusClass = '';

	statusTimeOut;

	tableRow: string;

	status = {
		LOW: 5,
		MED: 10
	}

	constructor(private snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.componentId = this.props.id;
		
		setTimeout(()=>{
			this.sku = this.props.sku || '';
			this.name = this.props.name || '';
			this.buyPrice = parseFloat(this.props.buyPrice) || null;
			this.quantity = parseInt(this.props.quantity) || null;
			this.profit = parseFloat(this.props.profit) || null;
			this.iva = this.props.iva || '10.5';
			this.impInt = this.props.impInt || '0';
			
			this.calculatePrice();
		},0)
		//populate if provided
		
	}

	calculatePrice() {
		if(!this.buyPrice || !this.quantity || !this.profit) {
			this.resetTotals();
			
			// setTimeout(()=>{
				this.update.emit({
					id: this.componentId,
					totalPrice: this.totalPrice,
					totalPriceAr: this.totalPriceAr
				})
			// },0)
			
			return false;
		} else {
			this.price = this.buyPrice;

			let ivaCredito = this.buyPrice * parseFloat(this.iva) / 100;
			let costoTotal = (((tax.IIBB + parseFloat(this.impInt)) * this.buyPrice) / 100) + this.buyPrice;
			let costoTotalIva = costoTotal + ivaCredito;
			let impDebCred = costoTotalIva * tax.DDCC;

			this.price = (costoTotal * this.profit / 100) + costoTotal + impDebCred;
			let ivaDebito = this.price * parseFloat(this.iva) / 100;

			this.finalPrice = this.price + ivaDebito;

			this.price = parseFloat(this.price.toFixed(2));
			this.totalPrice = parseFloat((this.price * this.quantity).toFixed(2));

			this.priceAr = parseFloat((this.price * this.usd).toFixed(2));
			this.totalPriceAr = parseFloat((this.priceAr * this.quantity).toFixed(2));

			this.finalPrice = parseFloat(this.finalPrice.toFixed(2));

			const nfObject = new Intl.NumberFormat('en-US',{minimumFractionDigits: 2}); 
			this.fPrice = nfObject.format(this.price);
			this.fPriceAr = nfObject.format(this.priceAr);
			this.fTotalPrice = nfObject.format(this.totalPrice);
			this.fTotalPriceAr = nfObject.format(this.totalPriceAr); 

			//calculate profit
			const pvp = this.price + ivaDebito;
			const ganancias = (this.price - costoTotal) * tax.GANANCIAS / 100;
			const difIva = ivaDebito - ivaCredito;
			const finalProfit = pvp - (costoTotalIva + impDebCred) - ganancias - difIva;
			this.finalProfitPercent = parseFloat((finalProfit / costoTotal * 100).toFixed(2));
			if(this.finalProfitPercent <= this.status.LOW) {
				this.profitStatusClass = 'low';
			} else if(this.finalProfitPercent > this.status.LOW && this.finalProfitPercent <= this.status.MED) {
				this.profitStatusClass = 'med';
			} else {
				this.profitStatusClass = 'success'
			}
			 
			this.tableRow = this.generateTableRow();

			this.update.emit({
				id: this.componentId,
				totalPrice: this.totalPrice,
				totalPriceAr: this.totalPriceAr
			})
		}
	}

	resetTotals() {
		this.fPrice = '';
		this.fPriceAr = '';
		this.fTotalPrice = '';
		this.fTotalPriceAr = '';
		this.price = 0;
		this.priceAr = 0;
		this.totalPrice = 0;
		this.totalPriceAr = 0;
		this.finalProfitPercent = 0;
		this.profitStatusClass = '';
	}

	deleteRow(){
		this.remove.emit(this.componentId);
	}

	generateTable(){
		const table = `
			<table style="border-collapse: collapse; width: 1200px;" >
				<thead>
					<tr>
						<th style="padding: 10px; border: 1px solid black; border-collapse: collapse;">SKU</th>
						<th style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Nombre</th>
						<th style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Precio USD</th>
						<th style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Precio AR$</th>
						<th style="padding: 10px; border: 1px solid black; border-collapse: collapse;">IVA</th>
						<th style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Cant.</th>
						<th style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Importe USD</th>
						<th style="padding: 10px; border: 1px solid black; border-collapse: collapse;">Importe AR$</th>
					</tr>
				</thead>
				<tbody>
					${this.generateTableRow()}
				</tbody>
				<tfoot>
					<tr>
						<td style="padding: 10px; border: 1px solid black; border-collapse: collapse" colspan="8">
							Los precios no incluyen IVA. Tipo de cambio BNA $${this.usd}.
						</td>
					</tr>
				</tfoot>
			</table>
		`;
		// console.log(table);
		return table;
	}

	generateTableRow() {
		let tr;
		if(this.isEmptyField()) {
			tr = '';
			//highlight row
			this.highlightWhenEmpty();
		} else {
			tr = `
				<tr>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">${this.sku}</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse; width: 300px;">${this.name}</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" align="right">USD ${this.fPrice}</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" align="right">AR$ ${this.fPriceAr}</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" align="right">${this.iva}</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" align="right">${this.quantity}</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" align="right">USD ${this.fTotalPrice}</td>
					<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" align="right">AR$ ${this.fTotalPriceAr}</td>
				</tr>
			`;
		}
		
		return tr;
	}

	copyToClipboard() {
		let table = this.generateTable();

		const el = document.createElement('div');
		el.innerHTML = table;
		document.body.appendChild(el);

		window.getSelection().removeAllRanges()

		// el.select();
		var range = document.createRange()
		range.selectNode(el)
		window.getSelection().addRange(range)

		const r = document.execCommand('copy')
		
		document.body.removeChild(el);

		const message = r ? 'Copiado!' : 'No se pudo copiar';
		this.snackBar.open(message, 'OK', {duration: 3000});
	}

	getTotals() {
		return {
			price: this.price,
			priceAr: this.priceAr,
			totalPrice: this.totalPrice,
			totalPriceAr: this.totalPriceAr
		}
	}

	getRowData() {
		return {
			id: this.componentId,
			sku: this.sku,
			name: this.name,
			quantity: this.quantity,
			buyPrice: this.buyPrice,
			iva: this.iva,
			impInt: this.impInt,
			profit: this.profit
		}
	}

	isEmptyField() {
		const isMissingName = (this.sku.length == 0 && this.name.length == 0);
		const isMissingNumber = (!this.buyPrice || !this.quantity || !this.profit);
		if(isMissingName || isMissingNumber) {
			return true;
		} else {
			return false;
		}
	}

	validateInteger(e) {
		if(e.target.value.length > 0) {
			const n = e.target.value + '';
			e.target.value = parseInt(n.replace(/\D/, ''));
		} else {
			e.target.value = '';
		}
	}

	validateFloat(e) {
		if(e.target.value.length > 0) {
			const n = e.target.value + '';
			e.target.value = parseFloat(n.replace(/[^0-9.]/g, ""));
		} else {
			e.target.value = '';
		}
	}

	highlightWhenEmpty() {
		this.rowStatusClass = 'ProductRow--missingInfo';
	}

	cleanClass() {
		this.rowStatusClass = '';
	}
}
