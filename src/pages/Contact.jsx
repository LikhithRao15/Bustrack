import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      showPopup("Please fill in all fields", "error");
      return;
    }

    showPopup("✅ Message sent successfully!", "success");

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });

    setTimeout(() => {
      setPopup({ ...popup, show: false });
    }, 3000);
  };

  return (
    <div className="relative max-w-xl mx-auto p-6">
      {/* Top Popup */}
      {popup.show && (
        <div className={`alert alert-${popup.type} shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit`}>
          <span>{popup.message}</span>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows="4"
        />

        <button type="submit" className="btn btn-primary w-full">
          Send Message
        </button>
      </form>
    </div>
  );
}
