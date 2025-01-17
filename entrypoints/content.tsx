import { FloatingConnectButton } from "../FloatingConnectButton";
import { createRoot } from "react-dom/client";
export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    console.log("Hello content.");

    const container = document.createElement('div');
    container.id = 'linkedin-connect-button-container';
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<FloatingConnectButton />);

    return () => {
      root.unmount();
      container.remove();
    };
    
  },
});