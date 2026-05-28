const aiSuggestion = async (req, res) => {
  try {
    const { text } = req.body;

    let suggestion = "Stay productive";
    let quote = "Small progress is still progress";

    if (text.toLowerCase().includes("study")) {
      suggestion = "Study for 2 hours with 10 minute breaks";
      quote = "Success comes from consistency";
    }

    else if (text.toLowerCase().includes("gym")) {
      suggestion = "Complete 45 minutes workout and drink water";
      quote = "Discipline creates strength";
    }

    else if (text.toLowerCase().includes("project")) {
      suggestion = "Break project into smaller milestones";
      quote = "Big projects are completed step by step";
    }

    else if (text.toLowerCase().includes("meeting")) {
      suggestion = "Prepare notes before meeting";
      quote = "Preparation improves confidence";
    }

    res.status(200).json({
      input: text,
      suggestion,
      quote,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  aiSuggestion,
};