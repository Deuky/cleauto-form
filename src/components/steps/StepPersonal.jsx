export default function StepPersonal({ register, errors }) {
  return (
    <>
      <h2>Infos personnelles</h2>

      <input
        placeholder="Nom & Prénom"
        {...register("fullName", { required: "Champ requis" })}
      />
      {errors.fullName && <p>{errors.fullName.message}</p>}

      <input
        placeholder="Téléphone"
        {...register("phone")}
      />

      <input
        placeholder="Email"
        {...register("email", {
          required: "Email requis",
          pattern: {
            value: /^\S+@\S+$/,
            message: "Email invalide",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
    </>
  );
}
