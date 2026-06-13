import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Details } from './components/Details';
import { Outcomes } from './components/Outcomes';
import { FAQ } from './components/FAQ';
import { RegistrationForm } from './components/RegistrationForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-zinc-200 selection:bg-brand-primary selection:text-white transition-colors duration-300">
      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right" 
        richColors 
        theme="dark" 
        toastOptions={{
          style: {
            borderRadius: '1rem',
          }
        }}
      />
      
      {/* Navigation Header */}
      <Navbar />

      <main>
        {/* Hero Banner */}
        <Hero />
        
        {/* Core Workshop Metrics Grid */}
        <Details />
        
        {/* Learning Curriculum Grid */}
        <Outcomes />
        
        {/* Collapsible FAQ Accordion */}
        <FAQ />
        
        {/* Dynamic Controlled Registration Form */}
        <RegistrationForm />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}

export default App;
