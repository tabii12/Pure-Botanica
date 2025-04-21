"use client";

"use client";

import React, { useState } from 'react';
import styles from './contact.module.css';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_trjvfth';
const TEMPLATE_ID = 'template_kzvwn07';
const PUBLIC_KEY = '5fm4LNMvD5wK_zt6a';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; 
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        alert('Cảm ơn bạn đã liên hệ với Pure Botanica!');
        setFormData({ name: '', phone: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau.');
      });
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.contactHeader}>
        <h1>THÔNG TIN LIÊN HỆ</h1>
        <p>Liên hệ ngay để được tư vấn bí quyết làm đẹp hoàn hảo với sản phẩm của chúng tôi!</p>
      </div>

      <div className={styles.contactContent}>
        <div className={styles.contactInfo}>
        <div className={styles.logoContainer}>
  <div className={styles.logo}>
    <img src="/images/logo_web.png" alt="Pure Botanica Logo" />
    <div className={styles.slogan}>
      <p>"Nurtured by Nature</p>
      <p>Perfected for You"</p>
    </div>
  </div>

  <div className={styles.infoDetails}>
  <div className={styles.infoItem}>
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>Trụ sở chính:</strong> Tòa nhà QTSC9 (tòa T), đường Tô Ký, phường Tân Chánh Hiệp, Quận 12, TP Hồ Chí Minh
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <i className="fas fa-phone"></i>
              <div>
                <strong>Số điện thoại:</strong> 097 806 1649
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <i className="fas fa-envelope"></i>
              <div>
                <strong>Email:</strong> purebotanica@gmail.com
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <i className="fas fa-clock"></i>
              <div>
                <strong>Khung giờ làm việc:</strong> 8h-18h thứ 2 - thứ 7
              </div>
            </div>
  </div>
</div>


          <div className={styles.mapContainer}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4472468502183!2d106.62525307589173!3d10.853826857697598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529f8997a2f31%3A0xe30e97e8f50eb8c5!2zRlBUIFBvbHl0ZWNobmljIC0gVG_DoG4gUXXhuq1uIDExLCBUUC5IQ00!5e0!3m2!1svi!2s!4v1713703520970!5m2!1svi!2s"
    width="100%"
    height="300"
    style={{ border: 0 }}
    allowFullScreen
    loading="eager"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

        </div>

        <div className={styles.contactForm}>
          <div className={styles.formHeader}>
            <h2>Bạn cần hỗ trợ?</h2>
            <p>Hãy gửi mail cho chúng tôi.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <input 
                type="text" 
                name="name" 
                placeholder="Họ và tên" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
              
              <input 
                type="tel" 
                name="phone" 
                placeholder="Số điện thoại" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            
            <textarea 
              name="message" 
              placeholder="Mô tả vấn đề" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            ></textarea>
            
            <button type="submit" className={styles.submitBtn}>Gửi cho Pure Botanica</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;