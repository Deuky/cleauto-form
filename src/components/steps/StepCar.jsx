import { useRef, useState } from "react";
import YesNoToggle from "../YesNoToggle"

export default function StepCar({ register, errors }) {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [handFree, setHandFree] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <h2>Informations véhicule</h2>

      <h3> Photo carte grise: Numéro de chassis (VIN) </h3>
      <label className="input-notice">* Exemple: 1HGCM82633A123456</label>

      <div className="vin">

        <button
          type="button"
          onClick={() => cameraInputRef.current.click()}
        ><img src="/photo.svg" /></button>
        <button
          type="button"
          onClick={() => galleryInputRef.current.click()}
        ><img src="/gallery.svg" /></button>
        <div className="preview">
          {
            preview ?
                <img src={preview}  alt="VIN preview" />
              : <></>
          }
        </div>
        <input
          ref={cameraInputRef}
          type="file"
          name="VIN"
          accept="image/*"
          capture="environment"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <input
          ref={galleryInputRef}
          type="file"
          name="VIN"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
        
      </div>

      <h3> Modèle de la voiture <span>🚘</span> </h3>

      <input
        placeholder="Marque"
        {...register("brand", { required: true })}
      />

      <input
        placeholder="Modèle"
        {...register("model", { required: true })}
      />

      <input
        placeholder="VIN"
        {...register("model", { required: true })}
      />

      <select {...register("fuel", { required: true })}>
        <option value="">Carburant</option>
        <option value="diesel">Diesel</option>
        <option value="essence">Essence</option>
        <option value="hybride">Hybride</option>
        <option value="electrique">Électrique</option>
      </select>

      <input
        type="date"
        placeholder="test"
        {...register("firstRegistration")}
      />
      <label className="input-notice">* premier imatriculation</label>

      <h3> Photo de la clef <span>🔑</span></h3>

      <div className="vin">

        <button
          type="button"
          onClick={() => cameraInputRef.current.click()}
        ><img src="/photo.svg" /></button>
        <button
          type="button"
          onClick={() => galleryInputRef.current.click()}
        ><img src="/gallery.svg" /></button>
        <div className="preview">
          {
            preview ?
                <img src={preview}  alt="VIN preview" />
              : <></>
          }
        </div>
        <input
          ref={cameraInputRef}
          type="file"
          name="VIN"
          accept="image/*"
          capture="environment"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <input
          ref={galleryInputRef}
          type="file"
          name="VIN"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
        
      </div>

      <YesNoToggle
        value={handFree}
        onChange={(val) => setHandFree(val)}
        label="Main libre ?"
      />
    </>
  );
}
