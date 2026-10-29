/**
 * Vanilla JS wrapper and mount helper for formular.dev
 */
import { FAAdapter } from '@formular/atomos';

export function mountVanillaForm(
  container: HTMLElement,
  schema: any,
  onSubmit: (data: any) => void | Promise<void>,
  onSuccess: (message: string) => void,
  onError: (error: string) => void
) {
  // 1. Initialize state matching fields
  const fields = Object.keys(schema.shape).map((key, i) => ({
    id: i,
    name: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: '',
    defaultValue: '',
    isValid: false,
    isDirty: false,
    isPristine: true,
    isFocus: false,
    shouldValidate: true,
    errors: [],
    guides: []
  } as any));

  const errors: Record<string, string> = {};

  // Helper styles matching Atomos premium UI
  const glassInputBase = "w-full rounded-xl px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 shadow-[0_4px_30px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 ease-out focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:-translate-y-0.5";
  const glassErrorStyles = "border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20";
  const glassValidStyles = "border-green-500/50 bg-green-500/5 focus:border-green-500 focus:ring-green-500/20";

  // 2. Instantiate FAAdapter
  const adapter = new FAAdapter(
    fields,
    {
      onFieldChange: (name, val) => {
        const field = fields.find((f) => f.name === name);
        if (field) field.value = val;
      },
      onFieldBlur: (name) => {
        const field = fields.find((f) => f.name === name);
        if (field) field.touched = true;
      },
      onErrorChange: (name, err) => {
        errors[name] = err;
        
        // Update error message display
        const errorEl = container.querySelector(`#error-${name}`);
        if (errorEl) {
          if (err) {
            errorEl.innerHTML = `
              <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span>${err}</span>
            `;
            errorEl.classList.remove('hidden');
          } else {
            errorEl.innerHTML = '';
            errorEl.classList.add('hidden');
          }
        }

        // Update validation classes on the inputs
        const inputEl = container.querySelector(`#${name}`) as HTMLInputElement;
        if (inputEl) {
          inputEl.classList.remove(
            "border-red-500/50", "bg-red-500/5", "focus:border-red-500", "focus:ring-red-500/20",
            "border-green-500/50", "bg-green-500/5", "focus:border-green-500", "focus:ring-green-500/20"
          );
          if (err) {
            const errClasses = glassErrorStyles.split(' ');
            inputEl.classList.add(...errClasses);
          } else if (inputEl.value) {
            const validClasses = glassValidStyles.split(' ');
            inputEl.classList.add(...validClasses);
          }
        }
      }
    },
    schema
  );

  // 3. Render Form HTML
  container.innerHTML = `
    <form id="vanilla-form" class="space-y-6">
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

  const form = container.querySelector('#vanilla-form') as HTMLFormElement;
  const submitBtn = container.querySelector('#submit-btn') as HTMLButtonElement;
  const btnText = container.querySelector('#btn-text') as HTMLElement;

  // 4. Bind event listeners
  const inputIds = ['firstName', 'lastName', 'email', 'password'];
  const eventCleanups = inputIds.map((id) => {
    const el = container.querySelector(`#${id}`) as HTMLInputElement;
    
    const handleInput = (e: Event) => {
      adapter.handleChange(id, (e.target as HTMLInputElement).value);
    };

    const handleBlur = () => {
      adapter.handleBlur(id);
    };

    el.addEventListener('input', handleInput);
    el.addEventListener('blur', handleBlur);

    return () => {
      el.removeEventListener('input', handleInput);
      el.removeEventListener('blur', handleBlur);
    };
  });

  const handleSubmit = async (e: Event) => {
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
      const validatedFields = await adapter.submit();
      if (!validatedFields) {
        onError('Please fix all errors before submitting');
      } else {
        const validatedData = adapter.getValidatedData();
        await onSubmit(validatedData);
        onSuccess('Form submitted successfully');
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = originalText;
    }
  };

  form.addEventListener('submit', handleSubmit);

  // 5. Return cleanup function
  return () => {
    form.removeEventListener('submit', handleSubmit);
    eventCleanups.forEach(cleanup => cleanup());
    adapter.dispose();
    container.innerHTML = '';
  };
}
