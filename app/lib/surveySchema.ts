import { z } from 'zod';

export const surveySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  ageRange: z.string(),
  education: z.string(),
  employment: z.string(),
  abroadInterest: z.string(),
  region: z.string(),
});

export type SurveyFormData = z.infer<typeof surveySchema>;
