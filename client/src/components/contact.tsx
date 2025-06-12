import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatMobileNumber } from "@/lib/validations";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const sendMessage = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactForm) => {
    sendMessage.mutate(data);
  };

  const faqs = [
    {
      question: "How long does approval take?",
      answer: "Most applications are processed within 24-48 hours. You'll receive updates via SMS and email."
    },
    {
      question: "What documents are required?",
      answer: "PAN Card, Aadhaar Card, Bank Statements (3 months), Salary Slips (3 months), and passport-size photos."
    },
    {
      question: "Can I prepay my loan?",
      answer: "Yes, you can prepay your loan partially or fully. Prepayment charges may apply as per terms."
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600">Need help? Our team is here to assist you 24/7</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-finflow-primary bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <i className="fab fa-whatsapp text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">WhatsApp Support</h4>
                      <a href="https://wa.me/919876543210" className="text-finflow-primary hover:text-blue-800 transition-colors duration-200">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-finflow-primary bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <i className="fas fa-envelope text-finflow-primary text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email Support</h4>
                      <a href="mailto:vanshgupta8199@gmail.com" className="text-finflow-primary hover:text-blue-800 transition-colors duration-200">
                        vanshgupta8199@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-finflow-primary bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <i className="fas fa-phone text-finflow-primary text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Phone Support</h4>
                      <a href="tel:+919876543210" className="text-finflow-primary hover:text-blue-800 transition-colors duration-200">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-finflow-primary bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <i className="fas fa-clock text-finflow-primary text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">24/7 Support Available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* FAQ Section */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <i className="fas fa-chevron-down group-open:rotate-180 transition-transform duration-200"></i>
                      </summary>
                      <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      placeholder="John"
                      className="mt-2"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      placeholder="Doe"
                      className="mt-2"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="john@example.com"
                    className="mt-2"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex mt-2">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span>
                    <Input
                      id="phone"
                      {...form.register("phone", {
                        onChange: (e) => {
                          e.target.value = formatMobileNumber(e.target.value);
                        }
                      })}
                      placeholder="98765 43210"
                      className="rounded-l-none"
                      maxLength={12}
                    />
                  </div>
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Select onValueChange={(value) => form.setValue("subject", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="application-help">Application Help</SelectItem>
                      <SelectItem value="loan-inquiry">Loan Inquiry</SelectItem>
                      <SelectItem value="technical-support">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.subject && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    placeholder="How can we help you?"
                    className="mt-2"
                    rows={5}
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full finflow-primary"
                  disabled={sendMessage.isPending}
                >
                  {sendMessage.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
