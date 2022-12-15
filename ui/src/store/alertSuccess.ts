import { AlertInterface } from "./alertSlice";

export const alertSignIn: AlertInterface = {
	message: "Вы успешно вошли в систему!",
	show: true,
	manual: true
}

export const alertFileUploadSuccess: AlertInterface = {
	message: "Файл успешно загружен!",
	show: true,
	manual: false
}