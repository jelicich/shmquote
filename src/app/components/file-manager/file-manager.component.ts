import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { FileService } from '../../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'FileManagerComponent',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
    
    @Output() fileLoaded = new EventEmitter<any>(); 

    fmRef: ElementRef;

    isOpen = false;
    isLoading;

    public hello = 'im fm';

    files = [];

    selectedFile = null;

    constructor(private fileService: FileService, private snackBar: MatSnackBar) {
    }  

    ngOnInit(): void {
    }

    public open() {
        //this.fmRef.nativeElement.innerHTML;
        this.isOpen = true;
        this.isLoading = true;
        this.fileService.getFileList().then((response: any) => {
            this.isLoading = false;
            let f = response.files;
            f.splice(0,2)
            this.files = f;
        })

        //remove, only local
        // setTimeout(()=>{
        //     this.isLoading = false;
        //     this.files = ['file.json', 'coty.json', 'snf.json', 'sarasa.json', 'test.json','file.json', 'coty.json', 'snf.json', 'sarasa.json', 'test.json','file.json', 'coty.json', 'snf.json', 'sarasa.json', 'test.json','file.json', 'coty.json', 'snf.json', 'sarasa.json', 'test.json']
        // },3000);
    }

    public close() {
        this.isOpen = false;
        this.selectedFile = null;
        this.files = [];
    }

    selectFile(i) {
        this.selectedFile = this.files[i];
    }

    openFile() {
        if(this.selectedFile) {
            this.isLoading = true;
            this.fileService.openFile({filename: this.selectedFile}).then((response: any) => {
                this.isLoading = false;
                // console.log(JSON.parse(response.file));
                
                this.fileLoaded.emit({
                    rows: JSON.parse(response.file)  
                })

                this.close();
            })
        } else {
            alert('Seleccione una cotización');
        }
    }

    deleteFile() {
        if(this.selectedFile) {
            const del = confirm('¿Desea borrar el archivo ' + this.selectedFile + '?')
            if(del) {
                this.isLoading = true;
                this.fileService.deleteFile({filename: this.selectedFile}).then((response: any) => {
                    this.open();
                    this.snackBar.open(response.message, 'OK', {duration: 3000});
                })
            }    
        } else {
            alert('Seleccione una cotización');
        }
    }
}
