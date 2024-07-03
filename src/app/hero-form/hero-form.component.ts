import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit, OnDestroy {
  fg!: FormGroup;
  name!: FormControl;
  alterEgo!: FormControl;
  power!: FormControl;
  powers: string[] = [ 'Super Smart', 'Ultra Flexible', 'Super Hot', 'Weather Changer' ];
  formStatus: boolean = false;

  private subscription!: Subscription;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  onSubmit() {
    this.fg.reset();
  }

  private buildForm(): void {
    this.fg = this.fb.group({
      name: this.fb.control('', { validators: Validators.required }),
      alterEgo: this.fb.control(''),
      power: this.fb.control({ value: null, disabled: false }, {
        validators: Validators.required
      })
    })
  }

  ngOnInit(): void {
    this.subscription = this.fg.statusChanges.subscribe(s => {
      console.log(`${s === 'VALID'}, ${s}`);
      this.formStatus = s === 'VALID';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
