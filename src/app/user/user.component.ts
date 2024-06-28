import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  userForm!: FormGroup
  user$!: Observable<any>
  posts$!: Observable<any>
  comments$!: Observable<any>

  constructor(private userService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['5']
    })

    this.user$ = this.userService.getUser(this.!userForm.get('id').value);

    this.user$.subscribe((user) => {
      this.posts$ = this.userService.getPosts(user.id)
    })
  }

  showComments(postId: number): void {
    this.comments$ = this.userService.getComments(postId)
  }

}