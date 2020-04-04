import { Component, OnInit, ViewChildren, ViewChild, QueryList, AfterViewInit } from '@angular/core';
import { BnaService } from './services/bna.service';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { PdfExporterComponent } from './components/pdf-exporter/pdf-exporter.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from './services/file.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit{
    
    @ViewChildren(ProductRowComponent) productRows: QueryList<ProductRowComponent>;
    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;
    @ViewChild(PdfExporterComponent) pdfExporter: PdfExporterComponent;
    
    title = 'shmquote';
    rows = [{   
        id: this.generateId(),
    }];

    totals = [];

    fTotal: string;
    fTotalAr: string;

    usd: number;

    constructor(
        private bnaService: BnaService,
        private fileService: FileService,
        private snackBar: MatSnackBar
    ){}

    // ngOnInit() { 
    // }

    ngAfterViewInit(){
        this.setUsd();
    }
    
    addRow() {
        this.rows.push({id: this.generateId()});
    }

    deleteRow(id) {
        this.rows = this.rows.filter(row => row.id !== id);
        this.totals = this.totals.filter(row => row.id !== id);
        this.updateTotals(false);
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

		const r = document.execCommand('copy')
		
        document.body.removeChild(el);
        
        const message = r ? 'Copiado!' : 'No se pudo copiar';
		this.snackBar.open(message, 'OK', {duration: 3000});
    }

    generateTable() {
        let rows = '';
        this.productRows.forEach((row) => {
            rows += row.generateTableRow();
        });

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
                    ${rows}
                </tbody>
                <tfoot>
                    <tr>
                        <td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" colspan="6">Total: </td>
                        <td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" align="right">USD ${this.fTotal}</td>
                        <td style="padding: 10px; border: 1px solid black; border-collapse: collapse;" align="right">AR$ ${this.fTotalAr}</td>
                    </tr>
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

    updateTotals(newTotals) {
        if(newTotals) {
            this.totals = this.totals.filter(row => row.id !== newTotals.id)
            this.totals.push(newTotals);
        }
        
        const calc = this.calculateTotals();

        this.fTotal = calc.fTotal;
        this.fTotalAr = calc.fTotalAr;
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
        
        return {
            fTotal : nfObject.format(total),
            fTotalAr: nfObject.format(totalAr)
        }
    }

    setUsd() {
        this.bnaService.getUsd().then((response: any) => {
            response.map((dolar)=> {
                if(dolar.casa.nombre == 'Banco Nación Billete') {
                    this.usd = parseFloat(dolar.casa.venta.replace(',','.'));
                }
            })
        }).catch(()=>{
            this.setUsdManually();
        })
    }

    setUsdManually() {
        let manualUsd = prompt('No se pudo establecer el precio del dolar. Ingrese el valor manualmente:');
        if(manualUsd === null) {
            this.setUsdManually();
        } else {
            manualUsd = manualUsd.replace(/,/g, '.');
            const usd = parseFloat(manualUsd);
            if(usd) {
                this.usd = usd;
                const message = `Se estableció el valor del dolar en ${this.usd}`;
                this.snackBar.open(message, 'OK', {duration: 5000});
            } else {
                this.setUsdManually();
            }
        }
    }

    saveQuote() {
        let userInput = prompt('Ingrese un nombre para la cotización');
        if(userInput === null) {
            return false;
        } else {
            if(userInput.length == 0) {
                const message = 'No se pudo guardar. Ingrese un nombre.';
                this.snackBar.open(message, 'OK', {duration: 5000});
                return false;
            } else {
                let rowsData = [];
                this.productRows.forEach((row) => {
                    rowsData.push(row.getRowData());
                });

                const file = {
                    filename: userInput,
                    data: JSON.stringify(rowsData)
                }

                this.fileService.saveFile(file).then((response: any) => {
                    const message = response.message;
                    this.snackBar.open(message, 'OK', {duration: 5000});
                })
            }
        }
    }

    fileLoaded(file) {
        this.rows = file.rows;
    }

    exportToPdf() {
        const table = this.generateTable()
        this.pdfExporter.open(table, this.usd);
    }

}
