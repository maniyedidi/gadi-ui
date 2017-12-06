import { Component, OnInit } from '@angular/core';
import { GadiService } from '../../services/gadi.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  private searchResults: object = undefined;
  constructor(private gadiService: GadiService, public sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.searchResults = this.gadiService.searchResults;
    this.gadiService.search({});
  }

}
