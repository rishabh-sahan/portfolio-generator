import express from 'express';
import Portfolio from '../models/Portfolio.js';

const router = express.Router();

// Get portfolio by user ID
router.get('/:userId', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });
    
    if (!portfolio) {
      // Return default empty portfolio structure if not found
      return res.json({
        personalInfo: {
          fullName: '',
          title: '',
          email: '',
          summary: '',
          socials: {}
        },
        education: [],
        experience: [],
        projects: [],
        skills: [],
        theme: 'modern'
      });
    }
    
    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update portfolio
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolioData = req.body;

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { 
        userId,
        ...portfolioData,
        updatedAt: new Date()
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true
      }
    );

    res.json(portfolio);
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update specific section of portfolio
router.patch('/:userId/:section', async (req, res) => {
  try {
    const { userId, section } = req.params;
    const updateData = req.body;

    const validSections = ['personalInfo', 'education', 'experience', 'projects', 'skills', 'theme'];
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section' });
    }

    const updateObject = { [section]: updateData };
    
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { 
        $set: updateObject,
        updatedAt: new Date()
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true
      }
    );

    res.json(portfolio);
  } catch (error) {
    console.error('Error updating portfolio section:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete portfolio
router.delete('/:userId', async (req, res) => {
  try {
    await Portfolio.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
