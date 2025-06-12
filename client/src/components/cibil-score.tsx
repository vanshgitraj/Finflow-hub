import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatMobileNumber } from "@/lib/validations";

const cibilCheckSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  panCard: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (ABCDE1234F)"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  consentAgreement: z.boolean().refine(val => val === true, "You must agree to the terms")
});

type CibilCheckForm = z.infer<typeof cibilCheckSchema>;

export default function CibilScore() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<CibilCheckForm>({
    resolver: zodResolver(cibilCheckSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      mobile: "",
      panCard: "",
      pincode: "",
      consentAgreement: false
    }
  });

  const checkCibilScore = useMutation({
    mutationFn: async (data: Omit<CibilCheckForm, "consentAgreement">) => {
      const response = await apiRequest("POST", "/api/cibil-check", data);
      return response.json();
    },
    onSuccess: (data) => {
      setScoreResult(data);
      setIsSubmitted(true);
      toast({
        title: "CIBIL Score Retrieved!",
        description: "Your credit score has been successfully fetched.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to fetch CIBIL score. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: CibilCheckForm) => {
    const { consentAgreement, ...cibilData } = data;
    checkCibilScore.mutate(cibilData);
  };

  const downloadReport = () => {
    // In a real implementation, this would download the actual CIBIL report
    toast({
      title: "Download Started",
      description: "Your CIBIL report is being downloaded.",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600";
    if (score >= 650) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent";
    if (score >= 650) return "Good";
    if (score >= 550) return "Fair";
    return "Poor";
  };

  if (isSubmitted && scoreResult) {
    return (
      <section id="cibil" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold text-white ${getScoreColor(scoreResult.score)}`}>
                      {scoreResult.score}
                    </div>
                    <div className="text-white text-sm">{getScoreLabel(scoreResult.score)}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your CIBIL Score</h3>
                <p className="text-gray-600">Powered by CIBIL TransUnion</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-3">Score Range</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Excellent</span>
                      <span className="text-sm font-medium text-green-600">750-900</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Good</span>
                      <span className="text-sm font-medium text-yellow-600">650-749</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Fair</span>
                      <span className="text-sm font-medium text-orange-600">550-649</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Poor</span>
                      <span className="text-sm font-medium text-red-600">300-549</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-3">Report Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Report Date</span>
                      <span className="text-sm font-medium">{new Date().toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Report ID</span>
                      <span className="text-sm font-medium">CB{Math.random().toString().substr(2, 8)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Data Source</span>
                      <span className="text-sm font-medium">CIBIL TransUnion</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Button 
                  onClick={downloadReport}
                  className="finflow-primary mr-4"
                >
                  <i className="fas fa-download mr-2"></i>Download Detailed Report
                </Button>
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setScoreResult(null);
                    form.reset();
                  }}
                  variant="outline"
                >
                  Check Another Score
                </Button>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Tips to Improve Your Credit Score:</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pay all your bills and EMIs on time</li>
                  <li>• Keep your credit utilization below 30%</li>
                  <li>• Don't close old credit cards</li>
                  <li>• Check your credit report regularly for errors</li>
                  <li>• Avoid applying for multiple loans/cards simultaneously</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="cibil" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Check Your CIBIL Score</h2>
          <p className="text-xl text-gray-600">Get your free credit score instantly • Powered by CIBIL TransUnion</p>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Benefits Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Why Check Your CIBIL Score?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-finflow-primary bg-opacity-10 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      <i className="fas fa-check text-finflow-primary text-sm"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Free Credit Score</h4>
                      <p className="text-sm text-gray-600">Get your CIBIL score absolutely free with no hidden charges</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-finflow-primary bg-opacity-10 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      <i className="fas fa-shield-alt text-finflow-primary text-sm"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">100% Secure</h4>
                      <p className="text-sm text-gray-600">Your data is protected with bank-grade security</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-finflow-primary bg-opacity-10 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      <i className="fas fa-download text-finflow-primary text-sm"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Detailed Report</h4>
                      <p className="text-sm text-gray-600">Download your complete CIBIL report with analysis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-finflow-primary bg-opacity-10 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                      <i className="fas fa-chart-line text-finflow-primary text-sm"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Credit Improvement Tips</h4>
                      <p className="text-sm text-gray-600">Get personalized tips to improve your credit score</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Details</h3>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...form.register("fullName")}
                      placeholder="As per CIBIL records"
                      className="mt-2"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.fullName.message}</p>
                    )}
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
                        placeholder="78008 17764"
                        className="rounded-l-none"
                        maxLength={12}
                      />
                    </div>
                    {form.formState.errors.mobile && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.mobile.message}</p>
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
                  </div>
                  
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      {...form.register("pincode")}
                      placeholder="110001"
                      className="mt-2"
                      maxLength={6}
                    />
                    {form.formState.errors.pincode && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.pincode.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="consentAgreement"
                      checked={form.watch("consentAgreement")}
                      onCheckedChange={(checked) => form.setValue("consentAgreement", checked as boolean)}
                    />
                    <Label htmlFor="consentAgreement" className="text-sm text-gray-600 leading-relaxed">
                      I authorize CIBIL to access my credit information and agree to the 
                      <a href="#" className="text-finflow-primary hover:underline ml-1">Terms & Conditions</a> and 
                      <a href="#" className="text-finflow-primary hover:underline ml-1">Privacy Policy</a>
                    </Label>
                  </div>
                  {form.formState.errors.consentAgreement && (
                    <p className="text-sm text-red-600">{form.formState.errors.consentAgreement.message}</p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full finflow-primary mt-6"
                    disabled={checkCibilScore.isPending}
                  >
                    {checkCibilScore.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>Fetching Your Score...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-chart-bar mr-2"></i>Get My CIBIL Score
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}