import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { endpoints } from '../commons/rest-endpoints';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UUID } from 'angular2-uuid';


export class SearchItem {
  constructor(public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string) {
  }
}

export interface SearchResults {
  _id: String;
  makeId: number | string;
  makeName: String;
  maskingName: String;
  hostUrl: String;
  logoUrl: String;
  makesList: Array<any>;
}

@Injectable()
export class GadiService implements OnInit {
  private baseUrl: string;
  makesList: Array<String> = [];
  searchResults: Observable<SearchResults[]>;
  brandList: Observable<string[]>;
  modelList: Observable<string[]>;
  private _searchResults: BehaviorSubject<SearchResults[]>;
  private _brandList: BehaviorSubject<string[]>;
  private _modelList: BehaviorSubject<string[]>;
  private dataStore: {
    searchResults: SearchResults[],
    brandList: string[],
    modelList: string[]
  };

  constructor(private http: Http) {

    this._searchResults = <BehaviorSubject<SearchResults[]>>new BehaviorSubject([]);
    this.searchResults = this._searchResults.asObservable();

    this._brandList = <BehaviorSubject<string[]>>new BehaviorSubject([]);
    this.brandList = this._brandList.asObservable();
    this._modelList = <BehaviorSubject<string[]>>new BehaviorSubject([]);
  }

  ngOnInit() {

  }

  getMakeList(limit: Number = 10, offset: Number = 0): any {
    return this.http.get(endpoints.BASEURL + endpoints.MAKESLIST)
      .map((response: Response) => <any>response.json());
  }

  getBrandList(limit: Number = 10, offset: Number = 0): any {
    this.http.get(endpoints.BASEURL + endpoints.MAKESLIST)
      .map((response: Response) => <any>response.json()).subscribe((data) => {
        this.dataStore.brandList = data;
        this._modelList.next(Object.assign({}, this.dataStore).brandList);
      },
      error => console.log(' Could not load model list '));
  }


  getModelList(brand): void {
    this.dataStore = {
      searchResults: [],
      brandList: [],
      modelList: []
    };
    this.http.get(`${endpoints.BASEURL}${endpoints.MODALLIST}${brand}`)
      .map((response: Response) => <any>response.json()).subscribe((data) => {
        this.dataStore.modelList = data;
        this._modelList.next(Object.assign({}, this.dataStore).modelList);
      },
      error => console.log(' Could not load model list '));
  }

  search(payLoad): void {
    this.dataStore = {
      searchResults: [],
      brandList: [],
      modelList: []
    };
    this.http.post(endpoints.BASEURL + endpoints.SEARCH, payLoad)
      .map(response => response.json()).subscribe(data => {
        this.dataStore.searchResults = data;
        this._searchResults.next(Object.assign({}, this.dataStore).searchResults);
      }, error => console.log('Could not load.'));
  }

  create(payLoad) {
    payLoad.makeId = UUID.UUID();
    return this.http.post(endpoints.BASEURL + endpoints.CREATE, payLoad)
      .map((response: Response) => <any>response.json());
  }
}
