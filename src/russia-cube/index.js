import RussiaCube from "./russia-cube";
import { useSelector } from "react-redux";
import Welcome from "./components/welcome";

function RussiaCubeRouter(props) {
  const state = useSelector((state) => state.cube.state);
  if (state === 0) {
    return <Welcome />;
  }
  return <RussiaCube />;
}

export default RussiaCubeRouter;
