import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'InfoComponent',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

    constructor(private bottomSheetRef: MatBottomSheetRef<InfoComponent>,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {
    }

    close() {
        this.bottomSheetRef.dismiss();
    }

    copyAll() {
        const content = `
            <dl>
                <dt><strong>Razón Social</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    FLAVIO ANTONIO LODETTI Y ESTEBAN ERNESTO JELICICH SOCIEDAD LEY 19.550</dd>
                
                <dt><strong>Dirección Fiscal</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    FITZ ROY 2231 7 702, 1425 CAPITAL FEDERAL
                </dd>
                
                <dt><strong>CUIT</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    30-71658387-9 - Responsable Inscripto
                </dd>
                
                <dt><strong>Ingresos Brutos</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    30716583879 (Convenio Multilateral)
                </dd>
                
                <dt><strong>Cuenta Corriente en Pesos</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    Banco Itau<br>
                    Cuenta #: 35694301000<br>
                    CBU #: 2590047910356943010002<br>
                    Sucursal: 0047
                </dd>
                
                <dt><strong>Cuenta Corriente en Dolares</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    Banco Itau<br>
                    Cuenta #: 35694306017<br>
                    CBU #: 2590047911356943060176<br>
                    Sucursal: 0047
                </dd>
            </dl>
        `;

		this.copyToClipboard(content);
    }

    copyBankInfo() {
        const content = `
            <dl>
                <dt><strong>Cuenta Corriente en Pesos</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    Banco Itau<br>
                    Cuenta #: 35694301000<br>
                    CBU #: 2590047910356943010002<br>
                    Sucursal: 0047
                </dd>

                <dt><strong>Cuenta Corriente en Dolares</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    Banco Itau<br>
                    Cuenta #: 35694306017<br>
                    CBU #: 2590047911356943060176<br>
                    Sucursal: 0047<br>  
                </dd>

                <dt><strong>Razón Social</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    FLAVIO ANTONIO LODETTI Y ESTEBAN ERNESTO JELICICH SOCIEDAD LEY 19.550
                </dd>
                
                <dt><strong>CUIT</strong></dt>
                <dd style="margin-bottom: 10px; border-left: 1px solid #ddd; margin-left: 20px; padding-left: 10px;">
                    30-71658387-9
                </dd>  
            </dl>
        `;

        this.copyToClipboard(content);
    }

    copyToClipboard(htmlString) {
        const el = document.createElement('div');
		el.innerHTML = htmlString;
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

}
