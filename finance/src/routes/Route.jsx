import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from '../Components/About';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Home from '../Components/Home'; // Assuming you have a Home component
import ContactUs from '../Components/ContactUs';
import Membership from '../Components/Membership';
import Services from '../Components/Services';
import ExpenseTracking from '../Components/ServicesComponents/EventManagement/ExpenseTracking';
// import IncomeManagement from '../Components/ServicesComponents/IncomeManagement';
import { useState } from 'react';
import ProjectEventManagement from '../Components/ServicesComponents/ProjectEventManagement';
import ExecutionNotesComp from '../Components/ServicesComponents/EventManagement/ExecutionNotesComp';
import VisualReports from '../Components/ServicesComponents/VisualReports';
import FinanceResources from '../Components/ServicesComponents/FinanceResources';

import ProtectedRoute from '../ProtectedRoute.jsx';
// import IncomeSavingManagement from '../Components/ServicesComponents/IncomeSavingManagement';

function AppRoutes() {
  const [expenses, setExpenses] = useState([]); // State for expenses
  const [executionNotes, setExecutionNotes] = useState([]); // State for expenses

  return (
    <BrowserRouter>
      <Header /> {/* Header stays consistent across all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/membership" element={<Membership/>} />
        {/* <Route path="/services" element={<ProtectedRoute element={<Services/>} />} /> */}
        <Route path="/expense-track" element={<ExpenseTracking expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/event-manage" element={<ProjectEventManagement expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/notes" element={<ExecutionNotesComp setExecutionNotes={setExecutionNotes} />} />
        <Route path="/visual-reports" element={<VisualReports expenses={expenses}/>} />
        <Route path="/resources" element={<FinanceResources/>} />
        {/* <Route path="/income-savings" element={<IncomeManagement expenses={expenses} setExpenses={setExpenses} />} /> */}
        {/* <Route path="/income-saving-management" element={<IncomeSavingManagement expenses={expenses} setExpenses={setExpenses} />} /> */}

        {/* <Route path="/profile" element={<Profile />} /> Example Profile Route */}
      </Routes>
      <Footer /> {/* Footer stays consistent across all pages */}
    </BrowserRouter>
  );
}

export default AppRoutes;
