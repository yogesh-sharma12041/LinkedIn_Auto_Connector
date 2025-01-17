// import React, { useState } from "react";

// const App = () => {
//   const [isProcessing, setIsProcessing] = useState(false);

//   const sendConnectionRequests = async () => {
//     setIsProcessing(true);

//     try {
//       // Get current active tab
//       const [tab] = await chrome.tabs.query({
//         active: true,
//         currentWindow: true,
//       });

//       if (!tab?.id) {
//         throw new Error("No active tab found");
//       }

//       if (!tab.url?.includes("linkedin.com")) {
//         alert("Please open LinkedIn to use this extension");
//         setIsProcessing(false);
//         return;
//       }

//       // Execute content script to inject the button
//       await chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: injectDraggableButton, // Call the function directly here
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error instanceof Error ? error.message : "An error occurred");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Define the injectDraggableButton function here
//   const injectDraggableButton = () => {
//     if (document.getElementById("connect-with-all-btn")) return; // Prevent duplicates

//     // Create a round button
//     const button = document.createElement("button");
//     button.id = "connect-with-all-btn";
//     button.innerText = "Connect with all"; // Text that represents the button

//     // Style the button (round, floating at bottom-right corner)
//     Object.assign(button.style, {
//       position: "fixed",
//       bottom: "20px",
//       right: "20px",
//       zIndex: "10000",
//       width: "100px",
//       height: "50px",
//       borderRadius: "10%", // Makes the button round
//       fontSize: "20px",
//       backgroundColor: "#0073b1",
//       color: "#fff",
//       border: "none",
//       boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//       cursor: "pointer",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     });

//     // Add hover effect
//     button.onmouseenter = () => (button.style.backgroundColor = "#005582");
//     button.onmouseleave = () => (button.style.backgroundColor = "#0073b1");

//     // Add the click event listener
//     button.addEventListener("click", connectWithAll);

//     // Make the button draggable
//     let isDragging = false;
//     let offsetX = 0;
//     let offsetY = 0;

//     button.addEventListener("mousedown", (e) => {
//       isDragging = true;
//       offsetX = e.clientX - button.getBoundingClientRect().left;
//       offsetY = e.clientY - button.getBoundingClientRect().top;
//       document.body.style.cursor = "move"; // Change cursor to move while dragging
//     });

//     document.addEventListener("mousemove", (e) => {
//       if (isDragging) {
//         button.style.left = `${e.clientX - offsetX}px`;
//         button.style.top = `${e.clientY - offsetY}px`;
//       }
//     });

//     document.addEventListener("mouseup", () => {
//       isDragging = false;
//       document.body.style.cursor = "default"; // Reset cursor to default
//     });

//     // Append the button to the body
//     document.body.appendChild(button);
//   };

//   // Define the connectWithAll function
//   const connectWithAll = () => {
//     const doc = document;

//     // Find all "Connect" buttons
//     const connectButtons = Array.from(doc.querySelectorAll("button")).filter(
//       (button) =>
//         button.textContent &&
//         button.textContent.toLowerCase().includes("connect") &&
//         button.offsetParent !== null
//     );

//     // Handle case where no "Connect" buttons are found
//     if (connectButtons.length === 0) {
//       alert("No connectable profiles available on this page.");
//       return;
//     }

//     // Click each "Connect" button with a delay
//     connectButtons.forEach((button, index) => {
//       setTimeout(() => {
//         button.click();

//         // Look for and click the "Send" button in the modal, if it appears
//         setTimeout(() => {
//           const sendButton = Array.from(doc.querySelectorAll("button")).find(
//             (btn) =>
//               btn.textContent &&
//               btn.textContent.toLowerCase().includes("send") &&
//               btn.offsetParent !== null
//           );

//           if (sendButton) sendButton.click();
//         }, 500);
//       }, index * 1000); // 1-second delay between each click
//     });

//     alert(`Attempted to connect with ${connectButtons.length} profiles.`);
//   };

//   return (
//     <div className="container">
//       <button
//         onClick={sendConnectionRequests}
//         disabled={isProcessing}
//         className="connect-button"
//       >
//         {isProcessing ? "Processing..." : "Send to All"}
//       </button>
//     </div>
//   );
// };

// export default App;
