import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { validatePAN, formatMobileNumber, sanitizeInput, validateName, validateEmail, validateMobileNumber, validateLoanAmount, validateTenure, validateIncome, validateAge } from "@/lib/validations";

const loanApplicationSchema = z.object({
  // Personal Information
  fullName: z.string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s.]+$/, "Name can only contain letters, spaces, and dots")
    .transform(sanitizeInput),
  dateOfBirth: z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const parsed = new Date(date);
      return validateAge(parsed);
    }, "Age must be between 18 and 70 years"),
  mobile: z.string()
    .regex(/^[6-9]\d{9}$/, "Mobile number must start with 6-9 and be 10 digits")
    .refine(validateMobileNumber, "Invalid mobile number format"),
  email: z.string()
    .email("Invalid email address")
    .max(255, "Email too long")
    .refine(validateEmail, "Invalid email format")
    .transform((email) => email.toLowerCase()),
  panCard: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (ABCDE1234F)")
    .refine(validatePAN, "Invalid PAN card number")
    .transform((pan) => pan.toUpperCase()),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
  currentAddress: z.string()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address too long")
    .transform(sanitizeInput),
  // Employment & Financial Information
  employmentType: z.enum(["salaried", "self-employed", "business", "retired"], { required_error: "Employment type is required" }),
  monthlyIncome: z.number()
    .min(15000, "Monthly income must be at least ₹15,000")
    .max(50000000, "Income amount too high")
    .refine(validateIncome, "Invalid income amount"),
  companyName: z.string()
    .min(2, "Company name is required")
    .max(200, "Company name too long")
    .transform(sanitizeInput),
  workExperience: z.string()
    .min(1, "Work experience is required")
    .max(50, "Work experience too long"),
  existingEmis: z.number()
    .min(0, "EMI amount cannot be negative")
    .max(1000000, "EMI amount too high"),
  accountType: z.enum(["savings", "current", "salary"], { required_error: "Account type is required" }),
  // Loan Details
  loanType: z.enum(["personal", "home", "business", "professional", "loan-against-property", "gold", "car", "overdraft", "balance-transfer"], { required_error: "Loan type is required" }),
  loanAmount: z.number()
    .min(10000, "Loan amount must be at least ₹10,000")
    .max(10000000, "Loan amount cannot exceed ₹1,00,00,000")
    .refine(validateLoanAmount, "Invalid loan amount"),
  tenure: z.number()
    .min(1, "Tenure must be at least 1 year")
    .max(30, "Tenure cannot exceed 30 years")
    .refine(validateTenure, "Invalid tenure"),
  purpose: z.string()
    .min(5, "Purpose must be at least 5 characters")
    .max(200, "Purpose too long")
    .transform(sanitizeInput),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept terms and conditions")
});

type LoanApplicationForm = z.infer<typeof loanApplicationSchema>;

