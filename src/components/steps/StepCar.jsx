import { useState } from "react";
import YesNoToggle from "../YesNoToggle";
import FilePicker from "../FilePicker";

export default function StepCar({ register, errors, isHandFree, setValue, allKeyLostRequest, hasCarOpened }) {
  const [previewVIN, setPreviewVIN] = useState(null);
  const [_previewKey, set_previewKey] = useState(null);

  const allKeyLostProcess = allKeyLostRequest && !hasCarOpened;

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
            <FilePicker
              name="VIN"
              label=""
              register={register}
              validation={{
                required: "La photo de la carte grise est requise",
                validate: {
                  fileSize: (file) => {
                    if (!file || file.length === 0) return true;
                    return file[0].size <= 5000000 || "La taille du fichier ne doit pas dépasser 5MB";
                  },
                  fileType: (file) => {
                    if (!file || file.length === 0) return true;
                    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
                    return validTypes.includes(file[0].type) || "Le fichier doit être une image";
                  }
                }
              }}
              errors={errors}
              onPreview={setPreviewVIN}
            />
            {/* pass preview callback */}
            {/* capture preview to control VIN text input visibility */}
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
        <option value="petrol">Essence</option>
        <option value="hybrid">Hybride</option>
        <option value="electric">Électrique</option>
        <option value="gas">Gaz</option>
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
            <FilePicker
              name="key"
              label=""
              register={register}
              validation={{
                required: "La photo de la clef est requise",
                validate: {
                  fileSize: (file) => {
                    if (!file || file.length === 0) return true;
                    return file[0].size <= 5000000 || "La taille du fichier ne doit pas dépasser 5MB";
                  },
                  fileType: (file) => {
                    if (!file || file.length === 0) return true;
                    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
                    return validTypes.includes(file[0].type) || "Le fichier doit être une image";
                  }
                }
              }}
              errors={errors}
              onPreview={set_previewKey}
            />
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
