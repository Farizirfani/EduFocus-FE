import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Kata sandi wajib diisi')
    .min(6, 'Kata sandi minimal 6 karakter'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nama wajib diisi')
      .min(2, 'Nama minimal 2 karakter'),
    email: z
      .string()
      .min(1, 'Email wajib diisi')
      .email('Format email tidak valid'),
    password: z
      .string()
      .min(1, 'Kata sandi wajib diisi')
      .min(6, 'Kata sandi minimal 6 karakter')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka'
      ),
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak cocok',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
