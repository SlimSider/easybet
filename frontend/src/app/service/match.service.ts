import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Match} from "../model/match/match";

@Injectable()
export class MatchService {

  constructor(private api : ApiService) { }

  getMatches(next, error?, params?, complete?) {
    this.api.getRequest("http://localhost:8080/match/get_all", next, error, params, complete);
  }

  getSelectableMatches(next, error?, params?, complete?) {
    this.api.getRequest("http://localhost:8080/match/get_all_selectable", next, error, params, complete);
  }

  getMatch(id: number, next, error?, params?, complete?) {
    this.api.getRequest("http://localhost:8080/match/get/" + id, next, error, params, complete);
  }

  addMatch(match: Match, next, error?, complete?) {
    return this.api.postRequest("http://localhost:8080/match/add", match, next, error, complete);
  }

  deleteMatch(id: number, next, error?, complete?) {
    this.api.deleteRequest('http://localhost:8080/match/delete_match/' + id, next, error, complete);
  }

  updateMatch(match: Match, next, error?, complete?) {
    this.api.putRequest('http://localhost:8080/match/update_match', match, next, error, complete);
  }
}


