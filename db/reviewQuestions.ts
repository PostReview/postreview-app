export const reviewQuestions = [
  {
    questionId: 1,
    questionCategory: "Title",
    questionText:
      "How informative and appropriate is the title? The title should match the content of the paper and should not be misleading.",
    minLabel: "Has nothing to do with the actual content of the paper",
    maxLabel: "Concise, elegant, matches the content perfectly",
  },
  {
    questionId: 2,
    questionCategory: "Abstract",
    questionText:
      "How well are the key findings summarized in a narrative form in the abstract? How well does the abstract reflect the actual content of the paper? Is it accurate and concise or confusing and misleading?",
    minLabel: "Confusing and misleading",
    maxLabel: "Accurate and concise",
  },
  {
    questionId: 3,
    questionCategory: "Introduction",
    questionText:
      "How thoroughly are the relevant contemporary studies summarized? Is their relevance explained? Do the described studies intuitively lead to the research question or is it a stretch? Did the authors adequately set the stage for their study?",
    minLabel: "No theoretical background provided whatsoever",
    maxLabel: "Provided summary is complete and intuitively leads to the current study",
  },
  {
    questionId: 4,
    questionCategory: "Introduction",
    questionText:
      "Is the focal research question clearly laid out in the introduction? Are the hypotheses explicitly stated?",
    minLabel: "No research question or hypotheses mentioned",
    maxLabel: "The research question and hypotheses are clearly stated",
  },
  {
    questionId: 5,
    questionCategory: "Method",
    questionText:
      "How well are the sampling specifications stated? Did the author report the initial sample size, exclusions, basic demographic details, when and how participants were recruited?",
    minLabel: "No details about sampling",
    maxLabel:
      "Sample size, demographics, sampling procedure, and exclusion criteria are described in detail",
  },
  {
    questionId: 6,
    questionCategory: "Method",
    questionText:
      "How explicitly is the design stated? Are the resulting conditions listed and described? Have all the relevant confounds been taken into account? Do the authors specify the design explicitly, with detailed descriptions of experimental conditions?",
    minLabel: "Unclear study design",
    maxLabel: "Design and conditions are described sufficiently and in detail",
  },
  {
    questionId: 7,
    questionCategory: "Method",
    questionText:
      "How thoroughly is the procedure described? Is the reader guided through the timeline of what activities participants engaged in (and in what order)? Are the properties of the stimuli materials (and used devices if relevant) stated? Would one be able to perfectly reproduce the study using this information?",
    minLabel: "Unclear procedure description",
    maxLabel: "Extremely detailed and thorough description of the procedure in its entirety",
  },
  {
    questionId: 8,
    questionCategory: "Results",
    questionText:
      "How well is the analytic strategy described? Do the authors state what analyses were performed to test the hypotheses? Does their analytic strategy seem appropriate to the design? Were the data preprocessed in any way (averaging, outlier exclusion, etc.)? If so - was it explicitly stated and justified?",
    minLabel: "No commentary on the conducted analyses, no rationale, no preprocessing details",
    maxLabel: "The conducted analyses, rationale, and preprocessing details are all clearly stated",
  },
  {
    questionId: 9,
    questionCategory: "Results",
    questionText:
      "How well are the results of the statistical analyses described? Were all the relevant statistical analyses test results reported for each corresponding primary outcome? Was the effect size estimate reported alongside the significance test results?",
    minLabel: "No analyses results reported",
    maxLabel: "Analyses results reported in great detail",
  },
  {
    questionId: 10,
    questionCategory: "Discussion",
    questionText:
      "How well do the authors articulate whether the data supported the hypotheses or not? Is there a statement of support or nonsupport for all hypotheses?",
    minLabel: "No statements addressing whether the hypotheses were supported or not by the data",
    maxLabel: "Explicit statements for all hypotheses whether they are supported or not",
  },
  {
    questionId: 11,
    questionCategory: "Discussion",
    questionText:
      "Do the authors make connections with the existing literature accurately? Do the authors discuss the similarities and differences between the reported results and other work in the field?",
    minLabel: "No references to other studies",
    maxLabel: "Thoughtful and insightful discussion encompassing major contemporary findings",
  },
  {
    questionId: 12,
    questionCategory: "Discussion",
    questionText:
      "Do the authors take the limitations seriously? Do they account for them when making conclusions? What would they do differently in the ideal circumstances if they had a chance?",
    minLabel: "Limitations are not discussed",
    maxLabel:
      "Limitations of the study are openly revealed and potential improvements for follow-up research are discussed",
  },

  {
    questionId: 13,
    questionCategory: "Discussion",
    questionText:
      "Are the implications discussed in the reasonable context? Are they plausible? Do the authors discuss the implications of the results for future research, programs, or policies?",
    minLabel: "Implications not mentioned",
    maxLabel:
      "Implications are carefully and thoughtfully discussed. Conclusions are not too far-fetched",
  },
]
