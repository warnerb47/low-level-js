import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LljsCoreComponent } from './lljs-core.component';

describe('LljsCoreComponent', () => {
  let component: LljsCoreComponent;
  let fixture: ComponentFixture<LljsCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LljsCoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LljsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
