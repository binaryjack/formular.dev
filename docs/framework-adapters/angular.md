# Angular Integration

Because `formular.dev` manages its own internal state and utilizes Dependency Injection natively (`ServiceManager`), it naturally aligns with Angular's architecture. It can completely replace `ReactiveFormsModule` for highly complex use-cases.

## Creating a Base Directive

The best approach in Angular is to create an attribute directive that attaches to your input fields. This directive will hook into the `formular.dev` pub/sub events and synchronize with the DOM.

```typescript
import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, HostListener } from '@angular/core';
import { IFormularManager, IInputBase } from 'formular.dev';

@Directive({
  selector: '[formularField]',
  standalone: true
})
export class FormularFieldDirective implements OnInit, OnDestroy {
  @Input('formularField') fieldName!: string;
  @Input() formManager!: IFormularManager;

  private fieldInstance: IInputBase<any> | undefined;
  private unsubscribe: (() => void) | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.fieldInstance = this.formManager.getField(this.fieldName);
    if (!this.fieldInstance) return;

    // Set initial value
    const state = this.fieldInstance.getState();
    this.renderer.setProperty(this.el.nativeElement, 'value', state.value);

    // Subscribe to formular.dev updates
    this.unsubscribe = this.fieldInstance.subscribe(() => {
      const newState = this.fieldInstance!.getState();
      
      // Update DOM value
      this.renderer.setProperty(this.el.nativeElement, 'value', newState.value);

      // Handle Validation Styling
      if (newState.errors.length > 0) {
        this.renderer.addClass(this.el.nativeElement, 'is-invalid');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
      }
    });
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: any) {
    this.formManager.updateField(this.fieldName, value);
  }

  @HostListener('blur')
  onBlur() {
    this.fieldInstance?.blur();
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
```

## Providing the Manager via Angular DI

Since `formular.dev` has its own IoC container, you can wrap it in an Angular InjectionToken or a standard Service.

```typescript
import { Injectable } from '@angular/core';
import { createForm, IFormularManager } from 'formular.dev';
import { mySchema } from './my-schema';

@Injectable({
  providedIn: 'root'
})
export class FormularService {
  private formManager: IFormularManager | null = null;

  async initForm() {
    this.formManager = await createForm({
      schema: mySchema,
      defaultValues: { /* ... */ }
    });
    return this.formManager;
  }

  get manager() {
    return this.formManager;
  }
}
```

## Component Template Usage

Now you can use the directive in any template seamlessly:

```html
<div class="form-control">
  <label>Email Address</label>
  <input 
    type="email" 
    [formularField]="'email'" 
    [formManager]="formService.manager"
  />
</div>
```
