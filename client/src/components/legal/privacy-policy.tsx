import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>We collect the following types of information:</p>
                <h3 className="font-medium mt-4 mb-2">Personal Information:</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Full name, date of birth, and contact details</li>
                  <li>PAN Card, Aadhaar Card, and other identity documents</li>
                  <li>Employment and income information</li>
                  <li>Bank account and financial details</li>
                  <li>Credit history and CIBIL score</li>
                </ul>
                <h3 className="font-medium mt-4 mb-2">Technical Information:</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Cookies and usage data</li>
                  <li>Location data (with consent)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Processing loan applications and credit assessments</li>
                  <li>Verifying identity and preventing fraud</li>
                  <li>Providing customer support and services</li>
                  <li>Complying with legal and regulatory requirements</li>
                  <li>Improving our services and user experience</li>
                  <li>Marketing and promotional communications (with consent)</li>
                  <li>Credit reporting to bureaus</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>We may share your information with:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Credit bureaus (CIBIL, Experian, Equifax, CRIF)</li>
                  <li>Partner banks and financial institutions</li>
                  <li>Verification agencies for KYC purposes</li>
                  <li>Legal authorities when required by law</li>
                  <li>Service providers and technology partners</li>
                  <li>Collection agencies in case of defaults</li>
                </ul>
                <p className="mt-2">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>We implement robust security measures including:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>256-bit SSL encryption for data transmission</li>
                  <li>Secure data centers with access controls</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Employee training on data protection</li>
                  <li>Multi-factor authentication systems</li>
                  <li>Data backup and disaster recovery procedures</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>Under applicable data protection laws, you have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access your personal information</li>
                  <li>Rectify inaccurate or incomplete data</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability to another service provider</li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
                <p className="mt-2">
                  To exercise these rights, contact us at privacy@finflow.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide services, 
                comply with legal obligations, resolve disputes, and enforce agreements. 
                Credit-related information is retained for 7 years as per RBI guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies Policy</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>We use cookies to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve website functionality and security</li>
                </ul>
                <p className="mt-2">
                  You can control cookies through your browser settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party services. We are not responsible 
                for the privacy practices of these external sites. Please review their privacy 
                policies before providing any information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of significant 
                changes through email or website notifications. Continued use of our services 
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>For privacy-related inquiries or concerns, contact us:</p>
                <div className="mt-2 space-y-1">
                  <p>Data Protection Officer: privacy@finflow.com</p>
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