import { useContext } from "react";
import { AuthContexts } from "../contexts/AuthProvider/AuthProvider";

const useAuthContexts = () => {
	const contexts = useContext(AuthContexts);
	return contexts;
}

export default useAuthContexts;