exports.rankResumes = (jdText, resumes) => {
    const jdWords = jdText.toLowerCase().split(/\W+/);
    const jdFreq = {};
  
    for (let word of jdWords) {
      if (word) jdFreq[word] = (jdFreq[word] || 0) + 1;
    }
  
    const scored = resumes.map(({ name, content }) => {
      const resumeWords = content.toLowerCase().split(/\W+/);
      let score = 0;
      for (let word of resumeWords) {
        if (jdFreq[word]) score += jdFreq[word];
      }
      return { name, score };
    });
  
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 5); // return top 5 matches
  };
  