import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient]
})
export class AppComponent {
  title = 'complex-app';
  public values: any;
  public indexes: any;
  public form: FormGroup = new FormGroup({
    number: new FormControl('', Validators.required),
  });

  constructor(private readonly http: HttpClient) {

  }

  public async fetchValues(): Promise<void> {
    await this.http.get('/api/values/current').toPromise()
      .then((v: any) => this.values = v.data);
  }

  public async fetchIndexes(): Promise<void> {
    await this.http.get('/api/values/all').toPromise()
      .then((v: any) => this.indexes = v.data);
  }

  public async submit(): Promise<void> {
    await this.http.post('/api/values', {
      index: this.form.value
    }).toPromise();
  }
}
