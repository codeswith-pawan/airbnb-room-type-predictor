import type { ChangeEvent, ReactNode } from "react";

interface BaseProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

function FieldLabel({ label, icon, id }: { label: string; icon?: ReactNode; id: string }) {
  return (
    <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-ink-700">
      {icon ? <span className="text-ink-500">{icon}</span> : null}
      {label}
    </label>
  );
}

function FieldMessage({ error, hint }: { error?: string; hint?: string }) {
  if (error) return <p className="field-error">{error}</p>;
  if (hint) return <p className="mt-1.5 text-[12px] text-ink-500">{hint}</p>;
  return null;
}

interface TextFieldProps extends BaseProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function TextField({ id, label, icon, value, error, hint, placeholder, onChange }: TextFieldProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} icon={icon} />
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className={`field-input ${error ? "!border-signal-red ring-2 ring-signal-red/10" : ""}`}
        aria-invalid={Boolean(error)}
      />
      <FieldMessage error={error} hint={hint} />
    </div>
  );
}

interface NumberFieldProps extends BaseProps {
  value: string;
  step?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function NumberField({
  id,
  label,
  icon,
  value,
  error,
  hint,
  step = "any",
  prefix,
  suffix,
  placeholder,
  onChange,
}: NumberFieldProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} icon={icon} />
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14.5px] font-medium text-ink-500">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className={`field-input font-mono ${prefix ? "pl-7" : ""} ${suffix ? "pr-14" : ""} ${
            error ? "!border-signal-red ring-2 ring-signal-red/10" : ""
          }`}
          aria-invalid={Boolean(error)}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[12.5px] text-ink-500">
            {suffix}
          </span>
        ) : null}
      </div>
      <FieldMessage error={error} hint={hint} />
    </div>
  );
}

interface SelectFieldProps extends BaseProps {
  value: string;
  options: readonly string[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export function SelectField({ id, label, icon, value, error, hint, options, placeholder, onChange }: SelectFieldProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} icon={icon} />
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
          className={`field-input appearance-none pr-9 ${
            error ? "!border-signal-red ring-2 ring-signal-red/10" : ""
          }`}
          aria-invalid={Boolean(error)}
        >
          <option value="" disabled>
            {placeholder ?? "Select an option"}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <FieldMessage error={error} hint={hint} />
    </div>
  );
}
