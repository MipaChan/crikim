// in app/routes/$.tsx
import App from "../components/App";
import styles from "~/styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default App;