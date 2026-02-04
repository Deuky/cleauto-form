export default function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`step ${index <= currentStep ? "active" : ""}`}
        >
          <span>{step.title}</span>
          <img src={step.img} />
        </div>
      ))}
    </div>
  );
}
