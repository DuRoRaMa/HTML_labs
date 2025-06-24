import Navbar from "../components/Navbar";
import GamesGrid from "./components/GamesGrid";
import Footer from "../components/Footer";

function List() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="2" />
            <main style={{ flex: 1 }}>
                <GamesGrid />
            </main>
            <Footer />
        </div>
    );
}

export default List;