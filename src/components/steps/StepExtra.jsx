export default function StepExtra({ register }) {

  return (
    <>
      <h2>Infos supplémentaires</h2>

      <textarea
        placeholder="Informations complémentaires"
        maxLength={250}
        {...register("extraInfo", {maxLength: 250})}
      />
    </>
  );
}
