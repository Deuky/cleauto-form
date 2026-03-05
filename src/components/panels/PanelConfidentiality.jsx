export default function PanelConfidentiality({ confidentility = false, dataRetention = false })
{
	return (
        <div className="confidentiality">
            {
                confidentility ?
                <>
                    <b>Confidentialité</b> 
                    : Les données collectées sont envoyées directement par email à cleauto.be et ne sont pas enregistrées en base de données sur ce site. 
                    Elles sont utilisées exclusivement pour vous rappeler et traiter votre dossier. Une fois votre demande traitée, l'email contenant vos 
                    informations et photos (carte grise, clés) est définitivement supprimé. Vous pouvez exercer votre droit de suppression à tout moment 
                    en nous contactant.
                </> : <></>
            }
            {
                dataRetention ?
                <>
                    <b>Conservation des données</b> 
                    : Les documents transmis (CNI, Carte Grise, Signature) sont destinés à la constitution de votre dossier d'intervention. Ils sont 
                    conservés de manière sécurisée pendant une durée de 10 ans pour répondre à nos obligations légales et fiscales, puis définitivement 
                    détruits. Conformément au RGPD, la preuve de votre consentement (date, heure et adresse IP) est jointe au document généré.
                </>
                : <></>
            }
        </div>
    )
}