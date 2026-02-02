import { useState } from "react";
import { useForm } from "react-hook-form";

import StepPersonal from "./components/steps/StepPersonal";
import StepCar from "./components/steps/StepCar";
import StepRequest from "./components/steps/StepRequest";
import StepExtra from "./components/steps/StepExtra";
import Stepper from "./components/Stepper";

const steps = [
  { id: 0, title: "Infos personnelles" },
  { id: 1, title: "Voiture" },
  { id: 2, title: "La demande" },
  { id: 3, title: "Infos supp." },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onNext = async () => {
    const valid = await trigger();
    if (valid) setCurrentStep((s) => s + 1);
  };

  const onPrev = () => {
    if (currentStep <= 0) {
      return;
    }
    setCurrentStep((s) => s - 1);
  }

  const onSubmit = (data) => {
    let form = new FormData();
    form.append('personal[name]', data.fullName);
    form.append('personal[phone]', data.phone);
    form.append('personal[email]', data.email);
    form.append('car[brand]', data.brand);
    form.append('car[model]', data.model);
    form.append('car[fuel]', data.fuel);
    form.append('car[VIN]', data.vin);
    form.append('car[first-registration]', data.firstRegistration);
    form.append('request[key-type]', data.keyType);
    form.append('request[target-intervention]', data.location);
    form.append('request[keys]', data.hasKey);
    form.append('extra[address]', data.address);
    form.append('extra[information]', data.extraInfo);

    for(let i = 0; i < data.keyPhoto.length; i++){
      form.append('extra[attachments][]', data.keyPhoto.item(i));
    }

    fetch(
      "/mailer",
      {
        method: "POST",
        body: form
      }
    );
  };

  return (
    <div className="container">
      <Stepper steps={steps} currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <StepPersonal register={register} errors={errors} />
        )}

        {currentStep === 1 && (
          <StepCar register={register} errors={errors} />
        )}

        {currentStep === 2 && (
          <StepRequest register={register} errors={errors} />
        )}

        {currentStep === 3 && (
          <StepExtra
            register={register}
            watch={watch}
          />
        )}

        <div className="buttons">
          <button type="button" onClick={onPrev}>
            ← Précédent
          </button>

          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={onNext}>
              Suivant →
            </button>
          ) : (
            <button type="submit">
              Envoyer la demande
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
