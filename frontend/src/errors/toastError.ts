import { toast } from "react-toastify";
import errors from "./errorMap";

const toastError = (err: any) => {
	const errorMsg = err.response?.data?.message || err.response?.data?.error;
	if (errorMsg) {
		if (errors[errorMsg]) {
			toast.error(errors[errorMsg], {
				toastId: errors[errorMsg],
			});
		} else {
			toast.error(errorMsg, {
				toastId: errorMsg,
			});
		}
	} else if (  typeof err === 'string' || err instanceof String ) {
		toast.error(err);
	} else {
		toast.error("An error occurred!");
	}
};

export default toastError;
