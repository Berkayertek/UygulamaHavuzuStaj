import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VkiCalculatorComponent } from './vki-calculator.component';

describe('VkiCalculatorComponent', () => {
  let component: VkiCalculatorComponent;
  let fixture: ComponentFixture<VkiCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VkiCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VkiCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
