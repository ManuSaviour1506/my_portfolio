import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      await axios.post('http://localhost:5000/api/contact', form);
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <section id="contact" className="min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-gray-900 mb-12 leading-tight drop-shadow-lg">
          Get in <span className="text-orange-600">Touch</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 border-t-4 border-orange-500">
          <div className="flex flex-col justify-center text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Let's Connect!</h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Let's collaborate on innovative future projects, leveraging diverse skills to create impactful solutions and achieve shared success.
            </p>
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start text-gray-700 text-lg">
                <Mail className="w-6 h-6 mr-3 text-orange-600" />
                <a href="mailto:manusaviour5@gmail.com" className="hover:underline text-blue-600">manusaviour5@gmail.com</a>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-700 text-lg">
                <Phone className="w-6 h-6 mr-3 text-orange-600" />
                <a href="tel:+916305748682" className="hover:underline text-blue-600">+91 63057 48682</a>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-700 text-lg">
                <MapPin className="w-6 h-6 mr-3 text-orange-600" />
                Eluru,  Andrapradesh  534001
              </div>
            </div>
          </div>
          <div className="bg-white p-0 rounded-xl">
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                aria-label="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                aria-label="Your Email"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject (Optional)"
                value={form.subject}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                aria-label="Subject"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent h-40 resize-y text-gray-800 placeholder-gray-500"
                aria-label="Your Message"
                required
              ></textarea>
              <button
                type="submit"
                className="flex items-center justify-center bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg
                           hover:bg-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <Send className="w-5 h-5 mr-2" /> Send Message
              </button>
              {status && <p className="text-center text-sm mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}