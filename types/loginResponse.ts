export interface User {
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

export interface UserLoginResponse {
  userLogin: {
    code: number;
    success: boolean;
    message: string;
    data: User | null;
  };
}

export interface UserLoginVariables {
  email: string;
  password: string;
  deviceType: "ANDROID" | "IOS" | "WEB";
  deviceName: string;
}

export interface RegisterResponse {
  register: {
    code: number;
    success: boolean;
    message: string;
    data: User | null;
  };
}
