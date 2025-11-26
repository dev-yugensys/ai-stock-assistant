import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:8000/chat'; // 🔥 your Python BE endpoint
  private sensexUrl = 'https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BSEN';
  private niftyUrl  = 'https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BNSX';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const payload = { query: message };
    return this.http.post<any>(this.apiUrl, payload);
  }

  getSensex(): Observable<any> {
    return this.http.get(this.sensexUrl).pipe(
      map((res: any) => res.data)
    );
  }

  getNifty(): Observable<any> {
    return this.http.get(this.niftyUrl).pipe(
      map((res: any) => res.data)
    );
  }
}
