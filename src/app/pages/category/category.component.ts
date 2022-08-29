import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';

import { AnalyticsEnum } from '../../enums/analytics.enum';
import { Category } from '../../models/category.model';
import { UtilService } from '../../services/util.service';
import { GlobalFacade } from '../../state/global.facade';
import { CategoryFacade } from './state/category.component.facade';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  formCategory: FormGroup;
  formFilter: FormGroup;
  isLoading$: Observable<boolean>;
  categories$: Observable<Category[]>;
  disabledSave = false;
  action: 'Cadastrar' | 'Atualizar' = 'Cadastrar';
  destroyed$ = new Subject<void>();
  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('filterInput') filterInput: ElementRef;
  @ViewChild('descriptionInput') descriptionInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private categoryFacade: CategoryFacade,
    public utilService: UtilService,
    private globalFacade: GlobalFacade
  ) {}

  ngOnInit() {
    this.buildForms();
    this.setup();
  }

  private buildForms() {
    this.formFilter = this.formBuilder.group({
      filter: [''],
    });
    this.formCategory = this.formBuilder.group({
      uid: [''],
      description: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
    });
    setTimeout(() => this.filterInput?.nativeElement.focus(), 1000);
  }

  private setup() {
    this.categoryFacade.getCategories();
    this.isLoading$ = this.categoryFacade
      .selectIsLoading$()
      .pipe(takeUntil(this.destroyed$));
    this.categories$ = this.categoryFacade
      .selectCategories$()
      .pipe(takeUntil(this.destroyed$));
    this.filterListener();
  }

  private filterListener() {
    this.categories$ = combineLatest([
      this.categoryFacade.selectCategories$(),
      merge(
        of(''),
        this.formFilter
          .get('filter')
          .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      ),
    ]).pipe(
      takeUntil(this.destroyed$),
      map(([categories, filter]) => {
        const valid =
          categories?.length > 0 && filter !== '' && filter !== null;
        return valid
          ? categories?.filter(
              (category) =>
                category?.description
                  ?.toUpperCase()
                  .includes(filter?.toUpperCase()) ||
                this.utilService
                  .castTimestampFirebaseToDate(category?.createdAt)
                  ?.toUpperCase()
                  .includes(filter?.toUpperCase()) ||
                this.utilService
                  .castTimestampFirebaseToDate(category?.updatedAt)
                  ?.toUpperCase()
                  .includes(filter?.toUpperCase())
            )
          : categories;
      })
    );
  }

  clearFilter() {
    this.formFilter.reset();
    setTimeout(() => this.filterInput.nativeElement.focus(), 1000);
  }

  new() {
    this.action = 'Cadastrar';
    this.openModal.nativeElement.click();
    setTimeout(() => this.descriptionInput.nativeElement.focus(), 1000);
    this.formCategory.reset();
    this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_NEW);
  }

  edit(category: Category) {
    this.action = 'Atualizar';
    this.openModal.nativeElement.click();
    setTimeout(() => this.descriptionInput.nativeElement.focus(), 1000);
    this.formCategory.addControl('uid', new FormControl(category.uid));
    this.formCategory.patchValue(category);
    this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_EDIT);
  }

  save() {
    if (this.formCategory.valid) {
      this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_SAVE);
      const uid = this.formCategory.get('uid')?.value;
      if (uid) {
        this.categoryFacade.updateCategory(uid, this.formCategory.value);
      } else {
        this.formCategory.removeControl('uid');
        this.categoryFacade.addCategory(this.formCategory.value);
      }
      this.formCategory.reset();
      this.closeModal.nativeElement.click();
      setTimeout(() => this.filterInput.nativeElement.focus(), 1000);
    } else {
      this.utilService.markAllFieldsAsDirty(this.formCategory);
      this.disabledSave = true;
      this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_REQUIRED_FIELDS);
    }
  }

  delete(category: Category) {
    this.categoryFacade.deleteCategory(category);
    this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_DELETE);
  }

  back() {
    this.utilService.navigateByUrl('/');
    this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_BACK);
  }

  ngOnDestroy() {
    this.categoryFacade.resetState();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
