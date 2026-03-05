import { useRef, useEffect } from "react";
import Signature from "@uiw/react-signature";

export default function StepSignature({ register, setValue, errors }) {
  const signatureRef = useRef(null);
  const reg = register('signature', {
    required: "Veuillez signer"
  });
  const {ref} = reg;
  useEffect(() => {
    if (!signatureRef?.current?.svg?.childElementCount) {
      setValue('signature', null);

      return;
    }

    return () => {
      setValue('signature', null);
    }
  }, [signatureRef]);

  function handleEnd(e) {
    if (!signatureRef?.current) {
      return;
    }

    setValue('signature', signatureRef.current.svg);
  }

  function clear() {
    ref?.current?.clear();
    setValue('signature', null);
  }

  return ( 
    <div className="form-group">
      <div className="signature-header">
        <label>Signature *</label>
        <button 
          type="button" 
          className="btn-clear"
          onClick={clear}
        >
          Effacer
        </button>
      </div>
      <div className="signature-container">
        <Signature 
          width={650} 
          height={300} 
          onClick={handleEnd}
          viewBox="0 0 650 300"
          ref={signatureRef}
        />
      </div>
      <input 
        hidden 
        {...reg}
      />
      { errors.signature && <><br /><p> { errors.signature.message } </p></> }
    </div>
  );
}