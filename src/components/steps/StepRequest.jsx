export default function StepRequest({ register }) {
  return (
    <>
      <h2>La demande</h2>

      <select {...register("keyType", { required: true })}>
        <option value="">Type de clé</option>
        <option value="remote">Clé avec télécommande</option>
        <option value="simple">Clé sans télécommande</option>
        <option value="proximity">Proximity key</option>
      </select>

      <select {...register("location", { required: true })}>
        <option value="">Lieu de programmation</option>
        <option value="atelier">Atelier</option>
        <option value="domicile">À domicile</option>
      </select>

      <select {...register("hasKey", { required: true })}>
        <option value="">Clé existante ?</option>
        <option value="yes">Oui</option>
        <option value="no">Non (all keys lost)</option>
      </select>
    </>
  );
}
