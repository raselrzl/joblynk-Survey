"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Loader2, TriangleAlert } from "lucide-react";
import { submitSurvey } from "../actions";
import Image from "next/image";
type Region =
  | "sylhet"
  | "dhaka"
  | "chattogram"
  | "rajshahi"
  | "khulna"
  | "barisal"
  | "mymensingh"
  | "rangpur";

const regions: Region[] = [
  "sylhet",
  "dhaka",
  "chattogram",
  "rajshahi",
  "khulna",
  "barisal",
  "mymensingh",
  "rangpur",
];

const regionLabelsBn: Record<Region, string> = {
  sylhet: "সিলেট",
  dhaka: "ঢাকা",
  chattogram: "চট্টগ্রাম",
  rajshahi: "রাজশাহী",
  khulna: "খুলনা",
  barisal: "বরিশাল",
  mymensingh: "ময়মনসিংহ",
  rangpur: "রংপুর",
};

const regionLabelsEn: Record<Region, string> = {
  sylhet: "Sylhet",
  dhaka: "Dhaka",
  chattogram: "Chattogram",
  rajshahi: "Rajshahi",
  khulna: "Khulna",
  barisal: "Barisal",
  mymensingh: "Mymensingh",
  rangpur: "Rangpur",
};

type AgeRange =
  | "18-21"
  | "22-25"
  | "26-29"
  | "30-33"
  | "34-37"
  | "38-41"
  | "42+";
type Education = "none" | "school" | "bachelor" | "dakhil" | "kamil" | "any";
type Employment =
  | "employed"
  | "unemployed"
  | "business"
  | "self-employed"
  | "other";
type AbroadInterest = "yes" | "no";

const ageRanges: AgeRange[] = [
  "18-21",
  "22-25",
  "26-29",
  "30-33",
  "34-37",
  "38-41",
  "42+",
];
const educations: Education[] = [
  "none",
  "school",
  "bachelor",
  "dakhil",
  "kamil",
  "any",
];
const employments: Employment[] = [
  "employed",
  "unemployed",
  "business",
  "self-employed",
  "other",
];
const abroadInterests: AbroadInterest[] = ["yes", "no"];

const educationLabelsBn: Record<Education, string> = {
  none: "কোনো শিক্ষা নেই",
  school: "স্কুল",
  bachelor: "স্নাতক",
  dakhil: "দাখিল",
  kamil: "কামিল",
  any: "যেকোনো",
};

const employmentLabelsBn: Record<Employment, string> = {
  employed: "কর্মরত",
  unemployed: "বেকার",
  business: "ব্যবসা",
  "self-employed": "স্বনির্ভর",
  other: "অন্যান্য",
};

const abroadInterestLabelsBn: Record<AbroadInterest, string> = {
  yes: "হ্যাঁ",
  no: "না",
};

const educationLabelsEn: Record<Education, string> = {
  none: "None",
  school: "School",
  bachelor: "Bachelor",
  dakhil: "Dakhil",
  kamil: "Kamil",
  any: "Any",
};

const employmentLabelsEn: Record<Employment, string> = {
  employed: "Employed",
  unemployed: "Unemployed",
  business: "Business",
  "self-employed": "Self-employed",
  other: "Other",
};

const abroadInterestLabelsEn: Record<AbroadInterest, string> = {
  yes: "Yes",
  no: "No",
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  ageRange: AgeRange | "";
  education: Education | "";
  employment: Employment | "";
  abroadInterest: AbroadInterest | "";
  region: Region | "";
}

