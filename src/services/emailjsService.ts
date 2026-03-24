import emailjs from '@emailjs/browser';

// Initialize once
emailjs.init("wNbnhDaZGSpVbVLPA");

export const sendContactForm = (form: HTMLFormElement) => {
  return emailjs.sendForm(
    "service_l2xpyep",
    "template_nmhnwxe",
    form
  );
};