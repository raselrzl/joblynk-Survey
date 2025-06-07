"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./lib/prisma";
export async function submitSurvey(formData: FormData) {
  const {
    name,
    email,
    phone,
    ageRange,
    education,
    employment,
    abroadInterest,
    region,
  } = formData;

  if (!email && !phone) {
    return { success: false, error: 'Email or phone is required' };
  }

  try {
    const orConditions = [];

    if (email) orConditions.push({ email });
    if (phone) orConditions.push({ phone });

    const existing = await prisma.surveyResponse.findFirst({
      where: { OR: orConditions },
    });

    if (existing) {
      return {
        success: false,
        error: 'Email or phone number already used. Please use a new one.',
      };
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
    console.error('submitSurvey error:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    }; // ✅ ensure return
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
