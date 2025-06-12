import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using FinFlow Hub's services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service. If you do not agree to these terms, please 
                do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>To use our services, you must:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Be at least 18 years of age</li>
                  <li>Be a resident of India</li>
                  <li>Have valid identity documents (PAN Card, Aadhaar Card)</li>
                  <li>Provide accurate and complete information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Services Offered</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>FinFlow Hub provides the following services:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Personal Loans</li>
                  <li>Home Loans</li>
                  <li>Business Loans</li>
                  <li>Professional Loans</li>
                  <li>Loan Against Property</li>
                  <li>Gold Loans</li>
                  <li>Car Loans</li>
                  <li>Overdraft Facilities</li>
                  <li>Balance Transfer Services</li>
                  <li>CIBIL Score Checking</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Loan Application Process</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>When applying for a loan through our platform:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>All information provided must be accurate and truthful</li>
                  <li>We reserve the right to verify all submitted information</li>
                  <li>Loan approval is subject to credit assessment and eligibility criteria</li>
                  <li>Interest rates and terms are subject to change based on market conditions</li>
                  <li>Processing fees may apply as per the loan product</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Interest Rates and Fees</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>Interest rates and fees are determined based on:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Credit score and credit history</li>
                  <li>Income and employment status</li>
                  <li>Loan amount and tenure</li>
                  <li>Current market rates</li>
                  <li>RBI guidelines and regulations</li>
                </ul>
                <p className="mt-2">
                  All rates and fees will be clearly disclosed before loan disbursal. 
                  Processing fees are non-refundable once the loan application is processed.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Repayment Terms</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>Borrowers must adhere to the following repayment terms:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>EMIs must be paid on the due date each month</li>
                  <li>Late payment charges will apply for overdue payments</li>
                  <li>Prepayment is allowed with applicable charges</li>
                  <li>Default in payment may result in legal action</li>
                  <li>Credit bureaus will be notified of payment behavior</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                We are committed to protecting your personal information. Please refer to our Privacy Policy 
                for detailed information about how we collect, use, and protect your data in compliance with 
                applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                FinFlow Hub shall not be liable for any indirect, incidental, special, or consequential damages 
                arising from the use of our services. Our total liability shall not exceed the amount of fees 
                paid by you for the specific service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>For any questions regarding these Terms of Service, contact us:</p>
                <div className="mt-2 space-y-1">
                  <p>Email: legal@finflow.com</p>
                  <p>Phone: +91 78008 17764</p>
                  <p>Address: New Delhi, India</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}