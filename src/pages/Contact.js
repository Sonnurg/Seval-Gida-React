import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <div className="page-title">
        <div className="container">
          <h1>İletişim</h1>
          <nav>
            <ol className="breadcrumbs">
              <li><a href="/">Ana Sayfa</a></li>
              <li>İletişim</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="contact-2 section">
        <div className="container">
          <div className="row gy-4">
            
            {/* Contact Info */}
            <div className="col-lg-4">
              <div className="contact-info-box">
                <div className="icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="info-content">
                  <h4>Adres</h4>
                  <p>Istanbul, Turkey</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="contact-info-box">
                <div className="icon-box">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="info-content">
                  <h4>Telefon</h4>
                  <p>+90 (212) 609 34 34</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="contact-info-box">
                <div className="icon-box">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="info-content">
                  <h4>E-posta</h4>
                  <p>export@sevalgida.com.tr</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="contact-form-wrapper">
                <h2 className="text-center">Bize Mesaj Gönderin</h2>
                <form onSubmit={handleSubmit} className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <div className="input-with-icon">
                        <i className="bi bi-person"></i>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Adınız"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 form-group">
                      <div className="input-with-icon">
                        <i className="bi bi-envelope"></i>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="E-posta Adresiniz"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-with-icon">
                      <i className="bi bi-chat-dots"></i>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Konu"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-with-icon">
                      <i className="bi bi-card-text message-icon"></i>
                      <textarea
                        name="message"
                        rows="6"
                        className="form-control"
                        placeholder="Mesajınız"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn-submit">
                      Mesaj Gönder
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;
