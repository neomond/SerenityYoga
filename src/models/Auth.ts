export type Auth = {
  email: string;
  password: number;
  confirmPassword: string | any | undefined;
};

export interface SendOtpParams {
  email: string;
  otp?: string;
}

export interface ConfirmAndResetPasswordParams {
  email: string;
  otp: string;
  newPassword: string;
}
