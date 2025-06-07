'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './lib/prisma';

export async function submitSurvey(formData: FormData) {
  try {
    const { name, email, phone, ageRange, education, employment, abroadInterest, region } = formData;

    if (!email && !phone) {
      throw new Error('Email or phone is required');
    }

    await prisma.surveyResponse.create({
      data: { name, email, phone, ageRange, education, employment, abroadInterest, region },
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('submitSurvey error:', error);
    throw error;  // rethrow so the client can handle it
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
