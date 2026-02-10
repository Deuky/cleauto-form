import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";

import StepPersonal from "./components/steps/StepPersonal";
import StepCar from "./components/steps/StepCar";
import StepRequest from "./components/steps/StepRequest";
import StepExtra from "./components/steps/StepExtra";
import Stepper from "./components/Stepper";

const steps = [
  { id: 0, title: "Infos personnelles", img: "/person.svg",  },
  { id: 1, title: "La demande", img: "/key.svg" },
  { id: 2, title: "Infos voiture", img: "/car.svg" },
  { id: 3, title: "Infos supp.", img: "/plus.svg" },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [send, setSend] = useState(false);
  const [submit, setSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const isHandFree = watch('isHandFree', false);
  
  const repairKeyRequest = watch('repairKeyRequest', false);
  const copyKeyRequest = watch('copyKeyRequest', false);
  const hasCommandWorks = watch('hasCommandWorks', false);
  const allKeyLostRequest = watch('allKeyLostRequest', false);
  const hasCarOpened = watch('hasCarOpened', false);
  const agreementContent = watch('agreementContent', null);

  const agreementContentRef = useRef(null);

  const onNext = async () => {
    const valid = await trigger();
    if (valid) setCurrentStep((s) => s + 1);
  };

  const onPrev = () => {
    if (currentStep <= 0) {
      return;
    }
    setCurrentStep((s) => s - 1); 
    setValue('agreementStatus', false);
  }

  const onSubmit = async (data) => {
    setSubmit(true);
    let form = new FormData();
    form.append('personal[name]', data.fullName);
    form.append('personal[phone]', data.phone);
    form.append('personal[email]', data.email);

    form.append('car[brand]', data.brand);
    form.append('car[model]', data.model);
    form.append('car[fuel]', data.fuel);
    form.append('car[first-registration]', data.firstRegistration);
    if (data.VIN && data.VIN.length) {
      form.append('car[attachments][]', data.VIN[0]);
    } else {
      form.append('car[VIN]', data.VINCode);
    }
    form.append('car[address]', data.address);

    form.append('key[is-hand-free]', data.isHandFree || false);
    if (data.key && data.key.length) {
      form.append('key[attachments][]', data.key[0]);
    }

    form.append('request[repair-key]', data.repairKeyRequest || false);
    form.append('request[copy-key]', data.copyKeyRequest || false);
    form.append('request[command-works]', data.hasCommandWorks || false);
    form.append('request[all-key-lost]', data.allKeyLostRequest || false);
    form.append('request[car-opened]', data.hasCarOpened || false);

    form.append('extra[informations]', data.extraInfo);

    form.append('agreement[rgpd][status]', data.agreementStatus);
    form.append('agreement[rgpd][content]', data.agreementContent);
    form.append('agreement[rgpd][request-date]', new Date().toLocaleString());
    form.append('agreement[rgpd][url]', document.URL);

    fetch(
      "/mailer",
      {
        method: "POST",
        body: form
      }
    ).then(function(response, b, c) {
      const result = response.json().then(function(r) {
        setSend(true);
      });
    });
  };

  return (
    <>
      <div className="container">
        <div className="header"><img src="/cleauto-logo.png" /></div>

        { 
          (send || false) && 
          <>
            <h3>Merci pour votre demande 🔑</h3>
            <h4>L’équipe CLEAUTO vous recontactera très rapidement avec toutes les informations nécessaires.</h4>
            <h4>À très bientôt,</h4>
            <h3>L’équipe CLEAUTO</h3>
          </> || 
          (
            <>
              <Stepper steps={steps} currentStep={currentStep} />
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 0 && (
                  <StepPersonal register={register} errors={errors} />
                )}

                {currentStep === 1 && (
                  <StepRequest 
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    repairKeyRequest={repairKeyRequest}
                    copyKeyRequest={copyKeyRequest}
                    hasCommandWorks={hasCommandWorks}
                    allKeyLostRequest={allKeyLostRequest}
                    hasCarOpened={hasCarOpened}
                  />
                )}

                {currentStep === 2 && (
                  <StepCar
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    isHandFree={isHandFree}
                    repairKeyRequest={repairKeyRequest}
                    copyKeyRequest={copyKeyRequest}
                    hasCommandWorks={hasCommandWorks}
                    allKeyLostRequest={allKeyLostRequest}
                    hasCarOpened={hasCarOpened}
                  />
                )}

                {currentStep === 3 && (
                  <StepExtra
                    register={register}
                    watch={watch}
                  />
                )}

                {currentStep == (steps.length-1) ? (
                  <>
                    <label className="agreement">
                        <input 
                          type="checkbox" 
                          onClick={(el) => {
                            setValue('agreementContent', el.currentTarget.checked ? agreementContentRef.current.innerHTML : "");
                          }}
                          { ... register('agreementStatus', { required: "Acceptez le traitement des informations" }) }
                        />
                        <span ref={agreementContentRef}>J'accepte que les informations saisies, y compris les photos de ma carte grise et de mes clés, soient utilisées par Cleauto pour me recontacter et traiter ma demande. Je reconnais avoir pris connaissance que mes données seront supprimées une fois mon dossier clôturé.</span>
                    </label>
                    { errors.agreementStatus && <><br /><p> { errors.agreementStatus.message } </p></> }
                  </>

                  ): <></>}

                <div className="buttons">
                  <button type="button" onClick={onPrev}>
                    ← Précédent
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button type="button" onClick={onNext}>
                      Suivant →
                    </button>
                  ) : (
                    <>
                      <button type="submit" disabled={submit}>
                        {
                          submit ?
                          <BarLoader />
                          :
                          <>Envoyer la demande</>
                        }
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
            </>
          )
        }
      </div>

      <div className="container footer">
        <span className="copyright">&copy; Copyright {new Date().getFullYear()} CLEAUTO</span>
        <span className="website"><a href="https://www.cleauto.be">cleauto.be</a></span>
        <span className="networking"><a href="https://www.facebook.com/profile.php?id=61566850178383"><img className="logo" src="facebook.svg" /></a></span>
      </div>
    </>
  );
}
