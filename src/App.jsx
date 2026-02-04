import { useState } from "react";
import { useForm } from "react-hook-form";

import StepPersonal from "./components/steps/StepPersonal";
import StepCar from "./components/steps/StepCar";
import StepRequest from "./components/steps/StepRequest";
import StepExtra from "./components/steps/StepExtra";
import Stepper from "./components/Stepper";

const steps = [
  { id: 0, title: "Infos personnelles", img: "/person.svg" },
  { id: 1, title: "Voiture", img: "/car.svg" },
  { id: 2, title: "La demande", img: "/key.svg" },
  { id: 3, title: "Infos supp.", img: "/plus.svg" },
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
    <>
      <div className="container">
        <div style={{'text-align': "center"}}><img style={{height: "85px", 'margin-bottom': "10px"}} src="/cleauto-logo.png" /></div>
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

          {currentStep == (steps.length-1) ? (
            <div style={{display: "flex", 'align-items': "flex-start", 'justify-content': "space-around", 'text-align': "justify"}}>
              <input type="checkbox" style={{width: "inherit", 'margin-top': "3px"}} />
              <span style={{width: "90%", 'font-size': "small"}}>J'accepte que les informations saisies, y compris les photos de ma carte grise et de mes clés, soient utilisées par Cleauto pour me recontacter et traiter ma demande. Je reconnais avoir pris connaissance que mes données seront supprimées une fois mon dossier clôturé.</span>
            </div>
            ): <></>}

          <div className="buttons" style={{ 'margin-bottom': "12px" }}>
            <button type="button" onClick={onPrev}>
              ← Précédent
            </button>

            {currentStep < steps.length - 1 ? (
              <button type="button" onClick={onNext}>
                Suivant →
              </button>
            ) : (
              <>
                <button type="submit" style={{cursor: "not-allowed", 'pointer-events': "none", 'background-color': "gray"}}>
                  Envoyer la demande
                </button>
              </>
            )}
          </div>

          {currentStep == (steps.length-1) ? (
            <>
              <div className="confidentiality"><b>Confidentialité</b> : Les données collectées sont envoyées directement par email à Cleauto et ne sont pas enregistrées en base de données sur ce site. Elles sont utilisées exclusivement pour vous rappeler et traiter votre dossier. Une fois votre demande traitée, l'email contenant vos informations et photos (carte grise, clés) est définitivement supprimé. Vous pouvez exercer votre droit de suppression à tout moment en nous contactant.</div>
            </>
            ): <></>}
        </form>
      </div>
    </>
  );
}
