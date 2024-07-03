import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  public formGroup!: FormGroup;
  public formControl!: FormControl;
  @Input() options!: string[];
  @Input() label!: string;
  @Input() initialOption!: string;
  @Output() emitSelectionChange: EventEmitter<string | number> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}
  writeValue(value: unknown): void {
    this.formControl.patchValue(value, { emitEvent: false });
  }
  registerOnChange(fn: (value: unknown) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: () => unknown) {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  ngOnInit(): void {
    this.formControl = this.formBuilder.control('');
    this.formGroup = this.formBuilder.group({
      control: this.formControl,
    });
    this.formControl.valueChanges.subscribe((v) => {
      this.emitSelectionChange.emit(v);
      this._controlValueAccessorChangeFn(v);
    });
  }

  private _controlValueAccessorChangeFn: (value: unknown) => void = () => {};

  _onTouched: () => unknown = () => {};
}