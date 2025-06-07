'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './lib/prisma';

export async function submitSurvey(formData: FormData) {
  try {
    const { name, email, phone, ageRange, education, employment, abroadInterest, region } = formData;

    if (!email && !phone) {
      return { success: false, error: 'Email or phone is required' };
    }

    // Check if email or phone already exists
    const existing = await prisma.surveyResponse.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ],
      },
    });

    if (existing) {
      if (existing.email === email && existing.phone === phone) {
        return { success: false, error: 'This email and phone number are already registered.' };
      } else if (existing.email === email) {
        return { success: false, error: 'This email is already registered.' };
      } else if (existing.phone === phone) {
        return { success: false, error: 'This phone number is already registered.' };
      }
    }

    await prisma.surveyResponse.create({
      data: {
        name,
        email,
        phone,
        ageRange,
        education,
        employment,
        abroadInterest,
        region,
      },
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    // Log or handle unexpected errors here if needed
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  ageRange: string;
  education: string;
  employment: string;
  abroadInterest: string;
  region: string;
}
