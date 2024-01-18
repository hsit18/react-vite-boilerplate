import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Home page</h1>
            <Button onClick={() => navigate({ to: '/users' })}>Users</Button>
            <Button onClick={() => navigate({ to: '/payments' })}>Payments</Button>
        </div>

    )
}

export default HomePage;