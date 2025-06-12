import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NBFCLicense() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">NBFC License & Regulatory Information</h1>
          <p className="text-gray-600">Regulatory compliance and licensing details</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. NBFC Registration Details</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Company Name:</span>
                    <p className="text-gray-900">FinFlow Hub Financial Services Pvt. Ltd.</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">NBFC License No:</span>
                    <p className="text-gray-900">N-14.03268</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">RBI Registration Date:</span>
                    <p className="text-gray-900">March 15, 2023</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">License Valid Until:</span>
                    <p className="text-gray-900">March 14, 2026</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">CIN:</span>
                    <p className="text-gray-900">U65929DL2023PTC123456</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Authorized Capital:</span>
                    <p className="text-gray-900">₹50,00,00,000</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Regulatory Compliance</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>FinFlow Hub operates as a Non-Banking Financial Company (NBFC) under the regulations of:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Reserve Bank of India (RBI)</li>
                  <li>Ministry of Corporate Affairs (MCA)</li>
                  <li>Securities and Exchange Board of India (SEBI) - where applicable</li>
                  <li>Financial Intelligence Unit - India (FIU-IND)</li>
                  <li>Goods and Services Tax (GST) authorities</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. RBI Guidelines Compliance</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>We strictly adhere to RBI guidelines including:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Master Direction on Non-Banking Financial Company</li>
                  <li>Fair Practices Code for NBFCs</li>
                  <li>Know Your Customer (KYC) norms</li>
                  <li>Anti-Money Laundering (AML) guidelines</li>
                  <li>Customer grievance redressal mechanism</li>
                  <li>Interest rate guidelines and pricing transparency</li>
                  <li>Recovery guidelines and practices</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Permitted Activities</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>Under our NBFC license, we are authorized to conduct the following activities:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Lending and advances</li>
                  <li>Acquisition of shares/stocks/bonds/debentures</li>
                  <li>Leasing and hire-purchase finance</li>
                  <li>Credit facility services</li>
                  <li>Investment activities</li>
                  <li>Insurance business as agent</li>
                  <li>Chit fund business (with separate authorization)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Capital Adequacy</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>We maintain capital adequacy ratios as prescribed by RBI:</p>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Minimum Capital Requirement:</span>
                      <p>₹25,00,00,000 (Maintained)</p>
                    </div>
                    <div>
                      <span className="font-medium">Capital Adequacy Ratio:</span>
                      <p>18.5% (Min 15% required)</p>
                    </div>
                    <div>
                      <span className="font-medium">Tier 1 Capital Ratio:</span>
                      <p>16.2% (Min 10% required)</p>
                    </div>
                    <div>
                      <span className="font-medium">Last Audit Date:</span>
                      <p>September 30, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Grievance Redressal</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>We have established a robust grievance redressal mechanism:</p>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="font-medium">Grievance Officer:</span>
                    <p>Mr. Rajesh Kumar</p>
                    <p>Email: grievance@finflow.com</p>
                    <p>Phone: +91 78008 17765</p>
                  </div>
                  <div className="mt-4">
                    <span className="font-medium">Escalation Matrix:</span>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Level 1: Customer Service (Response within 24 hours)</li>
                      <li>Level 2: Grievance Officer (Response within 7 days)</li>
                      <li>Level 3: Principal Officer (Response within 30 days)</li>
                      <li>Level 4: RBI Ombudsman (If unresolved)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Credit Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                As per RBI guidelines, we report credit information to all four credit bureaus:
                CIBIL TransUnion, Experian, Equifax, and CRIF High Mark. This helps maintain 
                transparency in the credit ecosystem and enables better credit decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Interest Rate Policy</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>Our interest rate policy follows RBI guidelines:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Interest rates are risk-based and transparent</li>
                  <li>All charges are disclosed upfront</li>
                  <li>No hidden fees or charges</li>
                  <li>Rates are reviewed quarterly</li>
                  <li>Penal charges are reasonable and justified</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Audit and Compliance</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>Regular audits ensure compliance:</p>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="font-medium">Statutory Auditors:</span>
                    <p>M/s Gupta & Associates, Chartered Accountants</p>
                  </div>
                  <div>
                    <span className="font-medium">Internal Auditors:</span>
                    <p>M/s Financial Audit Services Pvt. Ltd.</p>
                  </div>
                  <div>
                    <span className="font-medium">Concurrent Audit:</span>
                    <p>Conducted quarterly for loan portfolio</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Board of Directors</h2>
              <div className="text-gray-700 leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Chairman & Managing Director:</span>
                    <p>Mr. Vansh Gupta</p>
                  </div>
                  <div>
                    <span className="font-medium">Independent Director:</span>
                    <p>Mrs. Priya Sharma</p>
                  </div>
                  <div>
                    <span className="font-medium">Executive Director:</span>
                    <p>Mr. Amit Kumar</p>
                  </div>
                  <div>
                    <span className="font-medium">Independent Director:</span>
                    <p>Dr. Rohit Verma</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>For regulatory queries and compliance matters:</p>
                <div className="mt-2 space-y-1">
                  <p>Registered Office: New Delhi, India</p>
                  <p>Compliance Officer: compliance@finflow.com</p>
                  <p>Phone: +91 78008 17764</p>
                  <p>Website: www.finflow.com</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}