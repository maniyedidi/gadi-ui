import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GadiService } from '../../services/gadi.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  makeForm: any;

  constructor(private fb: FormBuilder, private gadiService: GadiService) { }
  ngOnInit() {
    this.makeForm = new FormGroup({
      makeName: new FormControl('Honda'),
      makesList: new FormArray([
        this.initMakeList()
      ]
      )
    });
  }

  initMakeList(): FormGroup {
    return new FormGroup({
      brandName: new FormControl('Activa 3G'),
      srcUrls: new FormArray([
        this.initSrc()
      ])
    });
  }

  initSrc(): FormGroup {
    return this.fb.group({
      url: '',
      mediaType: 'video',
    });
  }
  createRecord() {
    console.log(JSON.stringify(this.makeForm._value));
    this.gadiService.create(this.makeForm._value).subscribe((res) => {
      console.log('Created records');
    },
      error => console.log('faield to update records'));
  }
}
