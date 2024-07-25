import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Channel } from '../models/channel.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private apiUrl = environment.apiUrl + '/api/channels';

  constructor(private http: HttpClient) {}

  createChannel(channelData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}`, channelData, { headers });
  }

  getChannelsByGroupId(groupId: string): Observable<Channel[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Channel[]>(`${this.apiUrl}/group/${groupId}`, { headers });
  }

  // Esta función parece no ser necesaria ya que no hay ruta para obtener un canal por código de invitación en el controlador
  // Elimínala si no es necesaria o actualiza la lógica de acuerdo con las rutas y controladores actuales
  getChannelByInviteCode(inviteCode: string): Observable<Channel> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Channel>(`${this.apiUrl}/invite/${inviteCode}`, { headers });
  }

  // Esta función parece no ser necesaria ya que no hay ruta para unirse a un canal en el controlador
  // Elimínala si no es necesaria o actualiza la lógica de acuerdo con las rutas y controladores actuales
  joinChannel(joinData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/join`, joinData, { headers });
  }
}
