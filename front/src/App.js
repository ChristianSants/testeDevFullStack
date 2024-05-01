import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login/Login';
import { LoadingProvider } from './contexts/Loading';
import LoadingOverlay from './components/General/LoadingOverlay';

const App = () => {
    return (
        <BrowserRouter>
            <LoadingProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                </Routes>
                
                <LoadingOverlay/>
            </LoadingProvider>
        </BrowserRouter>
    );
}

export default App;
