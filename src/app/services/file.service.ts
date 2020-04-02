import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    saveUrl = "./services/save_file.php";
    fileListUrl = './services/get_file_list.php';
    openFileUrl = './services/open_file.php';

    constructor(
        private http: HttpClient
    ) { }

    saveFile(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return new Promise((resolve, reject) => {
            data = JSON.stringify(data);
            this.http
                .post(this.saveUrl, data, httpOptions)
                .toPromise()
                .then((res: any) => {
                    resolve(res);
                },
                    err => reject(err)
                );
        });
    }

    getFileList() {
        return new Promise((resolve, reject) => {
            this.http
                .get(this.fileListUrl)
                .toPromise()
                .then((res: any) => {
                    resolve(res);
                },
                    err => reject(err)
                );
        });
    }

    openFile(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return new Promise((resolve, reject) => {
            data = JSON.stringify(data);
            this.http
                .post(this.openFileUrl, data, httpOptions)
                .toPromise()
                .then((res: any) => {
                    resolve(res);
                },
                    err => reject(err)
                );
        });
    }
}