export default function SurveyForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    ageRange: "",
    education: "",
    employment: "",
    abroadInterest: "",
    region: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [language, setLanguage] = useState<"en" | "bn">("bn"); // default Bangla
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleButtonChange<T extends string>(
    field: keyof FormData,
    value: T
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const ageRangesBn = [
    "১৮-২১",
    "২২-২৫",
    "২৬-২৯",
    "৩০-৩৩",
    "৩৪-৩৭",
    "৩৮-৪১",
    "৪২+",
  ];

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!formData.email && !formData.phone) {
    setShowValidationModal(true);
    return;
  }
    setIsLoading(true);
  try {
    const result = await submitSurvey(formData);

    if (result?.success) {
      setSubmitted(true);
      setShowSuccessModal(true);
    } else {
      alert(result?.error || 'An unexpected error occurred. Please try again.');
    }
  } catch (err: any) {
    console.error('Survey submission failed:', err);
    alert(err.message || 'An unexpected error occurred. Please refresh the form and try again.');
  }finally {
    setIsLoading(false);
  }
}




  const educationLabels =
    language === "bn" ? educationLabelsBn : educationLabelsEn;
  const employmentLabels =
    language === "bn" ? employmentLabelsBn : employmentLabelsEn;
  const abroadInterestLabels =
    language === "bn" ? abroadInterestLabelsBn : abroadInterestLabelsEn;
  const baseButtonClass =
    "rounded-full px-5 py-2 transition-colors duration-200";
  const selectedButtonClass =
    "bg-[#D4AF37] text-black border border-[#D4AF37] font-semibold hover:bg-yellow-600";
  const unselectedButtonClass =
    "bg-gray-200 text-black border border-gray-300 hover:bg-gray-300";

  return (
    <div className="relative max-w-md mx-auto p-6 rounded-none shadow-lg border border-gray-100">
    
      <button
        onClick={() => (window.location.href = "/")}
        className="
    text-2xl font-bold text-black mb-6
    bg-[url('/bangladesh.png')] bg-contain bg-no-repeat bg-center cursor-pointer
    h-10 flex items-center
    text-center w-full
  "
        style={{ justifyContent: "flex-start" }}
      ></button>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          className={`${baseButtonClass} ${
            language === "bn" ? selectedButtonClass : unselectedButtonClass
          }`}
          onClick={() => setLanguage("bn")}
        >
          বাংলা
        </Button>
        <Button
          className={`${baseButtonClass} ${
            language === "en" ? selectedButtonClass : unselectedButtonClass
          }`}
          onClick={() => setLanguage("en")}
        >
          English
        </Button>
      </div>
      <div className="max-w-2xl mx-auto px-2 shadow-md border-1 rounded-xl mt-10 mb-2">
        {language === "en" ? (
          <>
            <p className="mb-4 text-sm text-black text-center p-2">
              We are trying various methods to solve Bangladesh's unemployment
              problem. Please kindly submit this survey.
            </p>
            <div className="mb-6 text-sm text-yellow-900 bg-yellow-100 border border-yellow-400 rounded px-4 py-3 flex items-center justify-center gap-2 text-center">
              <TriangleAlert className="w-5 h-5" />
              Duplicate entries will not be accepted.
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-sm text-black text-center p-2">
              বাংলাদেশের বেকারত্ব সমস্যার সমাধানের জন্য আমরা বিভিন্ন পদ্ধতি
              অবলম্বন করার চেষ্টা করছি। এই জন্য আপনাদেরকে অনুরোধ করা হচ্ছে এই
              সার্ভেটি জমা দিন।
            </p>
            <div className="mb-6 text-sm text-yellow-900 bg-yellow-100 border border-yellow-400 rounded px-4 py-3 flex items-center justify-center gap-2 text-center">
              <TriangleAlert className="w-5 h-5" />
              যথাসম্ভব কোনো ডুপ্লিকেট তথ্য গ্রহণযোগ্য হবে না।
            </div>
          </>
        )}
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col space-y-1 text-black">
            <Label htmlFor="name">{language === "bn" ? "নাম:" : "Name:"}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="bg-neutral-200 text-black border-neutral-300 focus:border-[#D4AF37]"
            />
          </div>
          <div className="flex flex-col space-y-1 text-black">
            <Label htmlFor="email">
              {language === "bn" ? "ইমেইল:" : "Email:"}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-neutral-200 text-black border-neutral-300 focus:border-[#D4AF37]"
            />
          </div>
          <div className="flex flex-col space-y-1 text-black">
            <Label htmlFor="phone">
              {language === "bn" ? "ফোন নম্বর:" : "Phone Number:"}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="bg-neutral-200 text-black border-neutral-300 focus:border-[#D4AF37]"
            />
          </div>

          <fieldset>
            <legend className="mb-2 font-medium text-black">
              {language === "bn" ? "বয়স:" : "Age Range:"}
            </legend>
            <div className="flex flex-wrap gap-2">
              {(language === "bn" ? ageRangesBn : ageRanges).map((age, i) => {
                const value = ageRanges[i];
                const isSelected = formData.ageRange === value;
                return (
                  <Button
                    type="button"
                    key={age}
                    className={`${baseButtonClass} ${
                      isSelected ? selectedButtonClass : unselectedButtonClass
                    }`}
                    onClick={() => handleButtonChange("ageRange", value)}
                  >
                    {age}
                  </Button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-medium text-black">
              {language === "bn" ? "শিক্ষাগত যোগ্যতা:" : "Education:"}
            </legend>
            <div className="flex flex-wrap gap-2">
              {educations.map((edu) => {
                const isSelected = formData.education === edu;
                return (
                  <Button
                    type="button"
                    key={edu}
                    className={`${baseButtonClass} ${
                      isSelected ? selectedButtonClass : unselectedButtonClass
                    }`}
                    onClick={() => handleButtonChange("education", edu)}
                  >
                    {educationLabels[edu]}
                  </Button>
                );
              })}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 font-medium text-black">
              {language === "bn" ? "পেশা:" : "Employment Status:"}
            </legend>
            <div className="flex flex-wrap gap-2">
              {employments.map((emp) => {
                const isSelected = formData.employment === emp;
                return (
                  <Button
                    type="button"
                    key={emp}
                    className={`${baseButtonClass} ${
                      isSelected ? selectedButtonClass : unselectedButtonClass
                    }`}
                    onClick={() => handleButtonChange("employment", emp)}
                  >
                    {employmentLabels[emp]}
                  </Button>
                );
              })}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 font-medium text-black">
              {language === "bn"
                ? "আপনি কোন অঞ্চলের?"
                : "Which region are you from?"}
            </legend>
            <div className="flex flex-wrap gap-2">
              {regions.map((reg) => {
                const isSelected = formData.region === reg;
                return (
                  <Button
                    type="button"
                    key={reg}
                    className={`${baseButtonClass} ${
                      isSelected ? selectedButtonClass : unselectedButtonClass
                    }`}
                    onClick={() => handleButtonChange("region", reg)}
                  >
                    {language === "bn"
                      ? regionLabelsBn[reg]
                      : regionLabelsEn[reg]}
                  </Button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-medium text-black">
              {language === "bn"
                ? "আপনি কি বিদেশে যেতে আগ্রহী?"
                : "Are you interested in going abroad?"}
            </legend>
            <div className="flex flex-wrap gap-2">
              {abroadInterests.map((ans) => {
                const isSelected = formData.abroadInterest === ans;
                return (
                  <Button
                    type="button"
                    key={ans}
                    className={`${baseButtonClass} ${
                      isSelected ? selectedButtonClass : unselectedButtonClass
                    }`}
                    onClick={() => handleButtonChange("abroadInterest", ans)}
                  >
                    {abroadInterestLabels[ans]}
                  </Button>
                );
              })}
            </div>
          </fieldset>
         <Button
  type="submit"
  disabled={isLoading}
  className="bg-[#D4AF37] cursor-pointer text-black border border-[#D4AF37] hover:bg-yellow-600 flex items-center justify-center gap-2"
>
  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
  {language === 'bn' ? 'জমা দিন' : 'Submit'}
</Button>
        </form>
      ) : (
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-black">
                {" "}
                <img
                  src="/thik.gif"
                  alt="Success"
                  className="mx-auto mb-2 w-16 h-16"
                />
              </DialogTitle>
              <DialogDescription>
                {language === "bn"
                  ? "ধন্যবাদ! জরিপে অংশগ্রহণের জন্য আপনাকে ধন্যবাদ, সুন্দর এবং সফল বাংলাদেশ গড়ায় আপনার সহযোগিতাই আমাদের লক্ষ্য।"
                  : "Thank you! We appreciate your participation in the survey—your cooperation is key to building a better and prosperous Bangladesh."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  window.location.href = "/";
                  setShowSuccessModal(false);
                }}
                className="bg-[#D4AF37] text-black border border-[#D4AF37] hover:bg-yellow-600"
              >
                {language === "bn" ? "বন্ধ করুন" : "Close"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={showValidationModal} onOpenChange={setShowValidationModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-700">
              <img
                src="/error.png"
                alt="Success"
                className="mx-auto mb-2 w-16 h-16 rounded-full object-fill animate-bounce"
              />
            </DialogTitle>
            <DialogDescription>
              {language === "bn"
                ? "অনুগ্রহ করে ইমেইল অথবা ফোন নম্বর দিন।"
                : "Please provide either an email or phone number."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => (
                setShowValidationModal(false), (window.location.href = "/")
              )}
              className="bg-[#D4AF37] text-black border border-[#D4AF37] hover:bg-yellow-600"
            >
              {language === "bn" ? "ঠিক আছে" : "Alright"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
