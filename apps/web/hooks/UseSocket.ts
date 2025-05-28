import { useEffect, useState } from "react";

export function useSocket(){
    const [loading,setLoading]=useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
 const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0ODQ0Mzg0Mn0.dr3LD_C7ueq5P136ReZd7UClcHkvmtw4NwbupuYFDdU"
        const ws=new WebSocket(`ws://localhost:8080?token=${token}`);
        ws.onopen=()=>{
            setLoading(false)
            setSocket(ws)
        }
    },[])

    return {
        socket,loading
    }
}