import Idea from "../models/Idea.js";

// @desc   Create a new idea (protected)
export const createIdea = async (req, res) => {
  try {
    const { title, problemStatement, description, domain, technologies, expectedImpact, status } = req.body;

    if (!title?.trim() || !problemStatement?.trim() || !domain || !technologies?.trim() || !expectedImpact?.trim()) {
      return res.status(400).json({
        message: "Title, problem statement, domain, technologies and expected impact are required"
      });
    }
    if (title.trim().length < 3) {
      return res.status(400).json({ message: "Title must be at least 3 characters long" });
    }
    if (problemStatement.trim().length < 10) {
      return res.status(400).json({ message: "Problem statement must be at least 10 characters long" });
    }

    // Duplicate idea prevention: reject the same (case-insensitive) title twice
    const existing = await Idea.findOne({ title: { $regex: `^${title.trim()}$`, $options: "i" } });
    if (existing) {
      return res.status(400).json({ message: "An idea with this title already exists" });
    }

    const idea = await Idea.create({
      title: title.trim(),
      problemStatement: problemStatement.trim(),
      description: (description || "").trim(),
      domain,
      technologies: technologies.trim(),
      expectedImpact: expectedImpact.trim(),
      status: status || "Submitted",
      submittedBy: req.user.name,
      user: req.user._id
    });

    res.status(201).json(idea);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc   Get all ideas (public) with optional search / filter / sort / voting / pagination
export const getIdeas = async (req, res) => {
  try {
    const { search, domain, status, sort, page, limit } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { problemStatement: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { technologies: { $regex: search, $options: "i" } },
        { domain: { $regex: search, $options: "i" } }
      ];
    }
    if (domain) filter.domain = domain;
    if (status) filter.status = status;

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      votes: { voteCount: -1 },
      title: { title: 1 }
    };
    const sortOption = sortMap[sort] || sortMap.newest;

    // Backend pagination: return a paginated object only when page/limit are supplied
    if (page || limit) {
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(Math.max(parseInt(limit, 10) || 6, 1), 50);
      const total = await Idea.countDocuments(filter);
      const data = await Idea.find(filter)
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);
      return res.json({
        data,
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      });
    }

    // No pagination requested: return the full list (keeps the client feed working)
    const ideas = await Idea.find(filter).sort(sortOption);
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc   Get a single idea by id
export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json(idea);
  } catch (error) {
    res.status(404).json({ message: "Idea not found" });
  }
};

// @desc   Update an idea (protected, owner only)
export const updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own ideas" });
    }

    const { title, problemStatement, description, domain, technologies, expectedImpact } = req.body;
    if (title) idea.title = title;
    if (problemStatement) idea.problemStatement = problemStatement;
    if (description !== undefined) idea.description = description;
    if (domain) idea.domain = domain;
    if (technologies) idea.technologies = technologies;
    if (expectedImpact) idea.expectedImpact = expectedImpact;

    const updated = await idea.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc   Vote for an idea (protected, prevents duplicate voting)
export const voteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    const alreadyVoted = idea.votes.some((v) => v.toString() === req.user._id.toString());
    if (alreadyVoted) {
      return res.status(400).json({ message: "You have already voted for this idea" });
    }

    idea.votes.push(req.user._id);
    idea.voteCount = idea.votes.length;
    await idea.save();
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc   Delete an idea (protected, owner only)
export const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own ideas" });
    }

    await idea.deleteOne();
    res.json({ message: "Idea deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// @desc   Dashboard statistics (total ideas, total votes, top vote count, counts by status)
export const getStats = async (req, res) => {
  try {
    const total = await Idea.countDocuments();
    const all = await Idea.find({}, "status voteCount");
    const totalVotes = all.reduce((s, i) => s + (i.voteCount || 0), 0);
    const topVoteCount = all.reduce((m, i) => Math.max(m, i.voteCount || 0), 0);

    const byStatus = await Idea.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);

    res.json({
      total,
      totalVotes,
      topVoteCount,
      byStatus: byStatus.map((s) => ({ status: s._id, count: s.count }))
    });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};