import Interaction from '../models/Interaction.js';

export const addInteraction = async (req, res) => {
  const { customerId, note } = req.body;

  try {
    const interaction = await Interaction.create({ customer: customerId, note });
    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInteractions = async (req, res) => {
  const { customerId } = req.params;

  try {
    const interactions = await Interaction.find({ customer: customerId });
    res.json(interactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
