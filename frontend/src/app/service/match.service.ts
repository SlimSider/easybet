import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Match} from "../model/match/match";

@Injectable()
export class MatchService {

  constructor(private api : ApiService) { }

  getMatches(next, error?, params?, complete?) {
    this.api.getRequest("/match/get_all", next, error, params, complete);
  }

  getSelectableMatches(next, error?, params?, complete?) {
    this.api.getRequest("/match/get_all_selectable", next, error, params, complete);
  }

  getMatch(id: number, next, error?, params?, complete?) {
    this.api.getRequest("/match/get/" + id, next, error, params, complete);
  }

  addMatch(match: Match, next, error?, complete?) {
    return this.api.postRequest("/match/add", match, next, error, complete);
  }

  deleteMatch(id: number, next, error?, complete?) {
    this.api.deleteRequest('/match/delete_match/' + id, next, error, complete);
  }

  updateMatch(match: Match, next, error?, complete?) {
    this.api.putRequest('/match/update_match', match, next, error, complete);
  }
}


