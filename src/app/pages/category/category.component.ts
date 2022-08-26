import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Category } from '../../models/category.model';
import { UtilService } from '../../services/util.service';
import { CategoryFacade } from './state/category.component.facade';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;
  categories$: Observable<Category[]>;
  disabledSave = false;
  buttonSave = 'Cadastrar';
  destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private categoryFacade: CategoryFacade,
    public utilService: UtilService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.setup();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      uid: new FormControl({ value: null, disabled: false }),
      description: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
    });
  }

  private setup() {
    this.categoryFacade.getCategories();
    this.isLoading$ = this.categoryFacade
      .selectIsLoading$()
      .pipe(takeUntil(this.destroyed$));
    this.categories$ = this.categoryFacade
      .selectCategories$()
      .pipe(takeUntil(this.destroyed$));
  }

  categoryToEdit(category: Category) {
    this.buttonSave = 'Atualizar';
    this.form.patchValue(category);
  }

  save() {
    this.buttonSave = 'Cadastrar';
    if (this.form.valid) {
      const uid = this.form.get('uid')?.value;
      if (uid) {
        this.categoryFacade.updateCategory(uid, this.form.value);
      } else {
        this.form.removeControl('uid');
        this.categoryFacade.addCategory(this.form.value);
      }
      this.form.reset();
    } else {
      this.utilService.markAllFieldsAsDirty(this.form);
      this.disabledSave = true;
    }
  }

  delete(category: Category) {
    this.categoryFacade.deleteCategory(category);
  }

  ngOnDestroy() {
    this.categoryFacade.resetState();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
