import { useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/play/1')
  }

  return (
    <>
    <p>Wanna try this game?</p>
    <button type="button" onClick={handleClick}>Play</button>
    </>
  );
};