export default function LoanApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const { toast } = useToast();

  const form = useForm<LoanApplicationForm>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: {
      existingEmis: 0,
      termsAccepted: false
    }
  });

  const submitApplication = useMutation({
    mutationFn: async (data: Omit<LoanApplicationForm, "termsAccepted">) => {
      const response = await apiRequest("POST", "/api/loan-applications", data);
      return response.json();
    },
    onSuccess: (data) => {
      setApplicationId(data.applicationId);
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Your loan application has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: LoanApplicationForm) => {
    const { termsAccepted, ...applicationData } = data;
    submitApplication.mutate(applicationData);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / 3) * 100;

  if (isSubmitted) {
    return (
      <section id="apply" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-16">
              <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-circle text-3xl text-finflow-accent"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">Your application has been received. You'll get a response within 24 hours.</p>
              <p className="text-sm text-gray-500 mb-4">
                Application ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{applicationId}</span>
              </p>
              <button 
                onClick={() => {
                  const element = document.getElementById('track');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center text-finflow-primary hover:text-blue-800 font-medium"
              >
                Track Your Application <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apply for Loan</h2>
          <p className="text-xl text-gray-600">Complete your application in just 2 minutes</p>
        </div>
        
        <Card>
          <CardContent className="p-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-finflow-primary">Step {currentStep} of 3</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="finflow-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        {...form.register("fullName")}
                        placeholder="Enter your full name"
                        className="mt-2"
                      />
                      {form.formState.errors.fullName && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.fullName.message}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">As per official documents</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...form.register("dateOfBirth")}
                        className="mt-2"
                      />
                      {form.formState.errors.dateOfBirth && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.dateOfBirth.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <div className="flex mt-2">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span>
                        <Input
                          id="mobile"
                          {...form.register("mobile", {
                            onChange: (e) => {
                              e.target.value = formatMobileNumber(e.target.value);
                              form.setValue("mobile", e.target.value.replace(/\D/g, ''));
                            }
                          })}
                          placeholder="98765 43210"
                          className="rounded-l-none"
                          maxLength={12}
                        />
                      </div>
                      {form.formState.errors.mobile && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.mobile.message}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">10-digit mobile number</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="your.email@domain.com"
                        className="mt-2"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="panCard">PAN Card Number *</Label>
                      <Input
                        id="panCard"
                        {...form.register("panCard", {
                          onChange: (e) => {
                            e.target.value = e.target.value.toUpperCase();
                            form.setValue("panCard", e.target.value);
                          }
                        })}
                        placeholder="ABCDE1234F"
                        className="mt-2 uppercase"
                        maxLength={10}
                      />
                      {form.formState.errors.panCard && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.panCard.message}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select onValueChange={(value) => form.setValue("gender", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.gender && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.gender.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="currentAddress">Current Address *</Label>
                    <Textarea
                      id="currentAddress"
                      {...form.register("currentAddress")}
                      placeholder="Enter your complete current address"
                      className="mt-2"
                      rows={3}
                    />
                    {form.formState.errors.currentAddress && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.currentAddress.message}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep} className="finflow-primary">
                      Next Step <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Employment & Financial Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <h3 className="text-xl font-semibold text-gray-900">Employment & Financial Details</h3>
                    <Button type="button" onClick={previousStep} variant="ghost">
                      <i className="fas fa-arrow-left mr-2"></i>Previous
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="employmentType">Employment Type *</Label>
                      <Select onValueChange={(value) => form.setValue("employmentType", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salaried">Salaried</SelectItem>
                          <SelectItem value="self-employed">Self Employed</SelectItem>
                          <SelectItem value="business">Business Owner</SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.employmentType && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.employmentType.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-3 text-gray-500">₹</span>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          {...form.register("monthlyIncome", { valueAsNumber: true })}
                          placeholder="50,000"
                          className="pl-8"
                          min={10000}
                        />
                      </div>
                      {form.formState.errors.monthlyIncome && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.monthlyIncome.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="companyName">Company/Organization Name *</Label>
                      <Input
                        id="companyName"
                        {...form.register("companyName")}
                        placeholder="Enter company name"
                        className="mt-2"
                      />
                      {form.formState.errors.companyName && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.companyName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="workExperience">Work Experience *</Label>
                      <Select onValueChange={(value) => form.setValue("workExperience", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.workExperience && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.workExperience.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="existingEmis">Existing EMIs (Monthly) *</Label>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-3 text-gray-500">₹</span>
                        <Input
                          id="existingEmis"
                          type="number"
                          {...form.register("existingEmis", { valueAsNumber: true })}
                          placeholder="0"
                          className="pl-8"
                          min={0}
                        />
                      </div>
                      {form.formState.errors.existingEmis && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.existingEmis.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="accountType">Bank Account Type *</Label>
                      <Select onValueChange={(value) => form.setValue("accountType", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Account Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings Account</SelectItem>
                          <SelectItem value="current">Current Account</SelectItem>
                          <SelectItem value="salary">Salary Account</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.accountType && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.accountType.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" onClick={previousStep} variant="outline">
                      <i className="fas fa-arrow-left mr-2"></i>Previous Step
                    </Button>
                    <Button type="button" onClick={nextStep} className="finflow-primary">
                      Next Step <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Loan Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <h3 className="text-xl font-semibold text-gray-900">Loan Requirements</h3>
                    <Button type="button" onClick={previousStep} variant="ghost">
                      <i className="fas fa-arrow-left mr-2"></i>Previous
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="loanType">Loan Type *</Label>
                      <Select onValueChange={(value) => form.setValue("loanType", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Loan Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal Loan</SelectItem>
                          <SelectItem value="home">Home Loan</SelectItem>
                          <SelectItem value="business">Business Loan</SelectItem>
                          <SelectItem value="overdraft">Overdraft Facility</SelectItem>
                          <SelectItem value="professional">Professional Loan</SelectItem>
                          <SelectItem value="loan-against-property">Loan Against Property</SelectItem>
                          <SelectItem value="gold">Gold Loan</SelectItem>
                          <SelectItem value="car">Car Loan</SelectItem>
                          <SelectItem value="balance-transfer">Balance Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.loanType && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.loanType.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount *</Label>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-3 text-gray-500">₹</span>
                        <Input
                          id="loanAmount"
                          type="number"
                          {...form.register("loanAmount", { valueAsNumber: true })}
                          placeholder="5,00,000"
                          className="pl-8"
                          min={50000}
                          max={5000000}
                        />
                      </div>
                      {form.formState.errors.loanAmount && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.loanAmount.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="tenure">Preferred Tenure *</Label>
                      <Select onValueChange={(value) => form.setValue("tenure", parseInt(value))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Tenure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Year</SelectItem>
                          <SelectItem value="2">2 Years</SelectItem>
                          <SelectItem value="3">3 Years</SelectItem>
                          <SelectItem value="5">5 Years</SelectItem>
                          <SelectItem value="7">7 Years</SelectItem>
                          <SelectItem value="10">10 Years</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.tenure && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.tenure.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="purpose">Purpose of Loan *</Label>
                      <Select onValueChange={(value) => form.setValue("purpose", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">Medical Emergency</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="home-renovation">Home Renovation</SelectItem>
                          <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                          <SelectItem value="business-expansion">Business Expansion</SelectItem>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.purpose && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.purpose.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={form.watch("termsAccepted")}
                        onCheckedChange={(checked) => form.setValue("termsAccepted", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-finflow-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-finflow-primary hover:underline">Privacy Policy</a>. I authorize FinFlow Hub to verify my information and credit history.
                      </Label>
                    </div>
                    {form.formState.errors.termsAccepted && (
                      <p className="text-sm text-red-600 mt-2">{form.formState.errors.termsAccepted.message}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" onClick={previousStep} variant="outline">
                      <i className="fas fa-arrow-left mr-2"></i>Previous Step
                    </Button>
                    <Button 
                      type="submit" 
                      className="finflow-accent px-8 shadow-lg"
                      disabled={submitApplication.isPending}
                    >
                      {submitApplication.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
