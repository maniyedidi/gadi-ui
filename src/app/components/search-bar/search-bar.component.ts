import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { GadiService } from '../../services/gadi.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  brands: any[] = [];
  modelsFlag: Boolean = false;
  modelCtrl: FormControl;
  filteredModels: Observable<string[]>;
  models: any[] = [];
  searchFlag: Boolean = true;
  modelList: Observable<string[]> = undefined;

  @Input()
  searchQuery: any = {};

  constructor(private http: Http, private gadiService: GadiService) {
    this.stateCtrl = new FormControl();
    this.modelCtrl = new FormControl();
  }

  filterStates(makeName: string) {
    return this.brands.filter(brand =>
      brand.toLowerCase().indexOf(makeName.toLowerCase()) === 0);
  }

  filterModels(modelName: string) {
    console.log(`model Name ${modelName}`);
    return this.models.filter(model =>
      model.toLowerCase().indexOf(modelName.toLowerCase()) === 0);
  }

  ngOnInit() {
    this.getBrands();
    this.filteredModels = this.gadiService.modelList;
    this.filteredStates = this.gadiService.brandList;
  }

  displayModels(brand) {
    this.modelsFlag = true;
    this.searchQuery.brand = brand;
    this.getModels(brand);
  }
  getBrands() {
    this.gadiService.getBrandList();
    // .subscribe((brands) => {
    //   this.brands = brands;
    //   console.log(brands);
    //   this.filteredStates = this.stateCtrl.valueChanges
    //     .startWith(null)
    //     .map(brand => brand ? this.filterStates(brand) : this.brands.slice());
    //   console.log(` this.filteredStates ${JSON.stringify(this.filteredStates)}`);
    // },
    //   error => console.log(error)
    // );
  }

  getModels(brand: String) {

    this.gadiService.getModelList(brand);

    // this.http.get(`api/modalList/${brand}`).subscribe(res => {
    //   this.models = res.json();
    //   this.filteredModels = this.modelCtrl.valueChanges
    //     .startWith(null)
    //     .map(model => model ? this.filterModels(model) : this.models.slice());
    //   console.log(`this.filteredModels ${this.filteredStates}`);
    // });
  }

  searchResults() {
    this.searchFlag = !this.searchFlag;
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

