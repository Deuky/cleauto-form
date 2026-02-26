import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Signature from "@uiw/react-signature";
import FilePicker from "./components/FilePicker";

export default function Depannage() {
  const signatureRef = useRef(null);
  const [submit, setSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const svgToImage = (svg) => {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = svg.clientWidth;
    canvas.height = svg.clientHeight;

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob(resolve, "image/png");
      };
      img.src = url;
    });
  };

  const onSubmit = async (data) => {
    setSubmit(true);

    if (!signatureRef.current || !signatureRef.current.svg || signatureRef.current.svg.children.length === 0) {
      alert("Veuillez signer pour continuer");
      setSubmit(false);
      return;
    }

    let form = new FormData();
    form.append("depannage[dossierId]", data.dossierId);

    if (data.idCard && data.idCard.length) form.append("depannage[idCard]", data.idCard[0]);
    if (data.grayCard && data.grayCard.length) form.append("depannage[grayCard]", data.grayCard[0]);

    try {
      const signatureBlob = await svgToImage(signatureRef.current.svg);
      form.append("depannage[signature]", signatureBlob, "signature.png");

      const response = await fetch("/mailer", { method: "POST", body: form });

      if (response.ok) {
        await response.json();
        reset();
        signatureRef.current.clear();
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

  return (
    <div className="container">
      <div className="header"><img src="/cleauto-logo.png" alt="CLEAUTO"/></div>
      <h2>Formulaire de dépannage</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="dossierId">Numéro de dossier *</label>
          <input
            id="dossierId"
            type="text"
            placeholder="Entrez le numéro de dossier"
            {...register("dossierId", {
              required: "Le numéro de dossier est obligatoire",
              pattern: {
                value: /^[0-9A-Z*]{2}-[0-9A-Z]{4} [0-9A-Z]{4}-[0-9A-Z]{4}$/i,
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
            <Signature ref={signatureRef} width={400} height={200} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submit} className="btn-primary">
            {submit ? "Envoi en cours..." : "Envoyer"}
          </button>
        </div>
      </form>
    </div>
  );
}
