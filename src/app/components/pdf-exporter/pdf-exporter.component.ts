import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
    selector: 'PdfExporterComponent',
    templateUrl: './pdf-exporter.component.html',
    styleUrls: ['./pdf-exporter.component.scss']
})
export class PdfExporterComponent implements OnInit {
    isOpen = false;
    includeText = false;
    greeting: string;
    mainContent: string;
    fileName: string;

    validDays = 5;

    table: string;
    usd: string;

    constructor() { }

    ngOnInit(): void {
    }

    open(table, usd) {
        this.isOpen = true;
        this.table = table;
        this.usd = usd;
    }

    close() {
        this.isOpen = false;
        this.table = "";
    }

    exportPdf() {                
        jsPDF.autoTableSetDefaults({
           columnStyles: { id: { fontStyle: 'bold' } },
        })
       
        let doc = new jsPDF()
        let totalPagesExp = '{total_pages_count_string}'
        let logo64 = 'data:image/png;base64,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';
        const disclaimer = `Esta cotización tiene una validez de <b>${this.validDays} dias</b>. Los precios están expresados tanto en Dolares estadounidenses como en Pesos teniendo en cuenta la cotización oficial del Banco Nacion (<b>${this.usd}</b>) del día de la fecha. Los mismos <b>no incluyen IVA</b> y están sujetos a cambio sin previo aviso.`;
        
        const marginT = 50;
        let pageSize = doc.internal.pageSize;
        let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        let tableY;
        
        if(this.includeText) {
            if(!this.greeting || this.greeting.length < 3 || !this.mainContent || this.mainContent.length < 3) {
                alert('El saludo y cuerpo del mensaje deben ser de al menos 3 caracteres.');
                return false;
            }

            const greeting = this.greeting;
            const mainContent = this.mainContent;

            //fecha
            const d = new Date();
            const dtf = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'long', day: '2-digit' }); 
            const [{ value: da },,{ value: mo },,{ value: ye }] = dtf.formatToParts(d);

            const date = `Ciudad de Buenos Aires, ${da} de ${mo.charAt(0).toUpperCase() + mo.slice(1)} de ${ye}`;
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text(date, 195, 50, {align: 'right'});
        
            //saludo
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text(greeting, 14, 70); 
        
            //cuerpo del mensaje
            doc.setFontSize(12);
            doc.setTextColor(100);
            let wrappedText = doc.splitTextToSize(mainContent, pageWidth - 35, {});
            doc.text(wrappedText, 14, 80);

            const textHeight = doc.getTextDimensions(wrappedText).h + marginT;
            const fechaHeight = 4
            const fechaMarginB = 20;
            const spacing = 15;
            
            tableY = textHeight + fechaHeight + fechaMarginB + spacing;
        } else {
            tableY = marginT;
        }
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        // var pageSize = doc.internal.pageSize
        // var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
        // var text = doc.splitTextToSize(mainContent, pageWidth - 35, {})
        // doc.text(text, 14, 30)

        const table = this.table;

        const el = document.createElement('div');
        el.innerHTML = table;

        //remove disclaimer
        const lastTr = el.querySelector('table tfoot tr:last-child');
        lastTr.parentNode.removeChild(lastTr); 
        
        doc.autoTable({
           // head: headRows(),
           // body: bodyRows(40),
            html: el.querySelector('table'),
           //startY: 100,
            startY: tableY,
            showHead: 'firstPage',
            styles: {
                fontSize: 8
            },
            columnStyles: {
                0: { cellWidth: 15 }, //sku
                1: { cellWidth: 40 }, //nombre
                2: { cellWidth: 23}, //usd
                3: { cellWidth: 25 }, //ars
                4: { cellWidth: 10 }, //iva
                5: { cellWidth: 10 }, //cant
                6: { cellWidth: 25 }, // total usd
                7: { cellWidth: 30 } //total ars
            },
            didDrawPage: (data) => {
               // Header
               //top line
                doc.setDrawColor(0);
                doc.setFillColor(43, 49, 139);
                doc.rect(0, 0, 250, 7, "F");

               //logo and title
                doc.setFontSize(12);
                doc.setTextColor(43, 49, 139);
                doc.setFontStyle('bold');
                doc.addImage(logo64, 'PNG', data.settings.margin.left, 15, 40, 16);
                doc.text('COTIZACIÓN', 195, 19, {align: 'right'});

               //quote info (id, date)
                doc.setFontSize(8);
                doc.setTextColor(43, 49, 139);
                doc.setFontStyle('normal');
                const quoteId = '#' + Math.round((new Date()).getTime() / 1000);
                const today = new Date();
                const startDate = today.getDate() + '/' + today.getMonth()+1 + '/' + today.getFullYear();
                const validDays = this.validDays;
                const valid = new Date(today.setDate(today.getDate() + validDays)); 
                const endDate = valid.getDate() + '/' + valid.getMonth()+1 + '/' + valid.getFullYear();
                doc.text(quoteId + '\nFecha: ' + startDate + '\nVálido hasta: ' + endDate, 195, 23, {align: 'right'});
         
               // Footer
                var str = 'Pag. ' + doc.internal.getNumberOfPages()
               // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    str = str + ' de ' + totalPagesExp
                }
                doc.setFontSize(10)
                doc.setFontStyle('normal');
         
               // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                var pageSize = doc.internal.pageSize
                var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                doc.text(str, data.settings.margin.left, pageHeight - 10)

                doc.text('www.shmit.com.ar | ventas@shmit.com.ar', 195, pageHeight - 10, {align: 'right'})
            },
            margin: { top: marginT },
        })

        doc.setFontSize(8)
        doc.setFontStyle('normal');
        let wrappedDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 35, {});
        let spacing = 0;
        wrappedDisclaimer.map((line)=>{
            line = `<p style="font-family: sans-serif; color: #666; font-size: 12px">${line}</p>`;
            doc.fromHTML(line, 14, doc.autoTable.previous.finalY + 10 + spacing);
            spacing = spacing + 4;
        })
        
        
        doc.putTotalPages(totalPagesExp);
        let fileName = this.fileName ? this.fileName.replace(/\s+/g, '-') : '';
        fileName = fileName.length > 0 ? fileName + '.pdf' : 'SHM-IT-cotizacion.pdf';
        doc.save(fileName);

        this.close();
    }   
}
