// actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './lib/prisma';
import { Prisma } from '@prisma/client';


// zodSchema.ts
import { z } from 'zod';
import { SurveyFormData, surveySchema } from './lib/surveySchema';



export async function submitSurvey(data: SurveyFormData) {
  try {
    const validated = surveySchema.parse(data);

    const existing = await prisma.surveyResponse.findFirst({
      where: {
        OR: [{ email: validated.email }, { phone: validated.phone }],
      },
    });

    if (existing) {
      if (existing.email === validated.email && existing.phone === validated.phone) {
        return { success: false, error: 'This email and phone number are already registered.' };
      } else if (existing.email === validated.email) {
        return { success: false, error: 'This email is already registered.' };
      } else if (existing.phone === validated.phone) {
        return { success: false, error: 'This phone number is already registered.' };
      }
    }

    await prisma.surveyResponse.create({
      data: validated,
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { success: false, error: 'This email or phone number is already registered.' };
    }

    console.error('Survey submission error:', JSON.stringify(error, null, 2));
    return { success: false, error: 'Unexpected server error. Please try again.' };
  }
}
