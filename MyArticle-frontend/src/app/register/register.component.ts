import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Import your user service
import { User } from 'src/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User(0, '', '', '', '', '', '');
  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onRegister() {
    if (!this.selectedFile) {
      alert('Please select a profile picture.');
      return;
    }

    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('profilePic', this.selectedFile, this.selectedFile.name);

    // Use your user service to send the form data
    this.userService.registerUser(formData).subscribe(
      response => {
        console.log('User registered successfully', response);
        // Handle response
      },
      error => {
        console.error('Error registering user', error);
        // Handle error
      }
    );
  }
}
