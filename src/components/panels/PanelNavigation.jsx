import ButtonSend from "../buttons/ButtonSend";

export default function PanelNavigation({ steps, currentStep, onPrev, onNext, submit })
{
	const hasPrev = (currentStep > 0);
	const hasNext = (currentStep < (steps.length - 1));

	return  (
		<div className="buttons">
      <button type="button" onClick={onPrev} disabled={!hasPrev}>
        ← Précédent
      </button>

          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={onNext}>
              Suivant →
            </button>
          ) : (
            <ButtonSend 
              submit={submit}
            />
          )}
        </div>
    );
}