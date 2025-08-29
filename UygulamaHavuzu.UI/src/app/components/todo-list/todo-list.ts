import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoService } from '../../services/todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RouterLink,
  ],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((data: any[]) => {
      this.todos = data;
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim() === '') {
      return;
    }
    const newTodo = { title: this.newTodoTitle, isCompleted: false };
    this.todoService.addTodo(newTodo).subscribe(() => {
      this.loadTodos();
      this.newTodoTitle = '';
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  // Fonksiyon güncellendi
  toggleComplete(todo: any): void {
    // 'todo.isCompleted' değeri (ngModelChange) sayesinde zaten güncellendi.
    // Biz sadece bu güncel nesneyi sunucuya gönderiyoruz.
    this.todoService.updateTodo(todo.id, todo).subscribe({
      next: () => {
        // İşlem başarılı olduğunda bir şey yapmaya gerek yok, çünkü arayüz zaten güncel.
        console.log('Görev durumu başarıyla güncellendi. - todo-list.ts:64');
      },
      error: (err) => {
        // Eğer sunucu tarafında bir hata olursa, arayüzdeki değişikliği geri al.
        console.error(
          'Görev güncellenirken hata oluştu: - todo-list.ts:68',
          err
        );
        todo.isCompleted = !todo.isCompleted; // Değişikliği geri al
      },
    });
  }
}
