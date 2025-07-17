import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCommentDots,
  faWindowMinimize,
  faPaperclip,
  faPaperPlane,
  faUpDownLeftRight, // expand icon
} from "@fortawesome/free-solid-svg-icons";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    const userMsg = { text: input, sender: "user", file: selectedFile };
    setMessages((prev) => [...prev, userMsg]);

    // Clear input & file
    const currentInput = input;
    setInput("");
    setSelectedFile(null);

    // Fetch bot reply from dummy API
    try {
      const res = await fetch(
        `https://dummyjson.com/comments/${Math.floor(Math.random() * 100) + 1}`
      );
      const data = await res.json();

      const botMsg = {
        text: `You said: "${currentInput}".\n Here's a random reply: "${data.body}"`,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const fallbackMsg = {
        text: "Oops! Couldn't fetch reply. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const sendFile = (file) => {
    console.log("Sending file:", file);
    // Placeholder: You can send file to backend here
    // const formData = new FormData();
    // formData.append('file', file);
    // await axios.post('/api/upload', formData);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const adjustInputHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 80) + "px"; // max ~3 lines
    }
  };

  return (
    <div style={styles.container}>
      {!isOpen && (
        <button style={styles.chatButton} onClick={toggleChat}>
          <FontAwesomeIcon icon={faCommentDots} size="lg" />
        </button>
      )}

      {isOpen && (
        <div
          style={{
            ...styles.chatWindow,
            ...(isExpanded ? styles.chatExpanded : {}),
          }}
        >
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.title}>ChatBot</span>
            <div style={styles.headerIcons}>
              <FontAwesomeIcon
                icon={faWindowMinimize}
                style={styles.icon}
                onClick={toggleChat}
              />
              <FontAwesomeIcon
                icon={faUpDownLeftRight}
                style={styles.icon}
                onClick={toggleExpand}
              />
            </div>
          </div>

          {/* Messages Area */}
          <div style={styles.messagesArea}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage),
                }}
              >
                {msg.text}
                {msg.file && (
                  <div style={{ fontSize: "12px", marginTop: "5px" }}>
                    📎 {msg.file.name} ({msg.file.type})
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* File Preview */}
          {selectedFile && (
            <div style={styles.filePreview}>
              <span>
                📎 {selectedFile.name} ({selectedFile.type})
              </span>
              <FontAwesomeIcon
                icon={faTimes}
                style={styles.removeFileIcon}
                onClick={() => setSelectedFile(null)}
                title="Remove file"
              />
            </div>
          )}

          {/* Input Area */}
          <div style={styles.inputArea}>
            <textarea
              ref={textareaRef}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustInputHeight();
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
              style={styles.textarea}
              rows={1}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <FontAwesomeIcon
              icon={faPaperclip}
              style={styles.iconBtn}
              onClick={() => fileInputRef.current.click()}
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{ ...styles.iconBtn, color: "#007bff" }}
              onClick={handleSend}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Styles
const styles = {
  container: {
    position: "relative",
  },
  chatButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
  chatWindow: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "350px",
    maxWidth: "90vw",
    height: "500px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1000,
  },
  chatExpanded: {
    position: "fixed",
    bottom: "0",
    right: "0",
    top: "0",
    left: "0",
    margin: "auto",
    borderRadius: "0px",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
  },
  filePreview: {
    fontSize: "13px",
    padding: "6px 10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  headerIcons: {
    display: "flex",
    gap: "12px",
    cursor: "pointer",
  },
  icon: {
    color: "#fff",
    cursor: "pointer",
  },
  messagesArea: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  message: {
    padding: "10px",
    margin: "6px 0",
    borderRadius: "10px",
    maxWidth: "75%",
    wordBreak: "break-word",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
    textAlign: "right",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
  },
  filePreview: {
    fontSize: "13px",
    padding: "5px 10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  inputArea: {
    padding: "10px",
    borderTop: "1px solid #ddd",
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    gap: "10px",
  },
  removeFileIcon: {
    marginLeft: "10px",
    color: "#ff4d4d",
    cursor: "pointer",
    fontSize: "14px",
  },
  textarea: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "16px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    resize: "none",
    lineHeight: "18px",
    maxHeight: "80px",
    overflowY: "auto",
  },
  iconBtn: {
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default ChatBot;
