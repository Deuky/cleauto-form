import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Stepper from "./components/Stepper";
import FilePicker from "./components/FilePicker";
import StepIdentification from "./components/steps/StepIdentification";
import StepSignature from "./components/steps/StepSignature";
import StepExtra from "./components/steps/StepExtra";
import PanelNavigation from "./components/panels/PanelNavigation";
import PanelConfidentiality from "./components/panels/PanelConfidentiality";

export default function Assistance() {
  const [submit, setSubmit] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 0, title: "Identification", img: "/id-card.svg" },
    { id: 1, title: "Signature", img: "/signature.svg" },
    { id: 2, title: "Infos supp.", img: "/plus.svg" },
  ];

  const signatureStep = steps.find((step) => step.title == "Signature");

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ mode: "onBlur" });

  const agreementContentRef = useRef(null);
  const agreementContent = watch('agreementContent', null);

  const onSubmit = async (data) => {
    setSubmit(true);
    let requestDate = new Date();

    if (!data.signature || data.signature.children.length === 0) {
      alert("Veuillez signer pour continuer");
      setSubmit(false);
      return;
    }

    let form = new FormData();
    form.append("dossierId", data.dossierId);

    if (data.idCard && data.idCard.length) form.append("attachments[idCard]", data.idCard[0]);
    if (data.grayCard && data.grayCard.length) form.append("attachments[grayCard]", data.grayCard[0]);

    try {
      form.append("agreement[rgpd][biometry][signature]", data.signature.outerHTML);
      form.append('agreement[rgpd][status]', data.agreementStatus);
      form.append('agreement[rgpd][content]', data.agreementContent);
      form.append('agreement[rgpd][requestDate]', [requestDate.getFullYear(), ('0'+(requestDate.getMonth()+1)).slice(-2), ('0'+requestDate.getDate()).slice(-2)].join('-') + ' ' + requestDate.toLocaleTimeString() );
      form.append('agreement[rgpd][url]', document.URL);

      const response  = await fetch("", { method: "POST", body: form });

      if (response.ok) {
        await response.json();
        reset();
        alert("Formulaire envoyé avec succès");
      } else {
        alert("Erreur lors de l'envoi du formulaire");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi du formulaire");
    } finally {
      setSubmit(false);
    }
  };

  const onNext = async () => {
    const valid = await trigger();
    if (valid) setCurrentStep((s) => s + 1)
  };

  const onPrev = () => {
    if (currentStep <= 0) {
      return;
    }
    setCurrentStep((s) => s - 1);
    setValue('agreementStatus', false);
  }

  return (
    <div className="container">
      <div className="header"><img src="/cleauto-logo.png" alt="CLEAUTO"/></div>
      <Stepper steps={steps} currentStep={currentStep} />
      
      <h2>Formulaire de dépannage</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <StepIdentification 
            register={register}
            errors={errors}
          />
        )}

        {currentStep === 1 && (
          <StepSignature 
            register={register}
            setValue={setValue}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
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
                <span ref={agreementContentRef}>J'accepte que Cleauto.be génère un dossier PDF regroupant ma pièce d'identité, ma carte grise ainsi que ma signature numérisée. Je note que ces informations sont transmises par canal sécurisé pour impression papier et qu'aucune copie numérique n'est conservée sur le serveur web après l'envoi.</span>
            </label>
            { errors.agreementStatus && <><br /><p> { errors.agreementStatus.message } </p></> }
          </>

          ): <></>}

        <PanelNavigation
          steps={steps}
          currentStep={currentStep}
          onPrev={onPrev}
          onNext={onNext}
          submit={submit}
        />

        {currentStep == (steps.length-1) ? (
          <PanelConfidentiality 
            dataRetention={true}
          />
        ): <></>}
      </form>
    </div>
  );
}
