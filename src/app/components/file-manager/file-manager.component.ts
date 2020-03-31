import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
    selector: 'FileManagerComponent',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
    
    @Output() fileLoaded = new EventEmitter<any>(); 

    fmRef: ElementRef;

    isOpen = false;

    public hello = 'im fm';

    files = [];

    selectedFile = null;

    constructor(private fileService: FileService) {
    }  

    ngOnInit(): void {
    }

    public open() {
        //this.fmRef.nativeElement.innerHTML;
        this.isOpen = true;
        this.fileService.getFileList().then((response: any) => {
            let f = response.files;
            f.splice(0,2)
            this.files = f;
        })
    }

    public close() {
        this.isOpen = false;
        this.selectedFile = null;
    }

    selectFile(e, i) {
        let selected = document.querySelector('.selected-file');
        selected && selected.classList.remove('selected-file');
        e.target.classList.add('selected-file');
        this.selectedFile = this.files[i];
    }

    openFile() {
        if(this.selectedFile) {
            this.fileService.openFile({filename: this.selectedFile}).then((response: any) => {
                console.log(JSON.parse(response.file));
                
                this.fileLoaded.emit({
                    rows: JSON.parse(response.file)  
                })

                this.close();
            })
        } else {
            alert('Seleccione una cotización');
        }
    }
}
