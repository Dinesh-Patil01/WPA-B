import Customer from '../models/Customer.js';


export const getCustomers = async (req, res) => {
  const { name, email, phone, company, page = 1, limit = 10 } = req.query;

  try {
  
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (email) query.email = { $regex: email, $options: 'i' };
    if (phone) query.phone = { $regex: phone, $options: 'i' };
    if (company) query.company = { $regex: company, $options: 'i' };

   
    const skip = (page - 1) * limit;

    const customers = await Customer.find(query).skip(skip).limit(Number(limit));
    const total = await Customer.countDocuments(query);

    res.json({ customers, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createCustomer = async (req, res) => {
  const { name, email, phone, company } = req.body;

 
  const missingFields = validateRequiredFields({ name, email, phone });
  if (missingFields.length) {
    return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
  }

  
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const customer = await Customer.create({ name, email, phone, company });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
