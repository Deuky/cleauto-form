import { useRef, useState } from "react";
import YesNoToggle from "../YesNoToggle"

export default function StepCar({ register, errors, isHandFree, setValue, allKeyLostRequest, hasCarOpened }) {
  const inputRefVIN = useRef(null);
  const inputRefKey = useRef(null);
  const [previewVIN, setPreviewVIN] = useState(null);
  const [previewKey, setPreviewKey] = useState(null);

  const handleFileVIN = (file) => {
    if (!file) return;

    setPreviewVIN(URL.createObjectURL(file));
  };

  const handleFileKey = (file) => {
    if (!file) return;

    setPreviewKey(URL.createObjectURL(file));
  };

  const registerWithRef = (name, ref, preview) => {
    let r = register(name);
    let initialRef = r.ref;
    let initialChange = r.onChange;

    r.ref = (el) => {
      initialRef(el);
      ref.current = el;
    };

    if (preview) {
      r.onChange = (e) => {
        preview(e.target.files[0])
        initialChange(e);
      };
    }

    return r;
  };

  const allKeyLostProcess = allKeyLostRequest && !hasCarOpened;

  const openCamera = (input) => {
    input.current.capture = 'environment';
    input.current.click();
  };

  const openGallery = (input) => {
    input.current.capture = undefined;
    input.current.click();
  };

  return (
    <>
      <h2>Informations véhicule</h2>

      {
        allKeyLostRequest && 
        (
          <>
            <input 
              placeholder="Adresse de la voiture à dépanner"
              {...register('address', {required: "Champ requis"})}
            />
            {errors.address && <p> {errors.address.message} </p> }
          </>
        )
      }

      {
        !allKeyLostProcess && 
        (
          <>
            <h3> Photo carte grise: Numéro de chassis (VIN) </h3>
            <label className="input-notice">* Exemple: 1HGCM82633A123456</label>
            <div className="vin">

              <button
                type="button"
                onClick={() => openCamera(inputRefVIN)}
              ><img src="/photo.svg" /></button>

              <button
                type="button"
                onClick={() => openGallery(inputRefVIN)}
              ><img src="/gallery.svg" /></button>
              <div className="preview">
                {
                  previewVIN ?
                      <img src={previewVIN}  alt="VIN preview" />
                    : <></>
                }
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                {...registerWithRef('VIN', inputRefVIN, handleFileVIN)}
              />
              
            </div>
          </>
        )
      }

      <h3> Modèle de la voiture <span>🚘</span> </h3>

      <input
        placeholder="Marque"
        {...register("brand", { required: "Champ requis" })}
      />
      {errors.brand && <p> {errors.brand.message} </p> }

      <input
        placeholder="Modèle"
        {...register("model", { required: "Champ requis"  })}
      />
      {errors.model && <p> {errors.model.message} </p> }

      {
        !allKeyLostProcess && 
          !previewVIN &&
            <>
              <input
                placeholder="VIN"
                maxLength={17}
                {...register("VINCode", {
                  pattern: {
                    value: /^[A-HJ-NPR-Z0-9]{17}$/i,
                    message: "Numéro de châssis (VIN) invalide"
                  }
                })}
              />
              {errors['VINCode'] && <p> {errors['VINCode'].message} </p> }
            </> 
      }

      <select {...register("fuel", { required: "Champ requis" })}>
        <option value="">Carburant</option>
        <option value="diesel">Diesel</option>
        <option value="essence">Essence</option>
        <option value="hybride">Hybride</option>
        <option value="electrique">Électrique</option>
      </select>
      {errors.fuel && <p> {errors.fuel.message} </p> }

      <input
        type="date"
        {...register("firstRegistration")}
      />
      <label className="input-notice">* premier imatriculation</label>



      {
        !allKeyLostRequest && 
        (
          <>
            <h3> Photo de la clef <span>🔑</span></h3>
            <div className="vin">

              <button
                type="button"
                onClick={() => openCamera(inputRefKey)}
              ><img src="/photo.svg" /></button>
              <button
                type="button"
                onClick={() => openGallery(inputRefKey)}
              ><img src="/gallery.svg" /></button>
              <div className="preview">
                {
                  previewKey ?
                      <img src={previewKey}  alt="preview Key" />
                    : <></>
                }
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                { ...registerWithRef('key', inputRefKey, handleFileKey) }
              />

            </div>
          </>
        )
      }
      

      <YesNoToggle
        value={isHandFree}
        onChange={(e, val) => {
          setValue("isHandFree", val);
        }}
        label="Main libre ?"
      />
    </>
  );
}
