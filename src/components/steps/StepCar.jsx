export default function StepCar({ register, errors }) {
  return (
    <>
      <h2>Informations véhicule</h2>

      <input
        placeholder="Marque"
        {...register("brand", { required: true })}
      />

      <input
        placeholder="Modèle"
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
        placeholder="VIN"
        {...register("vin", { required: true })}
      />

      <input
        type="date"
        {...register("firstRegistration")}
      />
    </>
  );
}
