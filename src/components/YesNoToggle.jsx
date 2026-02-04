export function YesNoToggleButton({ value, onChange }) {
  return (
    <div
      className={`yesno-toggle ${value ? "yes" : "no"}`}
      onClick={() => onChange(!value)}
    >
      <div className="slider" />
      <span className="label yes">Oui</span>
      <span className="label no">Non</span>      
    </div>
  );
}

export default function YesNoToggle({value, onChange, label}) {
  return (
    <div class="yesno-toggle-input">
      <YesNoToggleButton 
        value={value}
        onChange={onChange}
      />

      <label>{label}</label>
    </div>
  );
}