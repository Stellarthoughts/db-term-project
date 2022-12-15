import { AlertInterface } from "./alertSlice";

export const alertInvalidToken: AlertInterface = {
	message: "Ваша сессия истекла. Пожалуйста, авторизуйтесь заново.",
	show: true,
	manual: false
}

export const alertSomethingWentWrong: AlertInterface = {
	message: "Что-то пошло не так!",
	show: true,
	manual: false
}

export const alertInvalidCredentials: AlertInterface = {
	message: "Неверные логин или пароль!",
	show: true,
	manual: false
}

export const alertCouldNotSignUp: AlertInterface = {
	message: "Не получилось зарегистрироваться!",
	show: true,
	manual: false
}

export const alertFileUploadError: AlertInterface = {
	message: "Не получилось загрузить файл!",
	show: true,
	manual: false
}
