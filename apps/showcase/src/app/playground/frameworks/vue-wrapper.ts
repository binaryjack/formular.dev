/**
 * Vue.js wrapper and mount helper for formular.dev
 */
import { createApp, ref, reactive, h } from 'vue';
import { FAAdapter } from '@formular/atomos';

export function mountVueForm(
  container: HTMLElement,
  schema: any,
  onSubmit: (data: any) => void | Promise<void>,
  onSuccess: (message: string) => void,
  onError: (error: string) => void
) {
  const App = {
    setup() {
      // 1. Setup reactive field states
      const fieldsData = reactive(
        Object.keys(schema.shape).map((key, i) => ({
          id: i,
          name: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          value: '',
          touched: false
        }))
      );

      const errors = reactive<Record<string, string>>({});
      const isSubmitting = ref(false);

      // 2. Setup FAAdapter
      const adapter = new FAAdapter(
        fieldsData as any,
        {
          onFieldChange: (name, val) => {
            const f = fieldsData.find((field) => field.name === name);
            if (f) f.value = val as string;
          },
          onFieldBlur: (name) => {
            const f = fieldsData.find((field) => field.name === name);
            if (f) f.touched = true;
          },
          onErrorChange: (name, err) => {
            errors[name] = err;
          }
        },
        schema
      );

      const handleInput = (name: string, val: string) => {
        adapter.handleChange(name, val);
      };

      const handleBlur = (name: string) => {
        adapter.handleBlur(name);
      };

      const handleSubmit = async () => {
        isSubmitting.value = true;
        try {
          fieldsData.forEach((f) => (f.touched = true));
          const result = await adapter.submit();
          if (!result) {
            onError('Please fix all errors before submitting');
          } else {
            const data = adapter.getValidatedData();
            await onSubmit(data);
            onSuccess('Form submitted successfully');
          }
        } catch (err) {
          onError(err instanceof Error ? err.message : 'Submission failed');
        } finally {
          isSubmitting.value = false;
        }
      };

      return {
        fieldsData,
        errors,
        isSubmitting,
        handleInput,
        handleBlur,
        handleSubmit
      };
    },

    render(ctx: any) {
      const glassInputBase =
        "w-full rounded-xl px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 shadow-[0_4px_30px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 ease-out focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:-translate-y-0.5";
      const glassErrorStyles =
        "border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20";
      const glassValidStyles =
        "border-green-500/50 bg-green-500/5 focus:border-green-500 focus:ring-green-500/20";

      const renderInputField = (
        name: string,
        label: string,
        placeholder: string,
        type = 'text'
      ) => {
        const field = ctx.fieldsData.find((f: any) => f.name === name);
        const error = ctx.errors[name];
        const touched = field?.touched;

        let validationClass = '';
        if (touched) {
          if (error) {
            validationClass = ` ${glassErrorStyles}`;
          } else if (field.value) {
            validationClass = ` ${glassValidStyles}`;
          }
        }

        return h('div', { class: 'mb-4' }, [
          h('label', { for: name, class: 'block text-sm font-medium text-gray-200 mb-2' }, [
            label,
            h('span', { class: 'text-red-500 ml-1' }, '*')
          ]),
          h('input', {
            id: name,
            type: type,
            value: field.value,
            placeholder: placeholder,
            class: `${glassInputBase}${validationClass}`,
            onInput: (e: any) => ctx.handleInput(name, e.target.value),
            onBlur: () => ctx.handleBlur(name)
          }),
          error
            ? h('div', { class: 'flex items-center gap-1.5 text-red-400 text-sm mt-2 font-medium' }, [
                h('svg', { class: 'w-4 h-4 flex-shrink-0', fill: 'currentColor', viewBox: '0 0 20 20' }, [
                  h('path', {
                    fillRule: 'evenodd',
                    d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z',
                    clipRule: 'evenodd'
                  })
                ]),
                h('span', error)
              ])
            : null
        ]);
      };

      return h(
        'form',
        {
          onSubmit: (e: Event) => {
            e.preventDefault();
            ctx.handleSubmit();
          },
          class: 'space-y-6'
        },
        [
          h('div', { class: 'grid grid-cols-2 gap-4' }, [
            renderInputField('firstName', 'First Name', 'Jane'),
            renderInputField('lastName', 'Last Name', 'Doe')
          ]),
          renderInputField('email', 'Email Address', 'jane.doe@example.com', 'email'),
          renderInputField('password', 'Password', '••••••••', 'password'),
          h(
            'button',
            {
              type: 'submit',
              disabled: ctx.isSubmitting,
              class:
                'w-full relative overflow-hidden font-semibold rounded-xl py-3 px-6 text-base transition-all duration-300 inline-flex items-center justify-center gap-2 outline-none focus:ring-4 hover:-translate-y-0.5 active:translate-y-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/30 focus:ring-blue-500/30'
            },
            [
              h('div', {
                class: 'absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-xl'
              }),
              ctx.isSubmitting
                ? h(
                    'svg',
                    {
                      class: 'animate-spin flex-shrink-0 relative z-10',
                      width: '18',
                      height: '18',
                      fill: 'none',
                      viewBox: '0 0 24 24'
                    },
                    [
                      h('circle', {
                        class: 'opacity-25',
                        cx: '12',
                        cy: '12',
                        r: '10',
                        stroke: 'currentColor',
                        strokeWidth: '4'
                      }),
                      h('path', {
                        class: 'opacity-75',
                        fill: 'currentColor',
                        d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      })
                    ]
                  )
                : null,
              h('span', ctx.isSubmitting ? 'Submitting...' : 'Create Account')
            ]
          )
        ]
      );
    }
  };

  const app = createApp(App);
  app.mount(container);
  
  return () => {
    app.unmount();
  };
}
