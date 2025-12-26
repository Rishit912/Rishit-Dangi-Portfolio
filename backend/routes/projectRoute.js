// import { bucket } from "../config/firebase.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

const express = require("express");
const multer = require("multer");
const Project = require('../modles/project');
// NEW: Import both functions from the updated authentication.js
const { verifyToken, verifyAdmin } = require("../middleWare/authentication"); 
const mongoose = require('mongoose');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// middleware to check DB connection
const checkDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Service unavailable: database not connected' });
  }
  next();
};

// Add Project - PUBLIC (No authentication required)
router.post("/add", checkDb, async (req, res) => {
    const { title, description, techStack, imageUrls, github, liveDemo, category } = req.body;

    try {
        console.log('Creating new project:', { title, category, techStack });
        
        const newProject = new Project({
          title,
          description,
          techStack,
          imageUrls,
          github,
          liveDemo,
          category
        });

        const project = await newProject.save();
        console.log('Project created successfully:', project._id);
        
        // Return just the project to match GET response format
        res.json(project);
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(400).json({ message: err.message || 'Failed to create project' });
    }
});

// Fetch all - REMAINS PUBLIC (No middleware)
router.get("/", async (req, res) => {
    try {
    console.log('Fetching all projects...');
    if (mongoose.connection.readyState !== 1) {
      console.warn('DB not connected — returning empty list');
      return res.status(503).json({ message: 'Service unavailable: database not connected' });
    }

  // Return projects ordered by explicit order if present, then createdAt
  const projects = await Project.find().sort({ order: 1, createdAt: 1 });
    console.log(`Found ${projects.length} projects`);
    res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
});

// Edit project - PUBLIC (No authentication required)
router.put("/:id", checkDb, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete project - PUBLIC (No authentication required)
router.delete("/:id", checkDb, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reorder projects - PUBLIC (No authentication required)
router.patch('/reorder', checkDb, async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) return res.status(400).json({ message: 'orderedIds must be an array' });

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index + 1 } }
      }
    }));

    if (bulkOps.length > 0) await Project.bulkWrite(bulkOps);

    const projects = await Project.find().sort({ order: 1, createdAt: 1 });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;