export function YesNoToggleButton({ value, onChange }) {

  return (
    <div
      className={`yesno-toggle ${value ? "yes" : "no"}`}
      onClick={(e) => onChange(e, !value)}
    >
      <div className="slider" />
      <span className="label yes">Oui</span>
      <span className="label no">Non</span>  
    </div>
  );
}

export default function YesNoToggle({value, onChange, label}) {
  return (
    <label className="yesno-toggle-input" onClick={(e) => onChange(e, !value)}>
      <YesNoToggleButton 
        value={value}
        onChange={onChange}
      />

      <span>{label}</span>
    </label>
  );
}