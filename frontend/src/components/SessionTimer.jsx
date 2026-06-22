import { useEffect, useState } from "react";

function SessionTimer({ checkIn }) {

  const [elapsed,setElapsed]=useState("");

  useEffect(()=>{

    if(!checkIn) return;

    const interval=setInterval(()=>{

      const start=new Date(checkIn);

      const now=new Date();

      const diff=now-start;

      const hours=Math.floor(diff/3600000);

      const minutes=Math.floor(
        (diff%3600000)/60000
      );

      const seconds=Math.floor(
        (diff%60000)/1000
      );

      setElapsed(
        `${hours}h ${minutes}m ${seconds}s`
      );

    },1000);

    return ()=>clearInterval(interval);

  },[checkIn]);

  return (

    <div className="card shadow p-4">

      <h5>
        Current Session
      </h5>

      <h2 className="text-success">

        {elapsed}

      </h2>

    </div>

  );

}

export default SessionTimer;