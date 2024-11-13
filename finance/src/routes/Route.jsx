import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from '../Components/About';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Home from '../Components/Home'; // Assuming you have a Home component
import ContactUs from '../Components/ContactUs';
import Membership from '../Components/Membership';
import Services from '../Components/Services';
import ExpenseTracking from '../Components/ServicesComponents/ExpenseTracking';
// import IncomeManagement from '../Components/ServicesComponents/IncomeManagement';
import { useEffect, useState } from 'react';
import ProjectEventManagement from '../Components/ServicesComponents/ProjectEventManagement';
import ExecutionNotesComp from '../Components/ServicesComponents/EventManagement/ExecutionNotesComp';
import VisualReports from '../Components/ServicesComponents/VisualReports';
import FinanceResources from '../Components/ServicesComponents/FinanceResources';

import ProtectedRoute from '../ProtectedRoute.jsx';
// import ProtectedRoute2 from '../ProtectedRoute2.jsx';
import ProtectedRoute3 from '../useFetchWithMembershipCheck.jsx';
// import IncomeSavingManagement from '../Components/ServicesComponents/IncomeSavingManagement';

function AppRoutes() {
  const [expenses, setExpenses] = useState([]); // State for expenses
  const [executionNotes, setExecutionNotes] = useState([]); // State for expenses
  const [budget, setBudget] = useState(0); // Default budget value

  

   const [isMember, setIsMember] = useState(false);


  const [events, setEvents] = useState([]);


  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      console.log("1")
      try {
        const response = await fetch('http://localhost:5000/get-events', {
          method: 'GET',
          credentials: 'include', // Include session cookies
        });
        console.log("2", response)
        const data = await response.json();
        console.log("3")

        console.log(data)
        if (data.success) {
          setEvents(data.events);  // Set the events state
          console.log("fdg", events)

        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.log('Failed to fetch events', err);
      } finally {
        console.log(false);
      }
    };

    fetchEvents();
  }, []);



  // Fetch expenses on mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-expenses', {
          method: 'GET',
          credentials: 'include', // Include session cookies
        });
        const data = await response.json();
        
        if (data.success) {
          setExpenses(data.expenses);
          console.log("Expenses:", data.expenses); // Log the expenses
        } else {
          console.log('Failed to fetch expenses.');
        }
      } catch (error) {
        console.log('Error fetching expenses:', error);
        console.log('An error occurred while fetching expenses.');
      } finally {
        console.log(false);
      }
    };

    fetchExpenses();
  }, []);


  
  useEffect(() => {
    // Fetch the budget from the server
    const fetchBudget = async () => {
        console.log("1")
        try {
            const response = await fetch('http://localhost:5000/budget', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Ensure credentials are sent
            });
            console.log("2", response)

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                return;
            }

            const data = await response.json();
            console.log(budget,"asfdgsf")
            setBudget(data.budget);
            
        } catch (error) {
            console.error('Error fetching budget:', error);
        }
    };

    fetchBudget();
}, [budget]);

// useEffect(()=>{
//   const isMember = async()=>{
//     try {
//       const response = await fetch('http://localhost:5000/me', {
//           method: 'GET',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           credentials: 'include' // Ensure credentials are sent
//       });
//       console.log("2", response)

//       if (!response.ok) {
//           const errorData = await response.json();
//           console.log(errorData.message);
//           return;
//       }

//       const data = await response.json();
//       console.log(data,"usergsdfg")
      
//   } catch (error) {
//       console.error('Error fetching user:', error);
//   }
  
//   }
//   isMember();
// })





  const handleBudgetChange = async (newBudget) => {
    console.log('Updating budget to:', newBudget); // Log the budget being sent
    try {
      const response = await fetch(`http://localhost:5000/budget`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ budget: newBudget }),
        credentials: 'include', // Ensure cookies are sent with the request
      });

      console.log('Response status:', response.status); // Log the response status

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating budget:', errorData.message);
        return;
      }

      const updatedUser = await response.json();
      console.log('Budget updated:', updatedUser.user.budget);
      setBudget(updatedUser.user.budget);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };




  return (
    <BrowserRouter>
      <Header /> {/* Header stays consistent across all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/services" element={<ProtectedRoute element={<Services />} />} />
        <Route path="/expense-track" element={<ExpenseTracking expenses={expenses} setExpenses={setExpenses} budget={budget} onBudgetChange={handleBudgetChange} />} />
        <Route path="/event-manage" element={<ProtectedRoute3 element={<ProjectEventManagement expenses={expenses} setExpenses={setExpenses} events={events} setEvents={setEvents} />}/>} />
        <Route path="/notes" element={<ProtectedRoute element={<ExecutionNotesComp setExecutionNotes={setExecutionNotes} />}/>} />
        <Route path="/visual-reports" element={<ProtectedRoute3 element={<VisualReports expenses={expenses} events={events} budget={budget} />}/>} />
        <Route path="/resources" element={<FinanceResources />} />
        {/* <Route path="/income-savings" element={<IncomeManagement expenses={expenses} setExpenses={setExpenses} />} /> */}
        {/* <Route path="/income-saving-management" element={<IncomeSavingManagement expenses={expenses} setExpenses={setExpenses} />} /> */}

        {/* <Route path="/profile" element={<Profile />} /> Example Profile Route */}
      </Routes>
      <Footer /> {/* Footer stays consistent across all pages */}
    </BrowserRouter>
  );
}

export default AppRoutes;
