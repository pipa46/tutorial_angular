import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from './Game';
import { GAME_DATA } from './mock-games';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(
        private http:HttpClient
    ) { }

    getGames(title?: String, categoryId?: number): Observable<Game[]> {
        return this.http.get<Game[]>(this.composeFindUrl(title,categoryId));
    }

    saveGame(game: Game): Observable<void> {
        return of(null);
    }


    private composeFindUrl(title?: String, categoryId?: number) : string {
        let params = '';

        if (title != null)
         {
            if (params != '') params += "&"; 
            params += 'title='+title;
        }

        if (categoryId != null) {
            if (params != '') params += "&";
            params += "idCategory="+categoryId;
        }

        let url = 'http://localhost:8190/game'

        if (params == '') return url;
        else return url + '?'+params;
    }

}

