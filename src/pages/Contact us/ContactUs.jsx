import "./ContactUs.css";
import email from "../../assets/513_email.jpg";
import { SiWhatsapp } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa"; 
import { useRef,useState } from "react";   
import emailjs from '@emailjs/browser';

function ContactUs() {
  
  const [values,setValues] = useState({
		name: '',
		email: '',
		message: ''
	});

	const form = useRef()

	const sendEmail = (e) => {
		e.preventDefault();
	
		emailjs
		  .send('service_8agw2vd', 'template_qbsy88h', {
      user_name: values.name,
      user_email: values.email,
      message: values.message
		  },'wM8VYg16AfjqN3HdS')
		  .then(
			(response) => {
			  console.log('SUCCESS!', response.status, response.text);
			},
			(error) => {
			  console.log('FAILED...', error.text);
			},
		  );
	  };
  
  
  
  return (
    <div className="contact-us-page-container">
      <div className="left-side">
        <img src={email} alt="" />
      </div>
      <div className="right-side">
        <p>HAVE SOME QUESTIONE ?</p>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" placeholder="name" name="user_name" 
          value={values.name}
          onChange={(e) => setValues({...values,name: e.target.value})}
          />
          {/* <input type="text" placeholder="Last Name" /> */}
          <input type="email" placeholder="Your Email" name="user_email"
          value={values.email}
          onChange={e => setValues({...values,email: e.target.value})}
          />
          <input type="text" placeholder="Your message" name="message"
           value={values.message}
           onChange={e => setValues({...values,message: e.target.value})}
          />
          <button value={'send'}>Send Message</button>
        </form>
        <div className="social-media-accounts">
          <SiWhatsapp
            color="rgb(88, 88, 230"
            size={30}
            className="social-media-accounts-icon"
          />
          <FaFacebook
            color="rgb(88, 88, 230"
            size={30}
            className="social-media-accounts-icon"
          />
          <FaInstagram
            color="rgb(88, 88, 230"
            size={30}
            className="social-media-accounts-icon"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
