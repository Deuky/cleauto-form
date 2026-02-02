export default function StepExtra({ register, watch }) {
  const location = watch("location");

  return (
    <>
      <h2>Infos supplémentaires</h2>

      {location === "domicile" && (
        <input
          placeholder="Adresse complète"
          {...register("address", { required: true })}
        />
      )}

      <input
        type="file"
        {...register("keyPhoto")}
      />

      <textarea
        placeholder="Informations complémentaires"
        {...register("extraInfo")}
      />
    </>
  );
}
