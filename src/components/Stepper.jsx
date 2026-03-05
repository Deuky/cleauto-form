export default function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`step ${index <= currentStep ? "active" : ""}`}
        >
          <span>{step.title}</span>
          {step.img && <img src={step.img} alt="" />}
        </div>
      ))}
    </div>
  );
}
