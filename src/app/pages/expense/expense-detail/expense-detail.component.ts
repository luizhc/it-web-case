import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { AnalyticsEnum } from '../../../enums/analytics.enum';
import { Category } from '../../../models/category.model';
import { UtilService } from '../../../services/util.service';
import { GlobalFacade } from '../../../state/global.facade';
import { CategoryFacade } from '../../category/state/category.component.facade';
import { ExpenseListFacade } from '../expense-list/state/expense-list.component.facade';
import { ExpenseDetailFacade } from './state/expense-detail.component.facade';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
})
export class ExpenseDetailComponent implements OnInit {
  formExpense: FormGroup;
  categories$: Observable<Category[]>;
  disabledSave = false;
  action: 'Cadastrar' | 'Atualizar' = 'Cadastrar';
  destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private categoryFacade: CategoryFacade,
    private expenseListFacade: ExpenseListFacade,
    private expenseDetailFacade: ExpenseDetailFacade,
    public utilService: UtilService,
    private globalFacade: GlobalFacade
  ) {}

  ngOnInit() {
    this.buildForm();
    this.setup();
  }

  private buildForm() {
    this.formExpense = this.formBuilder.group({
      uid: [''],
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      date: [
        this.utilService.getDateToday(),
        Validators.compose([Validators.required]),
      ],
      category: ['', Validators.compose([Validators.required])],
      value: ['', Validators.compose([Validators.required])],
      observation: [''],
    });
  }

  private setup() {
    this.expenseListFacade
      .selectExpenseSelected()
      .pipe(filter((data) => data !== undefined))
      .subscribe((expenseSelected) => {
        this.action = 'Atualizar';
        this.formExpense.patchValue(expenseSelected);
      });
    this.categoryFacade.getCategories();
    this.categories$ = this.categoryFacade
      .selectCategories$()
      .pipe(takeUntil(this.destroyed$));
    this.formExpense.valueChanges.subscribe((res) =>
      this.expenseListFacade.expenseSelected(res)
    );
  }

  save() {
    if (this.formExpense.valid) {
      this.globalFacade.saveAnalytic(AnalyticsEnum.EXPENSES_SAVE);
      const uid = this.formExpense.get('uid')?.value;
      this.formExpense.patchValue({
        category: this.formExpense.get('category').value.uid,
      });
      if (uid) {
        this.expenseDetailFacade.updateExpense(uid, this.formExpense.value);
      } else {
        this.formExpense.removeControl('uid');
        this.expenseDetailFacade.addExpense(this.formExpense.value);
      }
      this.utilService.navigateByUrl('lancamentos');
    } else {
      this.utilService.markAllFieldsAsDirty(this.formExpense);
      this.disabledSave = true;
      this.globalFacade.saveAnalytic(AnalyticsEnum.EXPENSES_REQUIRED_FIELDS);
    }
  }

  back() {
    this.utilService.navigateByUrl('lancamentos');
    this.globalFacade.saveAnalytic(AnalyticsEnum.EXPENSES_BACK);
  }

  ngOnDestroy() {
    this.categoryFacade.resetState();
    this.expenseListFacade.resetState();
    this.expenseDetailFacade.resetState();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
