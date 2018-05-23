import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Event} from "../model/event";
import {Type} from "../model/enums/type";

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  forbidden = [];
  type: string;
  firstFormGroup = this._formBuilder.group({
    score: ['', [Validators.pattern('^[1-9][0-9]*'), this.forbiddenValuesValidator(this.forbidden)]]
  });
  secondFormGroup = this._formBuilder.group({
    home: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*|^[1-9][0-9]*.[0-9]*')]],
    draw: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*|^[1-9][0-9]*.[0-9]*')]],
    away: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*|^[1-9][0-9]*.[0-9]*')]]
  });

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.data.match.events.length) {
      this.data.match.events.forEach( event => this.forbidden.push(event.type))
    }
  }

  addEvent() : void {
    const event = new Event(this.secondFormGroup.get('home').value, this.secondFormGroup.get('draw').value, this.secondFormGroup.get('away').value, Type[this.type], true, this.firstFormGroup.get('score').value);
    this.data.match.events.add ? this.data.match.events.add(event) : this.data.match.events.push(event);
    this.forbidden.push(this.type);
    this.firstFormGroup.get('score').value && this.forbidden.push(this.firstFormGroup.get('score').value);
    this.firstFormGroup.reset();
    this.firstFormGroup.markAsUntouched();
    this.secondFormGroup.reset();
    this.secondFormGroup.markAsUntouched();
  }

  done() : void {
    this.dialogRef.close(this.data.match);
  }

  forbiddenValuesValidator(values: Array<number>) : ValidatorFn {
    return (control: AbstractControl) : {[key: string]: any} => {
      const forbidden = values.includes(control.value);
      return forbidden ? {'forbidden' : {value: control.value}} : null;
    }
  }

  reset(stepper) {
    stepper.reset();
  }

}
