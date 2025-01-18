import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  // Handle input submit on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      onSent(); // Trigger the function when Enter is pressed
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>ChatterSphere</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello Dev...</span>
              </p>
              <p>How can I help you today!</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful place to see on a upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            {/* Add onKeyDown to detect Enter key */}
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} // Trigger handleKeyDown on key press
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input ? (
                <img
                  onClick={onSent}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            ChatterSphere may display inaccurate info, including about people,
            so double-check its responses. Your privacy and ChatterSphere Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
