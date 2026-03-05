import FilePicker from '../FilePicker';

export default function StepIdentification({ register, errors }) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="dossierId">Numéro de dossier *</label>
        <input
          id="dossierId"
          type="text"
          placeholder="XX-XXXX XXXX-XXXX"
          {...register("dossierId", {
            required: "Le numéro de dossier est obligatoire",
            pattern: {
              value: /^[0-9A-Z\*]{2}-[0-9A-Z]{4} [0-9A-Z]{4}-[0-9A-Z]{4}$/i,
              message:
                "Format attendu: XX-XXXX XXXX-XXXX (caractères 0-9/A-Z)",
            },
          })}
        />
        {errors.dossierId && <span className="error">{errors.dossierId.message}</span>}
      </div>

      <FilePicker
        name="idCard"
        label="Photo carte d'identité *"
        register={register}
        validation={{
          required: "La photo de carte d'identité est obligatoire",
          validate: {
            fileSize: (file) => {
              if (!file || file.length === 0) return true;
              return file[0].size <= 5000000 || "La taille du fichier ne doit pas dépasser 5MB";
            },
            fileType: (file) => {
              if (!file || file.length === 0) return true;
              const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
              return validTypes.includes(file[0].type) || "Le fichier doit être une image";
            },
          },
        }}
        errors={errors}
      />

      <FilePicker
        name="grayCard"
        label="Photo carte grise *"
        register={register}
        validation={{
          required: "La photo de carte grise est obligatoire",
          validate: {
            fileSize: (file) => {
              if (!file || file.length === 0) return true;
              return file[0].size <= 5000000 || "La taille du fichier ne doit pas dépasser 5MB";
            },
            fileType: (file) => {
              if (!file || file.length === 0) return true;
              const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
              return validTypes.includes(file[0].type) || "Le fichier doit être une image";
            },
          },
        }}
        errors={errors}
      />
    </>
  );
}