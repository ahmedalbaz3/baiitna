export interface GoogleUser {
  sub: string; // The unique ID for the Google account
  name: string;
  given_name: string;
  family_name?: string; // Optional: Not all users have a last name set
  picture?: string; // Optional: Users can choose not to have a photo
  email: string;
  email_verified: boolean;
  locale?: string; // Often included in the response
}
