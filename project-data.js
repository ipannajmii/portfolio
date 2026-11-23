/* YOUR CONTENT DESK
 * Add real photos to the matching array below; keep paths relative to index.html.
 * Example: { src: 'assets/photos/regission/me-presenting.jpg',
 *            alt: 'Irfan presenting REGISSION at C2PI', caption: 'C2PI exhibition, 2026' }
 * Photos appear before the clearly labelled concept illustrations.
 * Everything is local and buildless, so this works on GitHub Pages.
 */
window.PortfolioData = {
  photos: {
    regission: [],
    forensics: [],
    mediapipe: [],
    blindstick: [],
    about: []
  },
  projects: {
    regission: {
      title: 'REGISSION',
      eyebrow: 'FINAL YEAR PROJECT · BEST PROJECT AWARD, C2PI 2026',
      subtitle: 'The board meets the browser.',
      summary: 'A full-stack AI and IoT chess system that connects a physical chessboard to a web platform through camera-based move detection.',
      tags: ['Next.js', 'Laravel', 'MySQL', 'Python', 'Raspberry Pi 5', 'YOLOv8', 'OpenCV'],
      sections: [
        { heading: 'The idea', text: 'Bring a physical chess game into a digital environment without asking the players to enter every move manually.' },
        { heading: 'What I built', bullets: [
          'A full-stack platform with authentication, game management and a connected web interface.',
          'A Laravel REST API, a MySQL database and live data synchronisation between the interface, API and device.',
          'Camera-based board and piece detection using Raspberry Pi 5, YOLOv8 and OpenCV.',
          'Stockfish analysis, with testing across APIs, databases, networking and system behaviour.'
        ] },
        { heading: 'What it taught me', text: 'A connected system is only as strong as its hand-offs. The project brought together computer vision, device integration, backend data and a usable web interface.' },
        { heading: 'A milestone', text: 'Received the Best Project Award at the UiTM C2PI Final Year Project Exhibition, 2026.' }
      ],
      links: [{ label: 'View repository', href: 'https://github.com/ipannajmii/REGISSION' }],
      gallery: [
        { src: 'assets/art/regission.svg', alt: 'Concept illustration of a connected chessboard, camera and browser', caption: 'The connected chessboard · concept illustration' },
        { src: 'assets/art/regission-flow.svg', alt: 'A simplified system flow from board detection through the API to the web platform', caption: 'How the parts connect · system illustration' }
        { src: 'assets/art/c2pi best project.jpg', alt: 'C2PI Final Year Project Exhibition, 2026 - Best Project Award', caption: 'My hardworks really paid off!' }
        { src: 'assets/art/fyp project.jpg', alt: 'REGISSION project demonstration', caption: 'Demonstrating my REGISSION project to my supervisor' }
        { src: 'assets/art/machine learning.jpg', alt: 'YOLOV8 model training', caption: 'Chess pieces and board recognition' }
        { src: 'assets/art/layout.jpeg', alt: 'Layout for the final product', caption: 'Working user interface that connects the whole system' }
      ]
    },
    forensics: {
      title: 'Finding the signal.',
      eyebrow: 'ACADEMIC PROJECT · PYTHON & DIGITAL FORENSICS',
      subtitle: 'Advanced Python-Based Digital Forensic Log Analysis Tool',
      summary: 'A Python application that makes log data easier to review, filter and organise for digital forensic investigation.',
      tags: ['Python', 'Log parsing', 'Event timelines', 'Automation', 'Reporting'],
      sections: [
        { heading: 'The idea', text: 'Logs can contain useful evidence, but the important events are often buried in a lot of noise. This project focused on making those events easier to examine.' },
        { heading: 'What I built', bullets: ['Automated log parsing, filtering and structured data processing.', 'Event timeline analysis and suspicious-activity identification.', 'Report generation to support evidence review and investigation workflows.', 'Output testing, debugging and technical documentation.'] },
        { heading: 'What it taught me', text: 'Useful automation needs readable output. Parsing, filtering and reporting have to work together so an investigator can follow an event in context.' }
      ],
      links: [],
      gallery: [
        { src: 'assets/art/forensics.svg', alt: 'Illustrative example of event filtering and a log timeline', caption: 'From log entries to a timeline · illustrative example, not application output' },
        { src: 'assets/art/forensics-flow.svg', alt: 'A conceptual workflow of log input, Python processing and an investigation report', caption: 'The investigation workflow · concept illustration' }
      ]
    },
    mediapipe: {
      title: 'A different way of seeing.',
      eyebrow: 'STUDY PROJECT · REAL-TIME COMPUTER VISION',
      subtitle: 'MediaPipe: Face & Hand Tracking using Python',
      summary: 'A webcam-based exploration of real-time face detection and hand landmark tracking with MediaPipe and OpenCV.',
      tags: ['Python', 'MediaPipe', 'OpenCV', 'Webcam input', '21 hand landmarks'],
      sections: [
        { heading: 'The idea', text: 'Explore how an ordinary webcam feed can become a stream of useful visual information, from detecting a face to following the landmarks of a hand.' },
        { heading: 'What I explored', bullets: ['Capturing video frames with OpenCV and converting BGR images to RGB before processing.', 'Detecting faces with the MediaPipe face detection solution and drawing detections on the image.', 'Tracking 21 landmarks per detected hand and drawing the connections in real time.', 'Displaying the processed feed and releasing the camera cleanly when the program exits.'] },
        { heading: 'What it taught me', text: 'Real-time vision is a pipeline: capture, prepare, process, draw and display. Seeing each stage makes the behaviour easier to understand and debug.' }
      ],
      links: [{ label: 'Watch the walkthrough', href: 'https://youtu.be/P5r4eA8Gp_0' }],
      gallery: [
        { src: 'assets/art/mediapipe.svg', alt: 'Concept illustration of 21 connected landmarks on a hand', caption: 'Hand landmark connections · concept illustration' },
        { src: 'assets/art/mediapipe-flow.svg', alt: 'A simplified camera, processing and landmark overlay workflow', caption: 'From webcam to visual landmarks · pipeline illustration' }
      ]
    },
    blindstick: {
      title: 'A helping hand.',
      eyebrow: 'ACADEMIC PROJECT · IoT & ASSISTIVE TECHNOLOGY',
      subtitle: 'Smart IoT Blind Stick',
      summary: 'An academic smart-stick concept using sensors and microcontroller integration to detect nearby obstacles and provide real-time user alerts.',
      tags: ['IoT', 'Sensors', 'Microcontroller', 'Obstacle detection', 'User alerts'],
      sections: [
        { heading: 'The idea', text: 'Explore how connected sensing can support a visually impaired person’s awareness of nearby obstacles.' },
        { heading: 'What I worked on', bullets: ['A smart blind stick concept using IoT technology for obstacle detection.', 'Sensor and microcontroller integration concepts for real-time alerts.', 'IoT data monitoring concepts to support the assistive technology workflow.', 'Project documentation, system explanations and testing results for academic assessment.'] },
        { heading: 'What it taught me', text: 'A useful device begins with the person using it. Detection and feedback need to support a clear purpose, especially in an assistive technology concept.' }
      ],
      links: [],
      gallery: [
        { src: 'assets/art/blindstick.svg', alt: 'Concept illustration of an obstacle-sensing walking stick', caption: 'Obstacle awareness · concept illustration' },
        { src: 'assets/art/blindstick-flow.svg', alt: 'A conceptual flow from obstacle sensing through a microcontroller to a user alert', caption: 'Sense, process and alert · concept illustration' }
      ]
    }
  }
};
