import { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export interface SliderProps {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}