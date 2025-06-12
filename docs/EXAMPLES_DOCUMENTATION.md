# FORMULAR Examples & Usage Patterns

## Overview

This document provides comprehensive examples and usage patterns for implementing forms with FORMULAR. It covers everything from basic forms to advanced scenarios with custom validation, dynamic fields, and complex business logic.

## Table of Contents

- [Basic Form Examples](#basic-form-examples)
- [Validation Examples](#validation-examples)
- [Dynamic Forms](#dynamic-forms)
- [Custom Components](#custom-components)
- [Country-Specific Validation](#country-specific-validation)
- [Advanced Patterns](#advanced-patterns)
- [Testing Examples](#testing-examples)
- [Performance Optimization](#performance-optimization)

## Basic Form Examples

### Simple Contact Form

```typescript
// 1. Define the data interface
interface ContactData {
  name: string;
  email: string;
  message: string;
}

// 2. Create the form schema
const contactSchema: IEntityScheme = {
  name: 'contact-form',
  properties: [
    new FieldSchemaBuilder()
      .setId(1)
      .setName('name')
      .setTypeInput('text')
      .setValidationData(true, Validators.firstName('name', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setId(2)
      .setName('email')
      .setTypeInput('email')
      .setValidationData(true, Validators.email('email', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setId(3)
      .setName('message')
      .setTypeInput('textarea')
      .setValidationData(true, Validators.minMaxLength('message', 10, 500, true).build())
      .build()
  ]
};

// 3. Create form instance
const contactForm = formManager.createFromSchema<ContactData>(contactSchema);

// 4. React component
const ContactForm = () => {
  const handleSubmit = (data: Record<string, InputDataTypes>) => {
    console.log('Contact form submitted:', data);
    // Send to API
    submitContactForm(data as ContactData);
  };

  return (
    <FormularForm formular={contactForm} onSubmit={handleSubmit}>
      <div className="form-group">
        <InputText fieldName="name" />
      </div>
      <div className="form-group">
        <InputText fieldName="email" />
      </div>
      <div className="form-group">
        <InputText fieldName="message" />
      </div>
      <button type="submit">Send Message</button>
    </FormularForm>
  );
};
```

### User Registration Form

```typescript
interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  birthDate: string;
  country: string;
}

const registrationSchema: IEntityScheme = {
  name: 'user-registration',
  properties: [
    new FieldSchemaBuilder()
      .setId(1)
      .setName('username')
      .setTypeInput('text')
      .setValidationData(true,
        Validators.minMaxLength('username', 3, 20, true).build()
      )
      .build(),
    new FieldSchemaBuilder()
      .setId(2)
      .setName('email')
      .setTypeInput('email')
      .setValidationData(true, Validators.email('email', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setId(3)
      .setName('password')
      .setTypeInput('password')
      .setValidationData(true,
        new GenericValidationBuilder()
          .setConstraints([
            new ValidationConstraintBuilder<boolean>('required')
              .setConstraint(true),
            new ValidationConstraintBuilder<number>('minLength')
              .setConstraint(8),
            new ValidationConstraintBuilder<RegExp>('pattern')
              .setConstraint(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
              .setErrorMessage('Password must contain uppercase, lowercase, and number')
          ])
          .build()
      )
      .build(),
    new FieldSchemaBuilder()
      .setId(4)
      .setName('birthDate')
      .setTypeInput('date')
      .setValidationData(true, Validators.date('birthDate', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setId(5)
      .setName('country')
      .setTypeInput('select')
      .setOptionData('countries', COUNTRY_OPTIONS)
      .setValidationData(true, Validators.required('country', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setId(6)
      .setName('agreeToTerms')
      .setTypeInput('checkbox')
      .setValidationData(true, Validators.required('agreeToTerms', true).build())
      .build()
  ]
};

const UserRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Record<string, InputDataTypes>) => {
    setIsSubmitting(true);
    try {
      await registerUser(data as UserRegistrationData);
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormularForm
      formular={registrationForm}
      onSubmit={handleSubmit}
      isloading={isSubmitting}
    >
      <div className="registration-form">
        <div className="form-row">
          <InputText fieldName="username" />
          <InputText fieldName="email" />
        </div>
        <div className="form-row">
          <Password fieldName="password" />
        </div>
        <div className="form-row">
          <DatePicker fieldName="birthDate" />
          <Select fieldName="country" />
        </div>
        <div className="form-row">
          <CheckInput fieldName="agreeToTerms" />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </div>
    </FormularForm>
  );
};
```

## Validation Examples

### Custom Business Logic Validation

```typescript
// Custom validator for business-specific rules
const uniqueUsernameValidator: IValidationMethodStrategy = {
    name: 'UniqueUsernameValidator',

    validate: (field) => {
        // Client-side basic validation
        const username = field.input.value as string
        if (!username || username.length < 3) {
            return newValidationResult(
                false,
                field.input.name,
                'USERNAME_TOO_SHORT',
                field.input.validationManager.triggerKeyWordType,
                'Username must be at least 3 characters'
            )
        }
        return newValidationResult(true, field.input.name, 'VALID', [])
    },

    validateAsync: async (field) => {
        const username = field.input.value as string

        try {
            const response = await fetch(`/api/users/check-username`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            })

            const result = await response.json()

            return newValidationResult(
                result.isAvailable,
                field.input.name,
                result.isAvailable ? 'VALID' : 'USERNAME_TAKEN',
                field.input.validationManager.triggerKeyWordType,
                result.isAvailable ? undefined : 'Username is already taken'
            )
        } catch (error) {
            return newValidationResult(
                false,
                field.input.name,
                'VALIDATION_ERROR',
                field.input.validationManager.triggerKeyWordType,
                'Unable to validate username'
            )
        }
    }
}

// Add to field validation
const usernameField = formular.getField('username')
usernameField?.input.validationManager.addValidationStrategy(uniqueUsernameValidator)
```

### Cross-Field Validation

```typescript
// Password confirmation validator
const passwordConfirmationValidator: IValidationMethodStrategy = {
    name: 'PasswordConfirmationValidator',

    validate: (field) => {
        const confirmPassword = field.input.value as string
        const passwordField = field.input.formular?.getField('password')
        const password = passwordField?.input.value as string

        const isValid = confirmPassword === password

        return newValidationResult(
            isValid,
            field.input.name,
            isValid ? 'VALID' : 'PASSWORD_MISMATCH',
            field.input.validationManager.triggerKeyWordType,
            isValid ? undefined : 'Passwords do not match'
        )
    },

    validateAsync: async (field) => {
        return Promise.resolve(this.validate(field))
    }
}

// Usage in form setup
const setupPasswordValidation = (form: IFormular<any>) => {
    const confirmPasswordField = form.getField('confirmPassword')
    confirmPasswordField?.input.validationManager.addValidationStrategy(
        passwordConfirmationValidator
    )

    // Trigger validation when password changes
    const passwordField = form.getField('password')
    passwordField?.input.notificationManager.subscribe('field:changed', () => {
        confirmPasswordField?.input.validationManager.validate(confirmPasswordField)
    })
}
```

### Conditional Validation

```typescript
// Validator that applies different rules based on field conditions
const conditionalEmailValidator: IValidationMethodStrategy = {
    name: 'ConditionalEmailValidator',

    validate: (field) => {
        const email = field.input.value as string
        const userTypeField = field.input.formular?.getField('userType')
        const userType = userTypeField?.input.value as string

        // Business users require company email domains
        if (userType === 'business') {
            const businessDomains = ['company.com', 'enterprise.org', 'business.net']
            const emailDomain = email.split('@')[1]

            if (!businessDomains.includes(emailDomain)) {
                return newValidationResult(
                    false,
                    field.input.name,
                    'INVALID_BUSINESS_EMAIL',
                    field.input.validationManager.triggerKeyWordType,
                    'Business users must use a company email address'
                )
            }
        }

        // Regular email validation for all users
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValid = emailRegex.test(email)

        return newValidationResult(
            isValid,
            field.input.name,
            isValid ? 'VALID' : 'INVALID_EMAIL',
            field.input.validationManager.triggerKeyWordType,
            isValid ? undefined : 'Please enter a valid email address'
        )
    },

    validateAsync: async (field) => {
        return Promise.resolve(this.validate(field))
    }
}
```

## Dynamic Forms

### Form Builder with Dynamic Fields

```typescript
interface DynamicFormField {
  id: string;
  type: InputTypeNames;
  label: string;
  required: boolean;
  validation?: IValidationOptions;
  options?: IOptionItem[];
}

interface DynamicFormConfig {
  id: string;
  title: string;
  fields: DynamicFormField[];
}

const DynamicFormBuilder = ({ config }: { config: DynamicFormConfig }) => {
  const [form, setForm] = useState<IFormular<any>>();
  const formManagerRef = useRef(useService(SFormularManager));

  useEffect(() => {
    const createDynamicForm = () => {
      // Create field descriptors from config
      const fieldDescriptors: IFieldDescriptor[] = config.fields.map((fieldConfig, index) => ({
        id: index + 1,
        name: fieldConfig.id,
        label: fieldConfig.label,
        type: fieldConfig.type,
        value: '',
        defaultValue: '',
        objectValue: null,
        errors: [],
        guides: [],
        validationOptions: fieldConfig.validation || {},
        options: fieldConfig.options || [],
        isValid: !fieldConfig.required,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        shouldValidate: fieldConfig.required,
        target: undefined
      }));

      // Create form from descriptors
      const dynamicForm = formManagerRef.current.createFromDescriptors(
        config.id,
        fieldDescriptors
      );

      setForm(dynamicForm);
    };

    createDynamicForm();
  }, [config]);

  const renderField = (fieldConfig: DynamicFormField) => {
    switch (fieldConfig.type) {
      case 'text':
      case 'email':
      case 'password':
        return <InputText key={fieldConfig.id} fieldName={fieldConfig.id} />;
      case 'select':
        return <Select key={fieldConfig.id} fieldName={fieldConfig.id} />;
      case 'checkbox':
        return <CheckInput key={fieldConfig.id} fieldName={fieldConfig.id} />;
      case 'date':
        return <DatePicker key={fieldConfig.id} fieldName={fieldConfig.id} />;
      case 'textarea':
        return <RteInputField key={fieldConfig.id} fieldName={fieldConfig.id} />;
      default:
        return <InputText key={fieldConfig.id} fieldName={fieldConfig.id} />;
    }
  };

  const handleSubmit = (data: Record<string, InputDataTypes>) => {
    console.log('Dynamic form submitted:', data);
    // Process dynamic form data
  };

  if (!form) {
    return <div>Loading form...</div>;
  }

  return (
    <FormularForm formular={form} onSubmit={handleSubmit}>
      <div className="dynamic-form">
        <h2>{config.title}</h2>
        {config.fields.map(renderField)}
        <button type="submit">Submit</button>
      </div>
    </FormularForm>
  );
};

// Usage
const surveyConfig: DynamicFormConfig = {
  id: 'customer-survey',
  title: 'Customer Satisfaction Survey',
  fields: [
    {
      id: 'customerName',
      type: 'text',
      label: 'Your Name',
      required: true,
      validation: Validators.firstName('customerName', true).build()
    },
    {
      id: 'rating',
      type: 'select',
      label: 'Overall Rating',
      required: true,
      options: [
        { id: '5', label: 'Excellent', value: '5' },
        { id: '4', label: 'Good', value: '4' },
        { id: '3', label: 'Average', value: '3' },
        { id: '2', label: 'Poor', value: '2' },
        { id: '1', label: 'Very Poor', value: '1' }
      ]
    },
    {
      id: 'comments',
      type: 'textarea',
      label: 'Additional Comments',
      required: false
    }
  ]
};

<DynamicFormBuilder config={surveyConfig} />
```

### Multi-Step Forms

```typescript
interface MultiStepFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  addressInfo: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    language: string;
  };
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MultiStepFormData>>({});

  // Create separate forms for each step
  const personalInfoForm = useMemo(() =>
    formManager.createFromSchema(personalInfoSchema), []);
  const addressInfoForm = useMemo(() =>
    formManager.createFromSchema(addressInfoSchema), []);
  const preferencesForm = useMemo(() =>
    formManager.createFromSchema(preferencesSchema), []);

  const handleStepSubmit = async (stepData: Record<string, InputDataTypes>) => {
    // Merge step data with overall form data
    setFormData(prev => ({ ...prev, ...stepData }));

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final submission
      await submitCompleteForm({ ...formData, ...stepData });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormularForm formular={personalInfoForm} onSubmit={handleStepSubmit}>
            <h2>Personal Information</h2>
            <InputText fieldName="firstName" />
            <InputText fieldName="lastName" />
            <InputText fieldName="email" />
            <button type="submit">Next</button>
          </FormularForm>
        );

      case 2:
        return (
          <FormularForm formular={addressInfoForm} onSubmit={handleStepSubmit}>
            <h2>Address Information</h2>
            <InputText fieldName="street" />
            <InputText fieldName="city" />
            <InputText fieldName="zipCode" />
            <Select fieldName="country" />
            <button type="button" onClick={() => setCurrentStep(1)}>Back</button>
            <button type="submit">Next</button>
          </FormularForm>
        );

      case 3:
        return (
          <FormularForm formular={preferencesForm} onSubmit={handleStepSubmit}>
            <h2>Preferences</h2>
            <CheckInput fieldName="newsletter" />
            <CheckInput fieldName="notifications" />
            <Select fieldName="language" />
            <button type="button" onClick={() => setCurrentStep(2)}>Back</button>
            <button type="submit">Complete Registration</button>
          </FormularForm>
        );

      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      <div className="step-indicator">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
      </div>
      {renderCurrentStep()}
    </div>
  );
};
```

## Custom Components

### Custom Input Component with Validation

```typescript
interface CustomInputProps {
  fieldName: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onValidationChange?: (isValid: boolean) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  fieldName,
  placeholder,
  icon,
  onValidationChange
}) => {
  const { formInstance } = useFormularContext();
  const field = formInstance?.getField(fieldName);
  const { instance, flags } = useField(field);

  useEffect(() => {
    onValidationChange?.(flags.isValid);
  }, [flags.isValid, onValidationChange]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && instance) {
      instance.ref(inputRef.current);
    }
  }, [instance]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    instance?.input?.setValue(e.target.value);
  };

  const handleFocus = () => {
    instance?.input?.setFocus();
  };

  const handleBlur = () => {
    instance?.input?.valueManager?.setValue(instance.input, instance.input.value);
  };

  return (
    <div className={`custom-input ${flags.isValid ? 'valid' : 'invalid'} ${flags.isDirty ? 'dirty' : 'pristine'}`}>
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          ref={inputRef}
          type={instance?.input?.type || 'text'}
          value={instance?.input?.value as string || ''}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`form-control ${!flags.isValid && flags.isDirty ? 'error' : ''}`}
        />
      </div>

      {/* Validation feedback */}
      {!flags.isValid && flags.isDirty && (
        <div className="validation-feedback">
          {instance?.input?.errors.map((error, index) => (
            <span key={index} className="error-message">
              {error.message}
            </span>
          ))}
        </div>
      )}

      {/* Guide messages */}
      {instance?.input?.guides && instance.input.guides.length > 0 && (
        <div className="guide-messages">
          {instance.input.guides.map((guide, index) => (
            <span key={index} className="guide-message">
              {guide.message}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Usage
<CustomInput
  fieldName="email"
  placeholder="Enter your email"
  icon={<EmailIcon />}
  onValidationChange={(isValid) => setEmailValid(isValid)}
/>
```

### Form Array Component (Repeatable Fields)

```typescript
interface FormArrayItem {
  id: string;
  [key: string]: any;
}

interface FormArrayProps<T extends FormArrayItem> {
  name: string;
  initialItems?: T[];
  renderItem: (item: T, index: number, onUpdate: (updates: Partial<T>) => void, onRemove: () => void) => React.ReactNode;
  onItemsChange?: (items: T[]) => void;
  maxItems?: number;
  minItems?: number;
}

const FormArray = <T extends FormArrayItem>({
  name,
  initialItems = [],
  renderItem,
  onItemsChange,
  maxItems = 10,
  minItems = 0
}: FormArrayProps<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);

  useEffect(() => {
    onItemsChange?.(items);
  }, [items, onItemsChange]);

  const addItem = () => {
    if (items.length >= maxItems) return;

    const newItem = {
      id: `${name}-${Date.now()}`,
      // Add default properties based on T
    } as T;

    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (index: number, updates: Partial<T>) => {
    setItems(prev => prev.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    ));
  };

  const removeItem = (index: number) => {
    if (items.length <= minItems) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="form-array">
      <div className="form-array-items">
        {items.map((item, index) => (
          <div key={item.id} className="form-array-item">
            {renderItem(
              item,
              index,
              (updates) => updateItem(index, updates),
              () => removeItem(index)
            )}
          </div>
        ))}
      </div>

      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="add-item-btn">
          Add Item
        </button>
      )}
    </div>
  );
};

// Usage example: Dynamic contact list
interface Contact extends FormArrayItem {
  name: string;
  email: string;
  phone: string;
}

const ContactForm = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const renderContact = (
    contact: Contact,
    index: number,
    onUpdate: (updates: Partial<Contact>) => void,
    onRemove: () => void
  ) => (
    <div className="contact-item">
      <h4>Contact {index + 1}</h4>
      <input
        type="text"
        placeholder="Name"
        value={contact.name || ''}
        onChange={(e) => onUpdate({ name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={contact.email || ''}
        onChange={(e) => onUpdate({ email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={contact.phone || ''}
        onChange={(e) => onUpdate({ phone: e.target.value })}
      />
      <button type="button" onClick={onRemove}>Remove</button>
    </div>
  );

  return (
    <FormArray<Contact>
      name="contacts"
      renderItem={renderContact}
      onItemsChange={setContacts}
      maxItems={5}
      minItems={1}
    />
  );
};
```

## Country-Specific Validation

### Swiss Business Form

```typescript
interface SwissBusinessData {
  companyName: string;
  uid: string; // Swiss Business Identifier
  npa: string; // Swiss Postal Code
  phone: string;
  email: string;
  ahv?: string; // Swiss Social Security (optional)
}

const swissBusinessSchema: IEntityScheme = {
  name: 'swiss-business-form',
  properties: [
    new FieldSchemaBuilder()
      .setName('companyName')
      .setTypeInput('text')
      .setValidationData(true, Validators.companyName('companyName', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setName('uid')
      .setTypeInput('text')
      .setValidationData(true, Validators.swissUID('uid', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setName('npa')
      .setTypeInput('text')
      .setValidationData(true, Validators.swissNPA('npa', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setName('phone')
      .setTypeInput('tel')
      .setValidationData(true, Validators.swissPhone('phone', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setName('email')
      .setTypeInput('email')
      .setValidationData(true, Validators.email('email', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setName('ahv')
      .setTypeInput('text')
      .setValidationData(false, Validators.swissAHV('ahv', false).build())
      .build()
  ]
};

const SwissBusinessForm = () => {
  const form = useFormularInstance(swissBusinessSchema);

  const handleSubmit = (data: Record<string, InputDataTypes>) => {
    // Submit to Swiss business registry
    submitToSwissRegistry(data as SwissBusinessData);
  };

  return (
    <FormularForm formular={form} onSubmit={handleSubmit}>
      <div className="swiss-business-form">
        <h2>Swiss Business Registration</h2>

        <div className="form-section">
          <h3>Company Information</h3>
          <InputText fieldName="companyName" />
          <InputText fieldName="uid" />
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <InputText fieldName="npa" />
          <InputText fieldName="phone" />
          <InputText fieldName="email" />
        </div>

        <div className="form-section">
          <h3>Optional Information</h3>
          <InputText fieldName="ahv" />
        </div>

        <button type="submit">Register Business</button>
      </div>
    </FormularForm>
  );
};
```

### Multi-Country Address Form

```typescript
interface AddressData {
  country: string;
  street: string;
  city: string;
  postalCode: string;
  state?: string; // Required for US, optional for others
  region?: string; // Different countries use different terms
}

// Dynamic validation based on selected country
const createCountrySpecificValidation = (country: string) => {
  switch (country) {
    case 'US':
      return {
        postalCode: Validators.usZipCode('postalCode', true).build(),
        state: Validators.required('state', true).build()
      };
    case 'CH':
      return {
        postalCode: Validators.swissNPA('postalCode', true).build()
      };
    case 'DE':
      return {
        postalCode: Validators.germanPostalCode('postalCode', true).build()
      };
    case 'FR':
      return {
        postalCode: Validators.frenchPostalCode('postalCode', true).build()
      };
    default:
      return {
        postalCode: Validators.genericPostalCode('postalCode', true).build()
      };
  }
};

const MultiCountryAddressForm = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [form, setForm] = useState<IFormular<AddressData>>();

  useEffect(() => {
    if (selectedCountry) {
      const countryValidation = createCountrySpecificValidation(selectedCountry);

      // Create form with country-specific validation
      const addressSchema: IEntityScheme = {
        name: 'multi-country-address',
        properties: [
          new FieldSchemaBuilder()
            .setName('country')
            .setTypeInput('select')
            .setOptionData('countries', COUNTRY_OPTIONS)
            .setValidationData(true, Validators.required('country', true).build())
            .build(),
          new FieldSchemaBuilder()
            .setName('street')
            .setTypeInput('text')
            .setValidationData(true, Validators.required('street', true).build())
            .build(),
          new FieldSchemaBuilder()
            .setName('city')
            .setTypeInput('text')
            .setValidationData(true, Validators.required('city', true).build())
            .build(),
          new FieldSchemaBuilder()
            .setName('postalCode')
            .setTypeInput('text')
            .setValidationData(true, countryValidation.postalCode)
            .build(),
          // Conditionally add state field for US
          ...(selectedCountry === 'US' ? [
            new FieldSchemaBuilder()
              .setName('state')
              .setTypeInput('select')
              .setOptionData('states', US_STATES_OPTIONS)
              .setValidationData(true, countryValidation.state)
              .build()
          ] : [])
        ]
      };

      const newForm = formManager.createFromSchema<AddressData>(addressSchema);
      setForm(newForm);
    }
  }, [selectedCountry]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleSubmit = (data: Record<string, InputDataTypes>) => {
    console.log('Address submitted:', data);
  };

  if (!form) {
    return (
      <div>
        <label>Select Country:</label>
        <select onChange={(e) => handleCountryChange(e.target.value)}>
          <option value="">Choose a country...</option>
          <option value="US">United States</option>
          <option value="CH">Switzerland</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
        </select>
      </div>
    );
  }

  return (
    <FormularForm formular={form} onSubmit={handleSubmit}>
      <div className="address-form">
        <Select fieldName="country" />
        <InputText fieldName="street" />
        <InputText fieldName="city" />
        <InputText fieldName="postalCode" />
        {selectedCountry === 'US' && <Select fieldName="state" />}
        <button type="submit">Save Address</button>
      </div>
    </FormularForm>
  );
};
```

## Advanced Patterns

### Form with Real-time Collaboration

```typescript
// WebSocket-based real-time form collaboration
const CollaborativeForm = ({ formId }: { formId: string }) => {
  const [form, setForm] = useState<IFormular<any>>();
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    // Initialize WebSocket connection
    wsRef.current = new WebSocket(`ws://localhost:8080/forms/${formId}`);

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'field-update':
          // Update field value from another user
          const field = form?.getField(message.fieldName);
          if (field && message.userId !== getCurrentUserId()) {
            field.input.setValue(message.value);
          }
          break;

        case 'collaborator-joined':
          setCollaborators(prev => [...prev, message.userId]);
          break;

        case 'collaborator-left':
          setCollaborators(prev => prev.filter(id => id !== message.userId));
          break;
      }
    };

    return () => {
      wsRef.current?.close();
    };
  }, [formId, form]);

  useEffect(() => {
    if (form) {
      // Subscribe to field changes to broadcast to other users
      form.fields.forEach(field => {
        field.input.notificationManager.subscribe(
          'field:changed',
          (data: any) => {
            wsRef.current?.send(JSON.stringify({
              type: 'field-update',
              formId,
              fieldName: field.input.name,
              value: field.input.value,
              userId: getCurrentUserId()
            }));
          }
        );
      });
    }
  }, [form, formId]);

  return (
    <div className="collaborative-form">
      <div className="collaborators">
        <h4>Active Collaborators ({collaborators.length})</h4>
        {collaborators.map(id => (
          <span key={id} className="collaborator">{id}</span>
        ))}
      </div>

      {form && (
        <FormularForm formular={form} onSubmit={handleSubmit}>
          {/* Form fields */}
        </FormularForm>
      )}
    </div>
  );
};
```

### Form with Autosave and Draft Recovery

```typescript
const AutosaveForm = ({ formId }: { formId: string }) => {
  const [form, setForm] = useState<IFormular<any>>();
  const [lastSaved, setLastSaved] = useState<Date>();
  const [isDraft, setIsDraft] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Autosave functionality
  useEffect(() => {
    if (!form) return;

    const handleFieldChange = debounce(() => {
      const formData = form.getData();
      saveDraft(formId, formData);
      setLastSaved(new Date());
      setIsDraft(true);
    }, 1000); // Save 1 second after last change

    // Subscribe to all field changes
    const unsubscribes = form.fields.map(field =>
      field.input.notificationManager.subscribe('field:changed', handleFieldChange)
    );

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [form, formId]);

  // Load draft on mount
  useEffect(() => {
    const loadDraft = async () => {
      const draft = await getDraft(formId);
      if (draft) {
        // Populate form with draft data
        Object.entries(draft.data).forEach(([fieldName, value]) => {
          const field = form?.getField(fieldName);
          if (field) {
            field.input.setValue(value);
          }
        });
        setIsDraft(true);
        setLastSaved(new Date(draft.savedAt));
      }
    };

    if (form) {
      loadDraft();
    }
  }, [form, formId]);

  const handleSubmit = async (data: Record<string, InputDataTypes>) => {
    try {
      await submitForm(formId, data);
      await deleteDraft(formId); // Remove draft after successful submission
      setIsDraft(false);
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form. Your changes have been saved as draft.');
    }
  };

  const discardDraft = async () => {
    await deleteDraft(formId);
    setIsDraft(false);
    // Reset form to original state
    form?.fields.forEach(field => {
      field.input.setValue(field.input.defaultValue);
    });
  };

  return (
    <div className="autosave-form">
      {isDraft && (
        <div className="draft-notification">
          <span>Draft saved {lastSaved ? formatDistance(lastSaved, new Date()) : ''} ago</span>
          <button onClick={discardDraft}>Discard Draft</button>
        </div>
      )}

      {form && (
        <FormularForm formular={form} onSubmit={handleSubmit}>
          {/* Form fields */}
        </FormularForm>
      )}
    </div>
  );
};
```

## Testing Examples

### Unit Testing Form Validation

```typescript
// Mock form setup for testing
const createMockForm = (fieldDescriptors: IFieldDescriptor[]) => {
  const mockServiceManager = new MockServiceManager();
  const mockFormManager = new MockFormularManager(mockServiceManager);
  return mockFormManager.createFromDescriptors('test-form', fieldDescriptors);
};

// Test validation logic
describe('Email Validation', () => {
  let form: IFormular<any>;
  let emailField: IExtendedInput;

  beforeEach(() => {
    const emailDescriptor: IFieldDescriptor = {
      id: 1,
      name: 'email',
      label: 'Email',
      type: 'email',
      value: '',
      defaultValue: '',
      objectValue: null,
      errors: [],
      guides: [],
      validationOptions: {
        required: { value: true },
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
      },
      options: [],
      isValid: false,
      isDirty: false,
      isPristine: true,
      isFocus: false,
      shouldValidate: true
    };

    form = createMockForm([emailDescriptor]);
    emailField = form.getField('email')!;
  });

  test('should validate correct email format', async () => {
    emailField.input.setValue('test@example.com');
    const results = emailField.input.validationManager.validate(emailField);

    expect(results[0].state).toBe(true);
    expect(emailField.input.isValid).toBe(true);
  });

  test('should reject invalid email format', async () => {
    emailField.input.setValue('invalid-email');
    const results = emailField.input.validationManager.validate(emailField);

    expect(results[0].state).toBe(false);
    expect(results[0].code).toBe(ValidationErrorsCodes.pattern);
    expect(emailField.input.isValid).toBe(false);
  });

  test('should reject empty required field', async () => {
    emailField.input.setValue('');
    const results = emailField.input.validationManager.validate(emailField);

    expect(results.some(r => r.code === ValidationErrorsCodes.required)).toBe(true);
    expect(emailField.input.isValid).toBe(false);
  });
});

// Integration testing with React components
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FormularForm Integration', () => {
  test('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    const form = createMockForm([emailFieldDescriptor, nameFieldDescriptor]);

    render(
      <FormularForm formular={form} onSubmit={mockSubmit}>
        <InputText fieldName="email" />
        <InputText fieldName="name" />
        <button type="submit">Submit</button>
      </FormularForm>
    );

    // Fill in form
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');

    // Submit form
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'John Doe'
      });
    });
  });

  test('should prevent submission with invalid data', async () => {
    const mockSubmit = jest.fn();
    const form = createMockForm([emailFieldDescriptor]);

    render(
      <FormularForm formular={form} onSubmit={mockSubmit}>
        <InputText fieldName="email" />
        <button type="submit">Submit</button>
      </FormularForm>
    );

    // Enter invalid email
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');

    // Try to submit
    fireEvent.click(screen.getByText('Submit'));

    // Should not call submit handler
    expect(mockSubmit).not.toHaveBeenCalled();

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });
});
```

### End-to-End Testing with Cypress

```typescript
// cypress/integration/form-submission.spec.ts
describe('User Registration Form', () => {
    beforeEach(() => {
        cy.visit('/registration')
    })

    it('should successfully register a new user', () => {
        // Fill out the form
        cy.get('[data-testid="username-input"]').type('testuser')
        cy.get('[data-testid="email-input"]').type('test@example.com')
        cy.get('[data-testid="password-input"]').type('SecurePassword123!')
        cy.get('[data-testid="confirm-password-input"]').type('SecurePassword123!')
        cy.get('[data-testid="terms-checkbox"]').check()

        // Submit the form
        cy.get('[data-testid="submit-button"]').click()

        // Verify success
        cy.get('[data-testid="success-message"]').should('be.visible')
        cy.url().should('include', '/welcome')
    })

    it('should show validation errors for invalid input', () => {
        // Try to submit empty form
        cy.get('[data-testid="submit-button"]').click()

        // Check for validation errors
        cy.get('[data-testid="username-error"]').should('contain', 'required')
        cy.get('[data-testid="email-error"]').should('contain', 'required')
        cy.get('[data-testid="password-error"]').should('contain', 'required')
    })

    it('should validate password confirmation', () => {
        cy.get('[data-testid="password-input"]').type('password123')
        cy.get('[data-testid="confirm-password-input"]').type('different123')
        cy.get('[data-testid="submit-button"]').click()

        cy.get('[data-testid="confirm-password-error"]').should('contain', 'Passwords do not match')
    })
})
```

## Performance Optimization

### Memoized Form Components

```typescript
// Optimized form component with React.memo
const OptimizedFormularForm = React.memo(<T extends object>({
  formular,
  children,
  onSubmit
}: IFormularProps<T>) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.formular.id === nextProps.formular.id &&
    prevProps.formular.submitCount === nextProps.formular.submitCount &&
    prevProps.isloading === nextProps.isloading
  );
});

