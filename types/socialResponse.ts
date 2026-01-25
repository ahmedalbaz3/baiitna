export interface SocialLoginResponse {
  socialLogin: {
    data: UserData | null;
    code: number;
    success: boolean;
    message: string;
  };
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  profilePicture: string | null;
  code: string;
  isBlocked: boolean;
  isVerified: boolean;
  notificationManager: boolean;
  token: string;
  countryId: string | number;
  cityId: string | number;
  notifyMe: boolean;
  role: string;
  favLang: string;
  unseenNotificationsCount: number;
  hasUpdatedAddress: boolean;
  fullName: string;
  hasPassword: boolean;
  createdAt: string;
  readableCreatedAt: string;
  updatedAt: string;
  readableUpdatedAt: string;
  deletedAt: string | null;
  arFullName: string;
  NotificationsSeen: boolean;
}

// If you are using Apollo Client or a similar library:
export interface SocialLoginData {
  socialLogin: SocialLoginResponse["socialLogin"];
}
