import { z } from 'zod';

export const surveySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Phone number is too short'),
  ageRange: z.enum(['18-42', '43+']),
  education: z.enum(['none', 'school', 'bachelor', 'dakhil', 'kamil', 'any']),
  employment: z.enum(['employed', 'unemployed', 'business', 'self-employed', 'other']),
  abroadInterest: z.enum(['yes', 'no']),
});

export type SurveyFormValues = z.infer<typeof surveySchema>;
