export default function Field({ name, label, error, children, hint }) {
  return <div className="field"><label htmlFor={name}>{label}</label>{children}{hint && <small id={`${name}-hint`}>{hint}</small>}{error && <span className="field-error" id={`${name}-error`} role="alert">{error}</span>}</div>;
}
