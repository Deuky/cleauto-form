import { useRef } from "react";
import Signature from "@uiw/react-signature";

export default function StepSignature({ register, setValue, errors }) {
  const signatureRef = useRef(null);

  register('signature', {required: "Veuillez signer"});

  function onClick() {
    setValue('signature', signatureRef.current.svg)
  }

  return ( 
    <div className="form-group">
      <div className="signature-header">
        <label>Signature *</label>
        <button 
          type="button" 
          onClick={() => signatureRef.current?.clear()}
          className="btn-clear"
        >
          Effacer
        </button>
      </div>
      <div className="signature-container">
        <Signature 
          ref={signatureRef} 
          width={650} 
          height={300} 
          onClick={onClick}
          viewBox="0 0 650 300"
        />
      </div>
      { errors.signature && <><br /><p> { errors.signature.message } </p></> }
    </div>
  );
}