export default function StepExtra({ register, watch }) {
  const location = watch("location");

  return (
    <>
      <h2>Infos supplémentaires</h2>

      <textarea
        placeholder="Informations complémentaires"
        {...register("extraInfo")}
      />
    </>
  );
}
