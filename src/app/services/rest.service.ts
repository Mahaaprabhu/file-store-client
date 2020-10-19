import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MediaMetaData } from '../models/MediaMetaData';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  /*
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }
  */

  private prodServerHostUrl: String = 'https://intense-atoll-71263.herokuapp.com';
  private devServerHostUrl: String = 'http://localhost:3000';
  private currentServerHostUrl: String = this.devServerHostUrl;

  constructor(private http: HttpClient) { }

  postMediaFileToServer(obj: any) {
    return this.http.post(`${this.currentServerHostUrl}/media/`, obj)
  }

  deleteMediaFileFromServer(mediaFileId: String) {
    return this.http.delete(`${this.currentServerHostUrl}/media/file/${mediaFileId}`);
  }

  getMediaMetaDataFromServer(): Observable<any> {
    return this.http.get(`${this.currentServerHostUrl}/media/metadata`);
  }

  getMediaFileUri(mediaFileId: String): String {
    return `${this.currentServerHostUrl}/media/file/${mediaFileId}`;
  }

}
