const path = require('path');

const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

const emailTemplatedCompiled = pug.compileFile(
  path.join(__dirname, '../pugtemp/email/index.pug')
);

const orderEmailTemplateCompiled = pug.compileFile(
  path.join(__dirname, '../pugtemp/email/order.pug')
);

module.exports = class Email {
  constructor({ email, name }, baseUrl) {
    this.to = email;
    this.firstName = (name || 'user').split(' ')[0];
    this.from = `${process.env.EMAIL_BY} <${process.env.EMAIL_FROM}>`;
    this.baseUrl = baseUrl;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(html, subject, attachments) {
    // 1) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html, {
        baseElement: '*',
        tags: { img: { format: 'skip' } },
      }),
    };

    if (attachments) {
      mailOptions.attachments = attachments;
    }

    // 2) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const subject = 'Welcome to Benfr Family';

    const html = emailTemplatedCompiled({
      subject,
      baseUrl: this.baseUrl,
      preheader: 'Greeting from Benfr for joining our family!',
      heading: 'Welcome to Benfr Family!',
      text: `Hello ${this.firstName},<br>I ceo of Benfr, give you a warm welcome to the Benfr Family. Now you can, explore the Benfr Family. Explore the whole new world. Just click the button below to get started.`,
      link: {
        href: this.baseUrl,
        text: 'Explore now',
      },
    });

    await this.send(html, subject);
  }

  async sendPasswordResetToken({ relativeUrl, time }) {
    const subject = `Forgot your password (Link valid for ${time})`;

    const html = emailTemplatedCompiled({
      subject,
      baseUrl: this.baseUrl,
      preheader: 'To reset your password click on the link',
      heading: `Forgot your password (Link valid for ${time})`,
      text: `Hello ${this.firstName},<br>We got to know you forgot your password. Don't worry just click the button below to reset your password.<br>If you haven't made this request, you are safe, kindly ignore this email. Please don't share the link with anyone if the person claims to be Benfr Employee.`,
      link: {
        href: `${this.baseUrl}${relativeUrl}`,
        text: 'Reset Password',
      },
    });

    await this.send(html, subject);
  }

  async sendPasswordResetConfirmation() {
    const subject = `Password reset sucessfully`;

    const html = emailTemplatedCompiled({
      subject,
      baseUrl: this.baseUrl,
      preheader:
        'This is to inform your password has been sucessfully reseted.',
      heading: 'Password reset sucessfully',
      text: `Hello ${this.firstName},<br>This is to inform your password on Benfr has been reseted sucessfully.<br>Please don't share your login details with anyone even if the person claims to be a Benfr employee.<br>Happy Shopping :)`,
    });

    await this.send(html, subject);
  }

  async sendPasswordUpdateConfirmation({ date }) {
    const subject = `Password update sucessfully`;

    const html = emailTemplatedCompiled({
      subject,
      baseUrl: this.baseUrl,
      preheader:
        'This is to inform your password has been sucessfully updated.',
      heading: 'Password updated sucessfully',
      text: `Hello ${this.firstName},<br>This is to inform your password on Benfr has been updated sucessfully at ${date}.<br>Please don't share your login details with anyone even if the person claims to be a Benfr employee.<br>Happy Shopping :)`,
    });

    await this.send(html, subject);
  }

  // ==============================================
  //                    Order
  // ==============================================

  async sendOrderBookedAlert({ order }) {
    const subject = 'Order Sucessfully placed';

    const html = orderEmailTemplateCompiled({
      subject,
      baseUrl: this.baseUrl,
      preheader: 'Thank you for the order on Benfr',
      heading: 'Thank you for your order!',
      text: `Hello ${this.firstName},<br>Your order has been sucessfully placed on the Benfr. Please find your order summary.`,
      order,
    });

    await this.send(html, subject);
  }
};
