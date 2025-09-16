import { z } from 'zod';

export const MemberSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  createdAt: z.string().datetime()
});

export const PaymentSchema = z.object({
  slip: z.string().url()
}).optional();

export const TeamSchema = z.object({
  _id: z.string(),
  teamName: z.string().min(1),
  university: z.string().min(1),
  payment: PaymentSchema,
  members: z.array(MemberSchema),
  createdAt: z.string().datetime(),
  __v: z.number().optional()
});

export const TeamResponseSchema = z.array(TeamSchema);

export type Member = z.infer<typeof MemberSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type Team = z.infer<typeof TeamSchema>;
