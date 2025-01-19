import React, { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets"; // Ensure assets are imported correctly
import { Context } from "../../context/Context"; // Make sure Context is properly implemented

const Sidebar = () => {
  const [extended, setExtended] = useState(false); // Manage sidebar state
  const { onSent, prevPrompts = [], setRecentPrompt, newChat } = useContext(Context);

  // Function to load a specific prompt
  const loadPrompt = async (prompt) => {
    try {
      setRecentPrompt(prompt); // Update the current prompt
      await onSent(prompt); // Trigger the action to send the prompt
    } catch (error) {
      console.error("Error loading prompt:", error); // Handle errors gracefully
    }
  };

  return (
    <div className="sidebar">
      {/* Top Section */}
      <div className="top">
        {/* Menu Icon */}
        <img
          onClick={() => setExtended((prev) => !prev)} // Toggle sidebar extension
          className="menu"
          src={assets?.menu_icon || ""}
          alt="Menu"
        />

        {/* New Chat */}
        <div onClick={newChat} className="new-chat">
          <img src={assets?.plus_icon || ""} alt="New Chat" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent Prompts */}
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div
                  key={index} // Add unique key for React list rendering
                  onClick={() => loadPrompt(item)} // Trigger prompt loading
                  className="recent-entry"
                >
                  <img src={assets?.message_icon || ""} alt="Message" />
                  <p>{item.slice(0, 18)}...</p> {/* Show shortened prompt */}
                </div>
              ))
            ) : (
              <p>No recent prompts</p> // Placeholder if no prompts
            )}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        {/* Help Section */}
        <div className="bottom-item recent-entry">
          <img src={assets?.question_icon || ""} alt="Help" />
          {extended && <p>Help</p>}
        </div>

        {/* Activity Section */}
        <div className="bottom-item recent-entry">
          <img src={assets?.setting_icon || ""} alt="Activity" />
          {extended && <p>Activity</p>}
        </div>

        {/* Settings Section */}
        <div className="bottom-item recent-entry">
          <img src={assets?.history_icon || ""} alt="Settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
