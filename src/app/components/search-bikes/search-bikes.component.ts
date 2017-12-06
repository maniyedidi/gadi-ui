import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

import { FormControl } from '@angular/forms';
import { GadiService } from '../../services/gadi.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-bikes',
  templateUrl: './search-bikes.component.html',
  styleUrls: ['./search-bikes.component.scss']
})
export class SearchBikesComponent implements OnInit {
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  brands: any[] = [];
  modelsFlag: Boolean = false;
  modelCtrl: FormControl;
  filteredModels: Observable<any[]>;
  models: any[] = [];
  private searchResultList;
  @Input()
  searchQuery: any = {
  };
  constructor(private http: Http, private gadiService: GadiService) {
    this.stateCtrl = new FormControl();
    this.modelCtrl = new FormControl();
  }

  filterStates(makeName: string) {
    return this.brands.filter(brand =>
      brand.toLowerCase().indexOf(makeName.toLowerCase()) === 0);
  }

  filterModels(modelName: string) {
    return this.models.filter(model =>
      model.modelName.toLowerCase().indexOf(modelName.toLowerCase()) === 0);
  }

  ngOnInit() {
    this.searchResultList = this.gadiService.searchResults;
    this.getBrands();
  }

  displayModels(brand) {
    this.modelsFlag = true;
    this.searchQuery.brand = brand;
    this.getModels(brand);
  }


  getBrands() {

    this.gadiService.getMakeList().subscribe((brands) => {
      this.brands = brands;
      console.log(brands);
      this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(brand => brand ? this.filterStates(brand) : this.brands.slice());
      console.log(` this.filteredStates ${JSON.stringify(this.filteredStates)}`);
    },
      error => console.log(error)
    );
  }

  getModels(brand) {
    this.http.get(`api/modalList/${brand}`).subscribe(res => {
      this.models = res.json();
      this.filteredModels = this.modelCtrl.valueChanges
        .startWith(null)
        .map(model => model ? this.filterModels(model) : this.models.slice());
      console.log(`this.filteredModels ${this.filteredStates}`);
    });
  }

  searchResults() {
    const searchPayload = {
      makeName: ''
    };
    if (this.searchQuery.makeName !== undefined && this.searchQuery.makeName != null) {
      searchPayload.makeName = this.searchQuery.makeName;
    }
    if (this.searchQuery.brandName !== undefined && this.searchQuery.brandName != null) {
      searchPayload['makesList.brandName'] = this.searchQuery.brandName;
    }

    this.gadiService.search(searchPayload);
  }

}
