import { useSession } from "../../hooks/useSession";

const Welcome = () => {
  const session = useSession();

  return (
    <div className="Welcomeimg d-flex justify-content-center align-items-center ">
      <h1 className="mb-4 fs-1">Benvenuto {session.name}!</h1>
    </div>
  );
};

export default Welcome;
