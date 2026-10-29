/**
 * Synetics wrapper mock for the showcase
 * Since Synetics is not on npm yet, this uses vanilla DOM to simulate
 * the Synetics Signals and reactivity bindings.
 */
import { FAAdapter } from '@formular/atomos';

export function createSyneticsForm(schema: any) {
  const initialFields = Object.keys(schema.shape).map((key, i) => ({
    id: i,
    name: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: '',
    touched: false
  }));

  // Mocking Signals
  let fields = initialFields;
  let errors: Record<string, string> = {};
  let isSubmitting = false;

  const listeners: (() => void)[] = [];
  const notify = () => listeners.forEach(fn => fn());

  const adapter = new FAAdapter(
    fields as any,
    {
      onFieldChange: (name, val) => {
        fields = fields.map((f) => (f.name === name ? { ...f, value: val as string } : f));
        notify();
      },
      onFieldBlur: (name) => {
        fields = fields.map((f) => (f.name === name ? { ...f, touched: true } : f));
        notify();
      },
      onErrorChange: (name, err) => {
        errors = { ...errors, [name]: err };
        notify();
      }
    },
    schema
  );

  return {
    fields: () => fields,
    errors: () => errors,
    isSubmitting: () => isSubmitting,
    handleChange: (name: string, val: string) => adapter.handleChange(name, val),
    handleBlur: (name: string) => adapter.handleBlur(name),
    subscribe: (fn: () => void) => {
      listeners.push(fn);
      return () => {
        const idx = listeners.indexOf(fn);
        if (idx > -1) listeners.splice(idx, 1);
      };
    },
    submit: async () => {
      isSubmitting = true;
      notify();
      try {
        fields = fields.map((f) => ({ ...f, touched: true }));
        notify();
        const result = await adapter.submit();
        if (result) return adapter.getValidatedData();
        return null;
      } finally {
        isSubmitting = false;
        notify();
      }
    }
  };
}

export function mountSyneticsForm(
  container: HTMLElement,
  schema: any,
  onSubmit: (data: any) => void | Promise<void>,
  onSuccess: (message: string) => void,
  onError: (error: string) => void
) {
  const form = createSyneticsForm(schema);

  const glassInputBase =
    "w-full rounded-xl px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 shadow-[0_4px_30px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 ease-out focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 focus:-translate-y-0.5";

  container.innerHTML = `
    <form id="synetics-form" class="space-y-6">
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
      <button type="submit" id="submit-btn" class="w-full relative overflow-hidden font-semibold rounded-xl py-3 px-6 text-base transition-all duration-300 inline-flex items-center justify-center gap-2 outline-none focus:ring-4 hover:-translate-y-0.5 active:translate-y-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border border-indigo-400/30 focus:ring-indigo-500/30">
        <span id="btn-text">Create Account</span>
      </button>
    </form>
  `;

  const htmlForm = container.querySelector('#synetics-form') as HTMLFormElement;
  const submitBtn = container.querySelector('#submit-btn') as HTMLButtonElement;
  const btnText = container.querySelector('#btn-text') as HTMLElement;

  const inputs: Record<string, HTMLInputElement> = {};
  const errorEls: Record<string, HTMLElement> = {};

  ['firstName', 'lastName', 'email', 'password'].forEach((id) => {
    inputs[id] = container.querySelector('#' + id) as HTMLInputElement;
    errorEls[id] = container.querySelector('#error-' + id) as HTMLElement;

    inputs[id].addEventListener('input', (e) => {
      form.handleChange(id, (e.target as HTMLInputElement).value);
    });
    inputs[id].addEventListener('blur', () => {
      form.handleBlur(id);
    });
  });

  const updateUI = () => {
    const fieldsData = form.fields();
    const errorsData = form.errors();
    const isSubmitting = form.isSubmitting();

    fieldsData.forEach((f) => {
      const input = inputs[f.name];
      if (input && input.value !== f.value) {
        input.value = f.value;
      }
    });

    Object.keys(inputs).forEach((name) => {
      const err = errorsData[name] || '';
      const input = inputs[name];
      const errEl = errorEls[name];
      const field = fieldsData.find((f) => f.name === name);

      if (errEl) {
        if (err) {
          errEl.innerHTML = `<span>${err}</span>`;
          errEl.classList.remove('hidden');
        } else {
          errEl.innerHTML = '';
          errEl.classList.add('hidden');
        }
      }

      if (input) {
        input.classList.remove("border-red-500/50", "focus:border-red-500", "border-green-500/50", "focus:border-green-500");
        if (field?.touched) {
          if (err) input.classList.add("border-red-500/50", "focus:border-red-500");
          else if (field.value) input.classList.add("border-green-500/50", "focus:border-green-500");
        }
      }
    });

    submitBtn.disabled = isSubmitting;
    if (isSubmitting) btnText.innerHTML = 'Submitting...';
    else btnText.innerHTML = 'Create Account';
  };

  const unsubscribe = form.subscribe(updateUI);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      const data = await form.submit();
      if (!data) onError('Please fix all errors before submitting');
      else {
        await onSubmit(data);
        onSuccess('Form submitted successfully');
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Submission failed');
    }
  };

  htmlForm.addEventListener('submit', handleSubmit);

  return () => {
    unsubscribe();
    htmlForm.removeEventListener('submit', handleSubmit);
    container.innerHTML = '';
  };
}
