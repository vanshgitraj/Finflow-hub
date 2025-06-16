import React, { useState } from 'react';
import axios from 'axios';

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    mobile: '',
    email: '',
    panCard: '',
    gender: '',
    currentAddress: '',
    employmentType: '',
    monthlyIncome: '',
    companyName: '',
    workExperience: '',
    existingEmis: '',
    accountType: '',
    loanType: '',
    loanAmount: '',
    tenure: '',
    purpose: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      loanAmount: Number(formData.loanAmount),
      tenure: Number(formData.tenure),
      monthlyIncome: Number(formData.monthlyIncome),
      existingEmis: Number(formData.existingEmis)
    };

    console.log("Sending to API:", payload);

    try {
      const res = await axios.post('/api/loan-applications', payload);

      if (res.status === 200) {
        setMessage('Loan application submitted successfully!');
      } else {
        setMessage('Something went wrong.');
      }
    } catch (err: any) {
      console.error("Form submission error:", err.response?.data || err);
      setMessage(err.response?.data?.message || 'Failed to submit application. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Loan Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full border p-2" />
        <input name="dateOfBirth" type="date" placeholder="DOB" value={formData.dateOfBirth} onChange={handleChange} required className="w-full border p-2" />
        <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required className="w-full border p-2" />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border p-2" />
        <input name="panCard" placeholder="PAN Card" value={formData.panCard} onChange={handleChange} required className="w-full border p-2" />
        <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full border p-2">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input name="currentAddress" placeholder="Current Address" value={formData.currentAddress} onChange={handleChange} required className="w-full border p-2" />
        <input name="employmentType" placeholder="Employment Type" value={formData.employmentType} onChange={handleChange} required className="w-full border p-2" />
        <input name="monthlyIncome" type="number" placeholder="Monthly Income" value={formData.monthlyIncome} onChange={handleChange} required className="w-full border p-2" />
        <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required className="w-full border p-2" />
        <input name="workExperience" placeholder="Work Experience" value={formData.workExperience} onChange={handleChange} required className="w-full border p-2" />
        <input name="existingEmis" type="number" placeholder="Existing EMIs" value={formData.existingEmis} onChange={handleChange} className="w-full border p-2" />
        <input name="accountType" placeholder="Account Type" value={formData.accountType} onChange={handleChange} required className="w-full border p-2" />
        <input name="loanType" placeholder="Loan Type" value={formData.loanType} onChange={handleChange} required className="w-full border p-2" />
        <input name="loanAmount" type="number" placeholder="Loan Amount" value={formData.loanAmount} onChange={handleChange} required className="w-full border p-2" />
        <input name="tenure" type="number" placeholder="Tenure (in years)" value={formData.tenure} onChange={handleChange} required className="w-full border p-2" />
        <input name="purpose" placeholder="Purpose" value={formData.purpose} onChange={handleChange} required className="w-full border p-2" />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default LoanApplication;