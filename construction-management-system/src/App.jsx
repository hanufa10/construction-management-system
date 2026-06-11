import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout"; // Make sure this path is correct
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import ProjectInfo from "./pages/ProjectInfo";
import FinancialStatus from "./pages/FinancialStatus";
import ExportPage from "./pages/ExportPage";
import ProjectPhotos from "./pages/ProjectPhotos";

import "./index.css";

function App() {
  // Initial state for projects
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Villa in Bole",
      address: "123 Main St, Addis Ababa",
      description: "A beautiful villa in Bole, Addis Ababa.",
      contractorName: "ABC Contractors",
      contractorAddress: "123 Main St, Addis Ababa",
      contactName: "John Doe",
      phone: "123-456-7890",
      website: "http://example.com/villa",
    },
    {
      id: "2",
      name: "Apartment Project",
      address: "456 Oak Ave, Addis Ababa",
      description: "A modern apartment project in Addis Ababa.",
      contractorName: "XYZ Builders",
      contractorAddress: "456 Oak Ave, Addis Ababa",
      contactName: "Jane Smith",
      phone: "098-765-4321",
      website: "http://example.com/apartment",
    },
  ]);

  // State for the currently selected project ID
  const [selectedProject, setSelectedProject] = useState("1");

  // Find the actual project object based on the ID
  const currentProject = projects.find((p) => p.id === selectedProject);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      projectId: "1",
      date: "2026-06-10",
      item: "Cement",
      description: "Portland cement",
      quantity: 10,
      category: "Materials",
      unitPrice: 150,
      amount: 1500,
      phase: "Foundation",
    },
    {
      id: 2,
      projectId: "1",
      date: "2026-06-12",
      item: "Plumber",
      description: "Labor fee",
      quantity: 1,
      category: "Labour",
      unitPrice: 500,
      amount: 500,
      phase: "Finishing",
    },
    {
      id: 3,
      projectId: "2",
      date: "2026-06-11",
      item: "Steel",
      description: "Rebar for structure",
      quantity: 20,
      category: "Materials",
      unitPrice: 200,
      amount: 4000,
      phase: "Structure",
    },
    {
      id: 4,
      projectId: "2",
      date: "2026-06-13",
      item: "Electrician",
      description: "Labor fee",
      quantity: 1,
      category: "Labour",
      unitPrice: 700,
      amount: 700,
      phase: "Finishing",
    },
    {
      id: 5,
      projectId: "1",
      date: "2026-06-15",
      item: "Bricks",
      description: "Red bricks for walls",
      quantity: 500,
      category: "Materials",
      unitPrice: 1.5,
      amount: 750,
      phase: "Structure",
    },
    {
      id: 6,
      projectId: "1",
      date: "2026-06-16",
      item: "Painter",
      description: "Labor fee",
      quantity: 1,
      category: "Labour",
      unitPrice: 600,
      amount: 600,
      phase: "Finishing",
    },
  ]);
  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };
  const handleAddFunding = (projectId, fundingData) => {
  setProjects(prevProjects => 
    prevProjects.map(p => 
      p.id === projectId 
        ? { 
            ...p, 
            budgetAdjustments: [...(p.budgetAdjustments || []), fundingData] 
          }
        : p
    )
  );
};
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar manages the project switching */}
        <Sidebar
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />

        <div className="main-content">
          <Routes>
            {/* Dashboard Page */}
            <Route
              path="/"
              element={
                <Layout project={currentProject} title="Dashboard">
                  <Dashboard 
                  project={currentProject} 
                  expenses={expenses}
                  />
                </Layout>
              }
            />

            {/* Expenses Page */}
            <Route
              path="/expenses"
              element={
                <Layout project={currentProject} title="Expenses & Materials">
                  {/* 2. Pass the expenses state down */}
                  <ExpensesPage
                    selectedProjectId={selectedProject}
                    expenses={expenses}
                    onAddExpense={addExpense}
                  />
                </Layout>
              }
            />
            <Route
              path="/info"
              element={
                <Layout project={currentProject} title="Project Information">
                  <ProjectInfo project={currentProject} />
                </Layout>
              }
            />
            <Route
              path="/progress"
              element={
                <Layout project={currentProject} title="Project Photos">
                  <ProjectPhotos project={currentProject} />
                </Layout>
              }
            />
            <Route path="/reports" element={
              <Layout project={currentProject} title="Export Reports">
                <ExportPage project={currentProject} expenses={expenses} />
              </Layout>
            } />
            
            <Route
              path="/finance"
              element={
                <Layout project={currentProject} title="Financial Status">
                  <FinancialStatus
                    project={currentProject}
                    expenses={expenses}
                    onAddFunding={(amount) =>
                      handleAddFunding(currentProject.id, amount)
                    }
                  />
                </Layout>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
