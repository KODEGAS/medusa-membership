import { z } from 'zod';

export const MemberSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  email: z.string().min(1), // More lenient email validation to handle test data
  phone: z.string(),
  createdAt: z.string().datetime()
});

export const PaymentSchema = z.object({
  slip: z.string().url()
});

export const TeamSchema = z.object({
  _id: z.string(),
  teamName: z.string().min(1),
  university: z.string().min(1),
  leaderName: z.string().optional(), // Some teams have leader information
  leaderEmail: z.string().min(1).optional(), // More lenient email validation
  leaderPhone: z.string().optional(),
  payment: PaymentSchema.optional(), // Payment is optional
  members: z.array(MemberSchema),
  createdAt: z.string().datetime(),
  __v: z.number().optional()
});

export const TeamResponseSchema = z.array(TeamSchema);

export type Member = z.infer<typeof MemberSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type TeamResponse = z.infer<typeof TeamResponseSchema>;
