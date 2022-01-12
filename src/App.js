import './App.css';
import CustomerDirectory from './components/CustomerDirectory';


function App() {
  return (
    <div className='container' style={{backgroundColor:'white', height:'100%', minHeight:'100vh'}}>
      <h1 className="text-center" style={{padding:'20px'}}>Customers</h1>
      <CustomerDirectory/>
    </div>

  );
}

export default App;
