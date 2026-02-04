import { useState } from "react";
import YesNoToggle from "../YesNoToggle"

export default function StepRequest({ register }) {
  const [repairKey, setRepairKey] = useState(false);
  const [copyKey, setCopyKey] = useState(false);
  const [keyWorks, setKeyWorks] = useState(false);
  const [allKeyLost, setSetAllKeyLost] = useState(false);
  const [hasCarOpened, setHasCarOpened] = useState(false);

  return (
    <>
      <h2>La demande</h2>
      <div className="request-wrap">
          <YesNoToggle
            value={repairKey}
            onChange={setRepairKey}
            label="Réparation de la clef"
          />

          <YesNoToggle
            value={copyKey}
            onChange={setCopyKey}
            label="Duplication de la clef"
          />

          {
            copyKey ?
              <YesNoToggle
                value={keyWorks}
                onChange={setKeyWorks}
                label="Une clef fonctionnelle ?"
              /> : <></>
          }

          <YesNoToggle
            value={allKeyLost}
            onChange={setSetAllKeyLost}
            label="Depanage: toutes clefs perdues"
          />
          {
            allKeyLost ?
              <YesNoToggle
                value={hasCarOpened}
                onChange={setHasCarOpened}
                label="Voiture ouverte ?"
              />
              : <></>
          }
      </div>
    </>
  );
}
