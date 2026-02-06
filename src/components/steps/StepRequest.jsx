import { useState } from "react";
import YesNoToggle from "../YesNoToggle"

export default function StepRequest({ register, setValue, repairKeyRequest, copyKeyRequest, hasCommandWorks, allKeyLostRequest, hasCarOpened }) {
  return (
    <>
      <h2>La demande</h2>
      <div className="request-wrap">
          <YesNoToggle
            value={repairKeyRequest}
            onChange={(e, val) => {
              setValue("repairKeyRequest", val);
            }}
            label="Réparation de la clef"f
          />

          <YesNoToggle
            value={copyKeyRequest}
            onChange={(e, val) => {
              setValue("copyKeyRequest", val);
            }}
            label="Duplication de la clef"
          />

          {
            copyKeyRequest ?
              <YesNoToggle
                value={hasCommandWorks}
                onChange={(e, val) => {
                  setValue("hasCommandWorks", val);
                }}
                label="Télécommande fonctionnelle ?"
              /> : <></>
          }

          <YesNoToggle
            value={allKeyLostRequest}
            onChange={(e, val) => {
              setValue("allKeyLostRequest", val);
            }}
            label="Dépanage: toutes clefs perdues"
          />
          {
            allKeyLostRequest ?
              <YesNoToggle
                value={hasCarOpened}
                onChange={(e, val) => {
                  setValue("hasCarOpened", val);
                }}
                label="Voiture ouverte ?"
              />
              : <></>
          }
      </div>
    </>
  );
}
