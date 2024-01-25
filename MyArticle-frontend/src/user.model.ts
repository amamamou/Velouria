export class User {
  userId: number;
  username: string;
  email: string;
  password: string;
  firstName: string; // Existing
  lastName: string;  // Existing
  profilePic: string; // New field for profile picture

  constructor(userId: number, username: string, email: string, password: string, firstName: string, lastName: string, profilePic: string) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePic = profilePic; // Initialize the new field
  }
}
