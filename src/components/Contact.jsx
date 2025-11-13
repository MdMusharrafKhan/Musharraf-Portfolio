import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Debug: Check if env variables are loaded
    console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    emailjs.sendForm(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  formRef.current,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)

      .then(
        (result) => {
          console.log("EmailJS Result:", result.text);
          setLoading(false);
          setMessage("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          setLoading(false);
          setMessage("Failed to send message. Try again later.");
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center min-h-screen px-8 py-20 bg-gray-100 dark:bg-gray-900"
    >
      <h3 className="text-4xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        Contact Me
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl h-[60%] w-full md:h-[80%] bg-white dark:bg-gray-800 rounded-xl p-10 shadow-lg"
      >
        <p className="text-gray-800 font-mono text-lg md:text-lg dark:text-gray-400 mb-6 text-justify">
          If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 mb-2 font-bold">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="user_name"
              required
              className="p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 mb-2 font-bold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="user_email"
              required
              className="p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 mb-2 font-bold">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows="5"
              required
              className="p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {message && (
            <p
              className={`mt-2 text-center ${
                message.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
