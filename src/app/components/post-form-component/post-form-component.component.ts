import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form-component',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    CommonModule],
  templateUrl: './post-form-component.component.html',
  styleUrl: './post-form-component.component.scss'
})
export class PostFormComponent {
  @Input() post: Post = new Post();
  @Input() btnCadastro: boolean = true;
  @Output() cadastrar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();
  @Output() remover = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onCadastrar(): void {
    this.cadastrar.emit();
  }

  onEditar(): void {
    this.editar.emit();
  }

  onRemover(): void {
    this.remover.emit();
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
