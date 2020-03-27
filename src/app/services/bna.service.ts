import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class BnaService {
	urlDolarSi = 'https://www.dolarsi.com/api/api.php?type=dolar'

	constructor(
		private http: HttpClient
		) { }

	getUsd(){
		return new Promise((resolve, reject) => {
            this.http
            .get(this.urlDolarSi)
            .toPromise()
            .then((res: any) => {
                resolve(res);
            },
                err => reject(err)
            );
        });
	}
  
}
