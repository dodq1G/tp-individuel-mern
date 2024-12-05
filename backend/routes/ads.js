const express = require('express');
const jwt = require('jsonwebtoken');
const Ad = require('../models/Ad');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const ad = new Ad({ title, description, price, category, author: req.userId });
    await ad.save();
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ad' });
  }
});

router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find().populate('author', 'username');
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ads' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('author', 'username');
    if (!ad) return res.status(404).json({ error: 'Ad not found' });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ad details' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description, price: req.body.price, category: req.body.category },
      { new: true }
    );
    res.json(updatedAd);
  } catch (error) {
    res.status(500).json({ error: 'Error updating ad' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json({ message: 'Ad deleted successfully', ad });
  } catch (error) {
    console.error('Error deleting ad:', error);
    res.status(500).json({ error: 'Error deleting ad' });
  }
});

module.exports = router;
