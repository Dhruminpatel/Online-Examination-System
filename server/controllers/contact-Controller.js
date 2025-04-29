const Contact = require('../models/contact-models');

const contactForm = async (req, res) => {
  console.log('This is a contactus form');
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ messsage: 'message send successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'error sending message' });
  }
};

// const contactForm = () => {
//   console.log('this is a contact-controller');
// };
module.exports = contactForm;
