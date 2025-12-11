import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleLogDirective } from './console-log.directive';

@Component({
  template: '<button appConsoleLog>Click Me</button>',
})
class TestComponent {}

describe('ConsoleLogDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let button: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConsoleLogDirective],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    button = fixture.nativeElement.querySelector('button');
  });

  it('should create an instance', () => {
    const directive = new ConsoleLogDirective(button as any);
    expect(directive).toBeTruthy();
  });

  it('should log to console when clicked', () => {
    spyOn(console, 'log');
    const directive = new ConsoleLogDirective(button as any);
    directive.onClick();
    expect(console.log).toHaveBeenCalledWith('Element clicked:', button);
  });
});
