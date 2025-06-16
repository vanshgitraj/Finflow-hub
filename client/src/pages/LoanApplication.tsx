// client/pages/LoanApplication.tsx

import React, { useState } from 'react'; import axios from 'axios';

const LoanApplication = () => { const [formData, setFormData] = useState({ loanType: '', amount: '', tenure: '', purpose: '' });

const [message, setMessage] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); try { console.log("Submitting form:", formData);

const payload = {
    ...formData,
    amount: Number(formData.amount) // ensure it's a number
  };

  const res = await axios.post('/api/loan-applications', payload);

  if (res.status === 200) {
    setMessage('Loan application submitted successfully!');
  } else {
    setMessage('Something went wrong.');
  }
} catch (err: any) {
  console.error("Form submission error:", err);
  setMessage('Failed to submit application. Please try again later.');
}

};

return ( <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow"> <h2 className="text-xl font-bold mb-4">Loan Application Form</h2> <form onSubmit={handleSubmit} className="space-y-4"> <div> <label className="block">Loan Type</label> <input
type="text"
name="loanType"
value={formData.loanType}
onChange={handleChange}
required
className="w-full border p-2"
/> </div>

<div>
      <label className="block">Amount</label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
    </div>

    <div>
      <label className="block">Tenure</label>
      <input
        type="text"
        name="tenure"
        value={formData.tenure}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
    </div>

    <div>
      <label className="block">Purpose</label>
      <input
        type="text"
        name="purpose"
        value={formData.purpose}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
    </div>

    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Submit
    </button>

    {message && <p className="mt-4 text-red-500">{message}</p>}
  </form>
</div>

); };

export default LoanApplication;

