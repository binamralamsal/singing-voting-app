import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: [Insert Date]</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
        <p className="mb-4">
          Welcome to Cosmo Acoustic Challenge 3.0 (&quot;we&quot;,
          &quot;our&quot;, &quot;us&quot;). We are committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, and
          disclose information when you use our application and services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Information We Collect
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          Personal Information
        </h3>
        <p className="mb-4">
          When you participate in the Cosmo Acoustic Challenge 3.0, we may
          collect the following personal information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Name</li>
          <li>Phone Number</li>
          <li>Alternative Phone Number</li>
          <li>Address</li>
          <li>Motivation for participating in the challenge</li>
          <li>Date of Birth (for validation purposes)</li>
          <li>
            Video File (containing your singing performance for the competition)
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          Google Account Information
        </h3>
        <p className="mb-4">
          When you log in using Google OAuth, we may collect your Google Account
          information, which includes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Name</li>
          <li>Email Address</li>
          <li>Profile Picture</li>
          <li>Other basic profile information</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the information we collect in the following ways:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            To manage and operate the singing competition: This includes
            validating participants, processing entries, and contacting
            participants as necessary.
          </li>
          <li>
            To communicate with you: We may use your contact information to send
            updates, notifications, and other important information related to
            the competition.
          </li>
          <li>
            To improve our services: We may use the collected information to
            understand how our services are used and make improvements.
          </li>
          <li>
            For legal and security purposes: To comply with legal obligations
            and protect against fraud and misuse of our services.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell or share your personal information with third parties
          except as described in this policy:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Service Providers: We may share your information with third-party
            service providers who perform services on our behalf, such as
            hosting and data storage.
          </li>
          <li>
            Legal Requirements: We may disclose your information if required to
            do so by law or in response to valid requests by public authorities.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
        <p className="mb-4">
          We take the security of your data seriously and use reasonable
          administrative, technical, and physical safeguards to protect your
          information from loss, theft, misuse, unauthorized access, disclosure,
          alteration, and destruction.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Your Choices</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Access and update your information: You can review and change your
            personal information by contacting us.
          </li>
          <li>
            Withdraw consent: If you have given consent for data processing, you
            can withdraw it at any time by contacting us.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Children&apos;s Privacy
        </h2>
        <p className="mb-4">
          Our services are not intended for children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          we become aware that we have collected personal information from a
          child under 13, we will take steps to delete such information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on our website.
          You are advised to review this Privacy Policy periodically for any
          changes.
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
