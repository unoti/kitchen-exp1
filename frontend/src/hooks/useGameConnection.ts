import { useState, useEffect } from "react";
import GameConnection from "../services/GameConnection";

const useGameConnection = () => {
  const [connection, setConnection] = useState<GameConnection | null>(null);

  useEffect(() => {
    const gc = new GameConnection();
    setConnection(gc);

    return () => {
      gc.disconnect();
    };
  }, []);

  return connection;
};

export default useGameConnection;
