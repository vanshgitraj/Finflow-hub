import { Card, CardContent } from "@/components/ui/card";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal Disclaimer</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. General Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                The information provided on FinFlow Hub's website and services is for general informational 
                purposes only. While we strive to keep the information accurate and up-to-date, we make no 
                representations or warranties about the completeness, accuracy, reliability, suitability, or 
                availability of the information, products, services, or related graphics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Financial Advice Disclaimer</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>
                  FinFlow Hub does not provide personalized financial, investment, or legal advice. 
                  The content on our platform is for informational purposes only and should not be 
                  construed as:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Professional financial advice</li>
                  <li>Investment recommendations</li>
                  <li>Tax or legal guidance</li>
                  <li>Credit counseling services</li>
                </ul>
                <p className="mt-2">
                  We recommend consulting with qualified financial advisors, tax professionals, or 
                  legal experts before making financial decisions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Loan Approval Disclaimer</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>
                  Loan approval is subject to the following conditions:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Credit assessment and verification of information</li>
                  <li>Meeting eligibility criteria set by lending partners</li>
                  <li>Compliance with regulatory requirements</li>
                  <li>Final approval from lending institutions</li>
                </ul>
                <p className="mt-2">
                  FinFlow Hub acts as an intermediary and does not guarantee loan approval. 
                  Interest rates and terms may vary based on individual circumstances and market conditions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Credit Score Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                Credit scores provided through our platform are sourced from authorized credit bureaus. 
                However, scores may vary between different bureaus and may not reflect the exact score 
                used by lenders for credit decisions. Credit scores are updated periodically and may 
                not represent real-time information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform integrates with various third-party service providers including banks, 
                NBFCs, and credit bureaus. We are not responsible for the services, policies, or 
                actions of these third parties. Any transactions or interactions with third-party 
                providers are subject to their respective terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>
                  FinFlow Hub shall not be liable for any losses or damages arising from:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Use or inability to use our services</li>
                  <li>Errors or omissions in content or information</li>
                  <li>Unauthorized access to or alteration of data</li>
                  <li>Technical failures or interruptions</li>
                  <li>Actions of third-party service providers</li>
                  <li>Changes in interest rates or loan terms</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Regulatory Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                FinFlow Hub operates in compliance with applicable Indian laws and regulations including 
                RBI guidelines, IT Act 2000, and data protection laws. However, regulatory requirements 
                may change, and users are responsible for staying informed about relevant legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Market Risk Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                Interest rates, loan terms, and financial products are subject to market conditions and 
                regulatory changes. Past performance or promotional rates do not guarantee future availability. 
                Economic factors beyond our control may affect lending decisions and product offerings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Technical Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                While we implement security measures to protect user data, no system is completely secure. 
                Users are responsible for maintaining the confidentiality of their login credentials and 
                for all activities under their account. We recommend using secure networks and updated 
                browsers when accessing our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Updates and Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                This disclaimer may be updated periodically without prior notice. Users are encouraged 
                to review this page regularly. Continued use of our services after modifications 
                constitutes acceptance of the updated disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>For questions about this disclaimer, contact us:</p>
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