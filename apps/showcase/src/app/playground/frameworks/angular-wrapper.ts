/**
 * Angular-style wrapper and mount helper for formular.dev
 */
import { FAAdapter } from '@formular/atomos';

// Mimics Angular's FormControl API
export class FAFormControl {
  name: string;
  value: string = '';
  touched: boolean = false;
  error: string = '';

  constructor(name: string) {
    this.name = name;
  }
}

// Mimics Angular's FormGroup API
export class FAFormGroup {
  controls: Record<string, FAFormControl>;
  adapter: FAAdapter;

  constructor(controls: Record<string, FAFormControl>, schema: any, onStatusChange: () => void) {
    this.controls = controls;

    const fieldsData = Object.keys(controls).map((key, i) => ({
      id: i,
      name: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: controls[key].value,
      touched: controls[key].touched
    }));

    this.adapter = new FAAdapter(
      fieldsData as any,
      {
        onFieldChange: (name, val) => {
          if (this.controls[name]) {
            this.controls[name].value = val as string;
            onStatusChange();
          }
        },
        onFieldBlur: (name) => {
          if (this.controls[name]) {
            this.controls[name].touched = true;
            onStatusChange();
          }
        },
        onErrorChange: (name, err) => {
          if (this.controls[name]) {
            this.controls[name].error = err;
            onStatusChange();
          }
        }
      },
      schema
    );
  }

  get value() {
    return this.adapter.getValidatedData();
  }

  get invalid() {
    return Object.values(this.controls).some((c) => c.error);
  }

  setValue(name: string, val: string) {
    this.adapter.handleChange(name, val);
  }

  markAsTouched() {
    Object.values(this.controls).forEach((c) => {
      c.touched = true;
    });
    this.adapter.submit(); // Triggers full validation
  }

  async submit() {
    this.markAsTouched();
    return await this.adapter.submit();
  }
}

export function mountAngularForm(
  container: HTMLElement,
  schema: any,
  onSubmit: (data: any) => void | Promise<void>,
  onSuccess: (message: string) => void,
  onError: (error: string) => void
) {
  const glassInputBase =
    "w-full rounded-xl px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 shadow-[0_4px_30px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 ease-out focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:-translate-y-0.5";

  container.innerHTML = `
    <form id="angular-form" class="space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-200 mb-2">First Name <span class="text-red-500">*</span></label>
          <input type="text" id="firstName" placeholder="Jane" class="${glassInputBase}" />
          <div id="error-firstName" class="flex items-center gap-1.5 text-red-400 text-sm mt-2 font-medium hidden"></div>
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-200 mb-2">Last Name <span class="text-red-500">*</span></label>
          <input type="text" id="lastName" placeholder="Doe" class="${glassInputBase}" />
          <div id="error-lastName" class="flex items-center gap-1.5 text-red-400 text-sm mt-2 font-medium hidden"></div>
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-200 mb-2">Email Address <span class="text-red-500">*</span></label>
        <input type="email" id="email" placeholder="jane.doe@example.com" class="${glassInputBase}" />
        <div id="error-email" class="flex items-center gap-1.5 text-red-400 text-sm mt-2 font-medium hidden"></div>
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-200 mb-2">Password <span class="text-red-500">*</span></label>
        <input type="password" id="password" placeholder="••••••••" class="${glassInputBase}" />
        <div id="error-password" class="flex items-center gap-1.5 text-red-400 text-sm mt-2 font-medium hidden"></div>
      </div>
      <button type="submit" id="submit-btn" class="w-full relative overflow-hidden font-semibold rounded-xl py-3 px-6 text-base transition-all duration-300 inline-flex items-center justify-center gap-2 outline-none focus:ring-4 hover:-translate-y-0.5 active:translate-y-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/30 focus:ring-blue-500/30">
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-xl"></div>
        <span id="btn-text">Create Account</span>
      </button>
    </form>
  `;

  const htmlForm = container.querySelector('#angular-form') as HTMLFormElement;
  const submitBtn = container.querySelector('#submit-btn') as HTMLButtonElement;
  const btnText = container.querySelector('#btn-text') as HTMLElement;

  const inputs: Record<string, HTMLInputElement> = {};
  const errorEls: Record<string, HTMLElement> = {};

  ['firstName', 'lastName', 'email', 'password'].forEach((id) => {
    inputs[id] = container.querySelector(`#${id}`) as HTMLInputElement;
    errorEls[id] = container.querySelector(`#error-${id}`) as HTMLElement;
  });

  const updateUI = () => {
    Object.keys(controls).forEach((name) => {
      const c = formGroup.controls[name];
      const input = inputs[name];
      const errEl = errorEls[name];

      if (input && input.value !== c.value) {
        input.value = c.value;
      }

      if (errEl) {
        if (c.touched && c.error) {
          errEl.innerHTML = `
            <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>${c.error}</span>
          `;
          errEl.classList.remove('hidden');
        } else {
          errEl.innerHTML = '';
          errEl.classList.add('hidden');
        }
      }

      if (input) {
        input.classList.remove(
          "border-red-500/50", "bg-red-500/5", "focus:border-red-500", "focus:ring-red-500/20",
          "border-green-500/50", "bg-green-500/5", "focus:border-green-500", "focus:ring-green-500/20"
        );
        if (c.touched) {
          if (c.error) {
            input.classList.add("border-red-500/50", "bg-red-500/5", "focus:border-red-500", "focus:ring-red-500/20");
          } else if (c.value) {
            input.classList.add("border-green-500/50", "bg-green-500/5", "focus:border-green-500", "focus:ring-green-500/20");
          }
        }
      }
    });
  };

  const controls: Record<string, FAFormControl> = {
    firstName: new FAFormControl('firstName'),
    lastName: new FAFormControl('lastName'),
    email: new FAFormControl('email'),
    password: new FAFormControl('password')
  };

  const formGroup = new FAFormGroup(controls, schema, updateUI);

  ['firstName', 'lastName', 'email', 'password'].forEach((id) => {
    inputs[id].addEventListener('input', (e) => {
      formGroup.setValue(id, (e.target as HTMLInputElement).value);
    });
    inputs[id].addEventListener('blur', () => {
      formGroup.adapter.handleBlur(id);
    });
  });

  htmlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    const originalText = btnText.textContent;
    btnText.innerHTML = `
      <svg class="animate-spin flex-shrink-0 relative z-10" width="18" height="18" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Submitting...</span>
    `;

    try {
      const result = await formGroup.submit();
      if (!result) {
        onError('Please fix all errors before submitting');
      } else {
        await onSubmit(formGroup.value);
        onSuccess('Form submitted successfully');
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = originalText;
      updateUI();
    }
  });

  return () => {
    formGroup.adapter.dispose();
    container.innerHTML = '';
  };
}