// Optimized field component
const OptimizedInputText = React.memo(({ fieldName }: { fieldName: string }) => {
  const { formInstance } = useFormularContext();
  const field = formInstance?.getField(fieldName);
  const { instance, flags } = useField(field);

  // Memoize expensive operations
  const inputProps = useMemo(() => {
    if (!instance) return {};
    return instance.register();
  }, [instance?.input?.value, instance?.input?.name]);

  const errorMessages = useMemo(() => {
    return instance?.input?.errors.map(error => error.message).join(', ');
  }, [instance?.input?.errors]);

  return (
    <div className={`input-wrapper ${flags.isValid ? 'valid' : 'invalid'}`}>
      <input {...inputProps} />
      {!flags.isValid && flags.isDirty && (
        <span className="error">{errorMessages}</span>
      )}
    </div>
  );
});

// Virtualized form for large datasets
const VirtualizedForm = ({ items }: { items: any[] }) => {
  const { height, width } = useWindowSize();

  return (
    <FixedSizeList
      height={height - 100}
      width={width}
      itemCount={items.length}
      itemSize={80}
      itemData={items}
    >
      {({ index, style, data }) => (
        <div style={style}>
          <OptimizedInputText fieldName={`item-${data[index].id}`} />
        </div>
      )}
    </FixedSizeList>
  );
};
```

These examples demonstrate the flexibility and power of the FORMULAR system across various use cases, from simple forms to complex business applications with custom validation, dynamic fields, and advanced functionality.
