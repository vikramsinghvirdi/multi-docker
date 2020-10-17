import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient]
})
export class AppComponent implements OnInit {
  title = 'client';
  public values: any = {};
  public indexes: any = [];
  public form: FormGroup = new FormGroup({
    number: new FormControl('', Validators.required),
  });
  public isLoading: boolean = false;
  constructor(private readonly http: HttpClient) {

  }

  public async ngOnInit(): Promise<void> {
    await this.fetchIndexes();
    await this.fetchValues();
  }

  public async fetchValues(): Promise<void> {
    await this.http.get('/api/values/current').toPromise()
      .then((v: any) => this.values = v)
      .catch(error => {});
  }

  public async fetchIndexes(): Promise<void> {
    await this.http.get('/api/values/all').toPromise()
      .then((v: any) => this.indexes = v)
      .catch(error => {});
  }

  public async submit(): Promise<void> {
    this.isLoading = true;
    await this.http.post('/api/values', {
      index: this.form.value.number
    }).toPromise()
    .then(r => {
      this.isLoading = false;
      this.fetchIndexes();
      this.fetchValues();
    })
    .catch(error => {
      this.isLoading = false;
    });
  }
}
