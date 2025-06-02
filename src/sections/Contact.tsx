import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import EarthCanvas from '../components/Earth';
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Map the EmailJS field names back to our state object keys
    const stateKey = name === 'from_name' ? 'name' 
                   : name === 'from_email' ? 'email'
                   : name;
    setFormData(prevData => ({ ...prevData, [stateKey]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!formRef.current) return;

      // Create template parameters for EmailJS
      const templateParams = {
        subject: formData.subject,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: 'talal.ahmad.qamar@gmail.com',
        from_name: `${formData.name} (${formData.email})`,
        reply_to: formData.email
      };

      // Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Save message to backend database
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save message to database');
      }
      
      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen mx-auto">
      <motion.div
        className="container mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold inline-block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-8">
              Let's Connect
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-12">
              I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want to chat, feel free to reach out!
            </p>
            
            <form ref={formRef} onSubmit={handleSubmit} className="glass p-8 rounded-xl">
              <div className="mb-6">
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="from_name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="from_email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition duration-300"
                  placeholder="Project Inquiry"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition duration-300"
                  placeholder="Hello, I'd like to discuss a potential project..."
                  required
                ></textarea>
              </div>
              
              <motion.button 
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white hover:opacity-90 transition duration-300 purple-glow flex justify-center items-center"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Send Message 
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 h-[500px] w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <EarthCanvas />
        </motion.div>
      </motion.div>

      
    </section>
  );
};

export default Contact;
