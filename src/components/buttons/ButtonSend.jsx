import { BarLoader } from "react-spinners";

export default function ButtonSend({ submit }) {
	return (
		<button type="submit" disabled={submit}>
			{
			  submit ?
			  <BarLoader />
			  :
			  <>Envoyer la demande</>
			}
		</button>
    );
}