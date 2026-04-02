import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerUrlService {
	baseURL: string = 'http://localhost:6700';
	javaServerURL: string = 'http://localhost:8080';
}
