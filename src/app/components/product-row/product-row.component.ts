import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {tax} from '../../config/quote';
//import { BnaService } from '../../services/bna.service';


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

	tableRow: string;

	constructor(
		//private bnaService: BnaService
	) { }

	ngOnInit(): void {
		this.componentId = this.props.id;
		//console.log(this.bnaService.getUsd());
		// this.bnaService.getUsd().then((data) => {
		// 	console.log('USD LLEGO! ', data)
		// });
	}

	calculatePrice() {
		if(!this.buyPrice || !this.quantity || !this.profit) {
			return;
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

			this.tableRow = this.generateTableRow();

			this.update.emit({
				id: this.componentId,
				totalPrice: this.totalPrice,
				totalPriceAr: this.totalPriceAr
			})
		}
	}

	deleteRow(){
		this.remove.emit(this.componentId);
	}

	generateTable(){
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
				${this.generateTableRow()}
			</table>
		`;
		// console.log(table);
		return table;
	}

	generateTableRow() {
		const tr = `
			<tr>
				<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">${this.sku}</td>
				<td style="padding: 10px; border: 1px solid black; border-collapse: collapse; width: 300px;">${this.name}</td>
				<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">USD ${this.fPrice}</td>
				<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">AR$ ${this.fPriceAr}</td>
				<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">${this.iva}</td>
				<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">${this.quantity}</td>
				<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">USD ${this.fTotalPrice}</td>
				<td style="padding: 10px; border: 1px solid black; border-collapse: collapse;">AR$ ${this.fTotalPriceAr}</td>
			</tr>
		`;
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

		document.execCommand('copy')
		
		document.body.removeChild(el);
	}

	getTotals() {
		return {
			price: this.price,
			priceAr: this.priceAr,
			totalPrice: this.totalPrice,
			totalPriceAr: this.totalPriceAr
		}
	}

}
