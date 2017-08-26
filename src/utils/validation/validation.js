import vE from './email_validation';

export const validate_email = (email) => {
	const validEmail = vE(email);

	return validEmail;
};

export const validate_password = (pass) => {
	if ( pass === '' || pass.length < 4 || pass.length > 60 )
		return false;

	return true;
};

export const validate_password_confirmation = (pass, confirmPass) => pass === confirmPass;

export const validate_signIN = (email, pass) => {
	return validate_email(email) && validate_password(pass);
};

export const validate_signUP = (email, pass, confirmPass) => {
	return validate_email(email) && validate_password(pass) && validate_password_confirmation(pass, confirmPass)
};