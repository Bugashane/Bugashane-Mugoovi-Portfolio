const projects = [
  {
    title: "Sweet Slumber",
    slug: "sweet-slumber",
    kind: "project",
    status: "current",
    productionStatus: "In Post-Production",
    format: "Live Action + Animation",
    year: "2025-2026",
    role: "Writer / Director / Producer",
    roleTag: "Director · Writer",
    carouselOrder: 0,
    imageSummary: "a live-action and animation short about grief and acceptance",
    emphasisTerms: ["Wrote and revised", "storyboards", "casting", "locations", "equipment", "schedules", "directed actors"],
    showcaseGroup: "Directing",
    tempPoster: true,
    poster: "assets/posters/sweet-slumber.jpg",
    video: "",
    logline:
      "An original short about grief, acceptance, and a younger brother trying to process another loss before healing from the first.",
    details:
      "Wrote and revised the script, built mood boards and storyboards, led casting, secured locations, planned equipment, coordinated student crew schedules, and directed actors. I now work closely with my editor to guide the post-production process, including color, VFX, and a 3D animation sequence I am building myself."
  },
  {
    title: "The Last Round",
    slug: "the-last-round",
    kind: "project",
    status: "upcoming",
    productionStatus: "In Progress",
    format: "Live Action",
    year: "2026",
    role: "Writer / Director",
    roleTag: "Writer · Director",
    carouselOrder: 1,
    imageSummary: "an upcoming live-action thriller about survival, guilt, and morality",
    emphasisTerms: ["writing", "directing"],
    showcaseGroup: "Upcoming Releases",
    poster: "",
    video: "assets/videos/the-last-round-rough-cut.mp4",
    videoNote: "This is a rough-cut teaser from the opening, assembled to preview the film's progress. It is not the final cut.",
    logline:
      "In the final round of a deadly game, the remaining players are forced to defend the choices that kept them alive. As the room turns into a debate about survival, guilt, and morality, the rules reveal how little room is left for anyone to leave unchanged.",
    details:
      "An upcoming live-action short I am writing and directing. This rough-cut sneak peek of the opening was assembled to show the project’s current progress to students; it is not the final cut.",
    documents: [
      {
        href: "assets/docs/the-last-round/the-last-round-script.pdf",
        label: "Read the Script (PDF)"
      },
      {
        href: "assets/docs/the-last-round/the-last-round-shotlist.xlsx",
        label: "View the Shot List (XLSX)"
      }
    ]
  },
  {
    title: "Wartime",
    slug: "wartime",
    kind: "project",
    status: "past",
    productionStatus: "Completed",
    format: "3D Animation + Live Action",
    year: "2024",
    role: "Co-Director / Producer",
    roleTag: "Co-Director · Producer",
    carouselOrder: 9,
    imageSummary: "a hybrid 3D animation and live-action narrative made by a student team",
    emphasisTerms: ["Co-directed", "producer responsibilities", "task-management system", "filming logistics", "equipment needs"],
    showcaseGroup: "Directing",
    poster: "assets/posters/wartime.jpg",
    video: "assets/videos/wartime.mp4",
    logline:
      "A class-wide 3D narrative short produced across animation, rigging, live-action/broadcast, and storyboarding teams.",
    details:
      "Co-directed the story and stepped into producer responsibilities for a 30+ student production. Built the team's task-management system with Google Forms, Google Tasks, and a master tracker, redirected team members across departments, secured filming logistics, tracked equipment needs, and helped the team finish ahead of the internal deadline."
  },
  {
    title: "Juxtaposed",
    slug: "juxtaposed",
    kind: "project",
    status: "past",
    productionStatus: "Completed",
    format: "Live Action",
    year: "2025",
    role: "Production Sound Mixer",
    roleTag: "Production Sound",
    carouselOrder: 7,
    imageSummary: "an experimental live-action short supported by on-set production sound",
    emphasisTerms: ["production sound", "sound mixing"],
    showcaseGroup: "Sound",
    poster: "assets/posters/juxtaposed.png",
    video: "assets/videos/juxtaposed.mp4",
    logline:
      "An experimental live-action short supported by on-set production sound.",
    details:
      "Handled on-set production sound and sound mixing for the film."
  },
  {
    title: "Funeral For Bro",
    slug: "funeral-for-bro",
    kind: "project",
    status: "past",
    productionStatus: "Completed",
    format: "Live Action",
    year: "2025-2026",
    role: "Sound Recordist / Boom Op / Dialogue Editor",
    roleTag: "Production Sound",
    carouselOrder: 2,
    imageSummary: "a senior capstone narrative short centered on clear dialogue and organized production audio",
    emphasisTerms: ["boom", "dialogue", "structured stems", "ADR recording"],
    showcaseGroup: "Sound",
    poster: "assets/posters/funeral-for-bro.png",
    video: "assets/videos/funeral-for-bro.mp4",
    logline:
      "A senior capstone short where location prep, dialogue clarity, and organized production audio were central to the workflow.",
    details:
      "Pre-visited locations, planned boom and windscreen needs, checked wide-shot limitations, captured dialogue and extra ambient/foley-adjacent sound, organized structured stems, assisted with ADR recording, and supported dialogue sync and narrative continuity in post."
  },
  {
    title: "Punk House",
    slug: "punk-house",
    kind: "project",
    status: "past",
    productionStatus: "Completed",
    format: "Live Action",
    year: "2025-2026",
    role: "Sound Recordist / Sound Designer",
    roleTag: "Production Sound",
    carouselOrder: 3,
    imageSummary: "a senior capstone short featuring a basement band performance",
    emphasisTerms: ["Recorded dialogue", "environmental sound", "two-take", "Foley", "SFX"],
    showcaseGroup: "Sound",
    poster: "assets/posters/punk-house.jpg",
    video: "https://www.youtube.com/embed/WOkyFRa-SfM?si=E0MO0je_1-SIQ8zn",
    videoUrl: "https://www.youtube.com/watch?v=WOkyFRa-SfM",
    videoType: "youtube",
    logline:
      "A senior capstone short with a basement band scene that required a practical two-take sound strategy.",
    details:
      "Recorded dialogue and environmental sound, then solved the basement performance challenge by capturing one take for the instruments and another quieter take for crowd reaction so post-production could blend both layers. Also captured detail sounds, Foley, ambience, and SFX to support tone and pacing."
  },
  {
    title: "The Call / Finding Your Dog",
    slug: "finding-your-dog",
    kind: "project",
    status: "past",
    productionStatus: "In Post-Production",
    format: "Live Action",
    year: "2025-2026",
    role: "Script Supervisor / DIT / Production Assistant",
    roleTag: "Editing Assistant · Script Supervisor · DIT",
    carouselOrder: 4,
    imageSummary: "a large live-action narrative production with fast script changes and media management",
    emphasisTerms: ["Script Supervisor", "script changes", "DIT", "media management"],
    showcaseGroup: "Script Supervision",
    poster: "assets/posters/finding-your-dog.png",
    video: "",
    logline:
      "A larger narrative production where script changes and digital media management had to stay organized under fast set conditions.",
    details:
      "As Script Supervisor, I oversaw changes to the script and noted them down while helping wherever needed on set. I transferred and backed up footage as DIT, designed a clear scene-and-take folder structure with script notes, and maintained NDA-sensitive production materials."
  },
  {
    title: "Developing World",
    slug: "developing-world",
    kind: "project",
    status: "past",
    productionStatus: "Entering Post",
    format: "Live Action",
    year: "2026",
    role: "Lighting Operator / DIT / Continuity / Sound",
    roleTag: "Lighting · DIT · Continuity · Sound",
    carouselOrder: 5,
    imageSummary: "a live-action short using lighting and sound to create mood in tight spaces",
    emphasisTerms: ["lighting", "sound", "boom operation"],
    showcaseGroup: "On-Set Support",
    tempPoster: true,
    poster: "assets/posters/developing-world.jpg",
    video: "",
    logline:
      "A short production that required lighting and sound choices to support mood in tight, moving-camera setups.",
    details:
      "Reviewed the script for lighting and audio needs, set up lighting to support limited existing room light, collaborated with the director and cinematographer on mood and exposure, and balanced light placement with boom operation during a small-room moving-camera scene."
  },
  {
    title: "Trail's End",
    slug: "trails-end",
    kind: "project",
    status: "past",
    productionStatus: "Post Pending",
    format: "Live Action",
    year: "2026",
    role: "Sound Recordist",
    roleTag: "Production Sound",
    carouselOrder: 6,
    imageSummary: "an outdoor narrative short shaped by wind, wardrobe movement, and night ambience",
    emphasisTerms: ["sound", "dialogue", "mic placement", "ambient"],
    showcaseGroup: "Sound",
    tempPoster: true,
    poster: "assets/posters/trails-end.jpg",
    video: "",
    logline:
      "An outdoor narrative short where wind, wardrobe movement, and night ambience shaped the production sound strategy.",
    details:
      "Tracked wind forecasts, planned around outdoor dialogue risks, studied the script for sound-critical moments, managed mic placement against wardrobe movement, and captured dialogue plus ambient/night-exterior sound. Public footage should wait until the music-rights issue is resolved."
  },
  {
    title: "Live Event Recording",
    slug: "live-event-recording",
    kind: "project",
    status: "past",
    productionStatus: "Completed",
    format: "Live Event",
    year: "2025",
    role: "Camera Operator",
    roleTag: "Camera Operation",
    carouselOrder: 8,
    imageSummary: "live theatre and dance recordings for Purdue productions",
    emphasisTerms: ["Operated Sony mirrorless cameras", "framing", "camera-angle decisions", "exposure", "white balance"],
    showcaseGroup: "Camera",
    tempPoster: true,
    poster: "",
    video: "",
    logline:
      "Live theatre and dance recording for Purdue productions including The Snow and PCDC Winter Works.",
    details:
      "Operated Sony mirrorless cameras during live performances, made real-time framing and camera-angle decisions, managed exposure and white balance, and captured production-ready footage in environments with no option for reshoots."
  }
];
