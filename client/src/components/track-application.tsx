import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatMobileNumber } from "@/lib/validations";
import type { LoanApplication } from "@shared/schema";

const trackingSchema = z.object({
  applicationId: z.string().min(1, "Application ID is required"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
});

type TrackingForm = z.infer<typeof trackingSchema>;

export default function TrackApplication() {
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const form = useForm<TrackingForm>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      applicationId: "",
      mobile: ""
    }
  });

  const trackApplication = useMutation({
    mutationFn: async (data: TrackingForm) => {
      const response = await apiRequest("GET", `/api/loan-applications/${data.applicationId}?mobile=${data.mobile}`);
      return response.json();
    },
    onSuccess: (data) => {
      setApplication(data);
      setShowResults(true);
      toast({
        title: "Application Found",
        description: "Your application details have been retrieved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Application Not Found",
        description: "Please check your Application ID and mobile number.",
        variant: "destructive",
      });
      setShowResults(false);
    }
  });

  const onSubmit = (data: TrackingForm) => {
    trackApplication.mutate(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-blue-100 text-blue-800";
      case "under-review": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "submitted": return "Application Submitted";
      case "under-review": return "Under Review";
      case "approved": return "Approved";
      case "rejected": return "Rejected";
      default: return status;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="track" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Track Your Application</h2>
          <p className="text-xl text-gray-600">Enter your details to check the status of your loan application</p>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="applicationId">Application ID</Label>
                  <Input
                    id="applicationId"
                    {...form.register("applicationId")}
                    placeholder="LN2025001234"
                    className="mt-2 font-mono"
                  />
                  {form.formState.errors.applicationId && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.applicationId.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="mobile">Registered Mobile Number</Label>
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
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="finflow-primary"
                  disabled={trackApplication.isPending}
                >
                  {trackApplication.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>Searching...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search mr-2"></i>Track Application
                    </>
                  )}
                </Button>
              </div>
            </form>
            
            {/* Application Status Display */}
            {showResults && application && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Application Status</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status || "submitted")}`}>
                    {getStatusText(application.status || "submitted")}
                  </span>
                </div>
                
                {/* Status Timeline */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center">
                    <div className="finflow-accent rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      <i className="fas fa-check text-white text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Application Submitted</h4>
                      <p className="text-sm text-gray-500">
                        {application.submittedAt ? new Date(application.submittedAt).toLocaleString('en-IN') : 'Date not available'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`${application.status === 'submitted' ? 'bg-gray-300' : 'finflow-accent'} rounded-full w-8 h-8 flex items-center justify-center mr-4`}>
                      <i className={`fas ${application.status === 'submitted' ? 'fa-clock' : 'fa-check'} text-white text-sm`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Initial Review</h4>
                      <p className="text-sm text-gray-500">
                        {application.status === 'submitted' ? 'Pending' : 'Completed'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`${['approved', 'rejected'].includes(application.status || '') ? 'finflow-accent' : 'bg-gray-300'} rounded-full w-8 h-8 flex items-center justify-center mr-4`}>
                      <i className={`fas ${['approved', 'rejected'].includes(application.status || '') ? 'fa-check' : 'fa-clock'} text-white text-sm`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Final Decision</h4>
                      <p className="text-sm text-gray-500">
                        {['approved', 'rejected'].includes(application.status || '') ? getStatusText(application.status || '') : 'In Progress'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Application Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Application Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Applicant Name:</span>
                      <span className="ml-2 font-medium">{application.fullName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Loan Type:</span>
                      <span className="ml-2 font-medium capitalize">{application.loanType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <span className="ml-2 font-medium">{formatAmount(application.loanAmount)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Tenure:</span>
                      <span className="ml-2 font-medium">{application.tenure} Year{application.tenure > 1 ? 's' : ''}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Purpose:</span>
                      <span className="ml-2 font-medium capitalize">{application.purpose.replace('-', ' ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Monthly Income:</span>
                      <span className="ml-2 font-medium">{formatAmount(application.monthlyIncome)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
