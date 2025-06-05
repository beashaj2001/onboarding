// Mock data utilities for the application
// In a real application, this would be replaced with actual API calls

// Generate mock modules
export const fetchMockModules = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: '1',
      title: 'Introduction to Equipment Safety',
      description: 'Learn the fundamentals of workplace equipment safety protocols and procedures.',
      duration: '45 min',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: '3d',
      completionRate: 100,
      prerequisites: [],
      skills: ['Safety', 'Equipment Handling'],
      quiz: [
        {
          question: 'What is the first step in equipment safety?',
          options: [
            'Start the equipment immediately',
            'Check for proper PPE (Personal Protective Equipment)',
            'Call a supervisor',
            'Read the manual later'
          ],
          correctAnswer: 1
        },
        {
          question: 'When should safety equipment be inspected?',
          options: [
            'Only when it breaks',
            'Once a year',
            'Before each use',
            'When convenient'
          ],
          correctAnswer: 2
        },
        {
          question: 'What should you do if you notice equipment damage?',
          options: [
            'Try to fix it yourself',
            'Ignore it if minor',
            'Continue working carefully',
            'Report it immediately'
          ],
          correctAnswer: 3
        },
        {
          question: 'Which is NOT a proper safety practice?',
          options: [
            'Wearing safety goggles',
            'Using equipment without training',
            'Following safety protocols',
            'Regular equipment maintenance'
          ],
          correctAnswer: 1
        },
        {
          question: 'How often should emergency procedures be reviewed?',
          options: [
            'Monthly',
            'Only after accidents',
            'Never',
            'When equipment changes'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      id: '2',
      title: 'Machinery Operation Basics',
      description: 'Master the essential skills needed to operate standard machinery in a safe and efficient manner.',
      duration: '1h 15min',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: '3d',
      completionRate: 65,
      prerequisites: ['Introduction to Equipment Safety'],
      skills: ['Machinery Operation', 'Maintenance'],
      quiz: [
        {
          question: 'What is the correct sequence for starting machinery?',
          options: [
            'Power on, check settings, inspect',
            'Inspect, check settings, power on',
            'Check settings, power on, inspect',
            'Power on immediately'
          ],
          correctAnswer: 1
        },
        {
          question: 'How should you respond to unusual machinery noise?',
          options: [
            'Increase the speed',
            'Stop immediately',
            'Ignore if working fine',
            'Wait until break time'
          ],
          correctAnswer: 1
        },
        {
          question: 'What is the purpose of machinery calibration?',
          options: [
            'Increase speed',
            'Reduce maintenance',
            'Ensure accuracy and safety',
            'Save power'
          ],
          correctAnswer: 2
        },
        {
          question: 'When should machinery maintenance be performed?',
          options: [
            'Only when broken',
            'According to schedule',
            'When convenient',
            'During operation'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which safety feature should be checked first?',
          options: [
            'Emergency stop button',
            'Power indicator',
            'Speed settings',
            'Production counter'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      id: '3',
      title: 'Emergency Protocols',
      description: 'Critical emergency response procedures for workplace incidents and equipment malfunctions.',
      duration: '30 min',
      image: 'https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'video',
      completionRate: 25,
      prerequisites: ['Introduction to Equipment Safety'],
      skills: ['Emergency Response', 'First Aid']
    },
    {
      id: '4',
      title: 'Advanced Machinery Troubleshooting',
      description: 'Diagnose and resolve complex machinery issues efficiently.',
      duration: '2h',
      image: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: '3d',
      completionRate: 0,
      prerequisites: ['Machinery Operation Basics'],
      skills: ['Troubleshooting', 'Machinery Maintenance']
    },
    {
      id: '5',
      title: 'Team Coordination',
      description: 'Effective communication strategies for team-based equipment operation.',
      duration: '1h',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'text',
      completionRate: 0,
      prerequisites: [],
      skills: ['Communication', 'Team Management']
    }
  ];
};

// Fetch mock trainee progress data
export const fetchMockProgress = async (userId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real app, this would vary based on the userId
  return {
    completed: 2,
    inProgress: 2,
    notStarted: 3,
    lastActivity: new Date().toISOString(),
    score: 87
  };
};

// Fetch mock leaderboard
export const fetchMockLeaderboard = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      name: 'Emily Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      score: 98,
      rank: 1,
      progress: 95,
      completedModules: 7
    },
    {
      id: '2',
      name: 'John Trainer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      score: 87,
      rank: 2,
      progress: 80,
      completedModules: 6
    },
    {
      id: '3',
      name: 'Alex Chen',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      score: 82,
      rank: 3,
      progress: 75,
      completedModules: 5
    },
    {
      id: '4',
      name: 'Sarah Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      score: 78,
      rank: 4,
      progress: 70,
      completedModules: 5
    },
    {
      id: '5',
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/95.jpg',
      score: 72,
      rank: 5,
      progress: 65,
      completedModules: 4
    },
    {
      id: '6',
      name: 'Lisa Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
      score: 68,
      rank: 6,
      progress: 60,
      completedModules: 4
    },
    {
      id: '7',
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      score: 64,
      rank: 7,
      progress: 55,
      completedModules: 3
    },
    {
      id: '8',
      name: 'Amanda Lee',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
      score: 60,
      rank: 8,
      progress: 50,
      completedModules: 3
    }
  ];
};

// Generate mock trainee data
export const fetchMockTrainees = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: '1',
      name: 'Jane Trainee',
      email: 'trainee@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      progress: 65,
      completedModules: 2,
      totalModules: 5,
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      progress: 42,
      completedModules: 1,
      totalModules: 5,
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'Amanda Lee',
      email: 'amanda@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
      progress: 80,
      completedModules: 4,
      totalModules: 5,
      lastActive: '3 hours ago'
    },
    {
      id: '4',
      name: 'Robert Smith',
      email: 'robert@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
      progress: 10,
      completedModules: 0,
      totalModules: 5,
      lastActive: '5 days ago'
    },
    {
      id: '5',
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
      progress: 50,
      completedModules: 2,
      totalModules: 5,
      lastActive: '12 hours ago'
    }
  ];
};

export const mockModulesWithSections = [
  {
    id: "1",
    title: "Introduction to Equipment Safety",
    description: "Learn the fundamentals of workplace equipment safety protocols and procedures.",
    duration: "45 min",
    image: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "3d",
    completionRate: 100,
    prerequisites: [],
    skills: ["Safety", "Equipment Handling"],
    subModules: [
      {
        id: "1",
        title: "Introduction to Safety Equipment",
        description: "Learn about basic safety gear and their proper usage. This module covers all essential protective equipment and their applications in different workplace scenarios.",
        type: "video",
        duration: "10 min",
        status: "completed",
        progress: 100,
        difficulty: "beginner",
        estimatedTime: "10-15 min",
        thumbnail: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
        prerequisites: [],
        videoUrl: "https://example.com/videos/safety-equipment-intro.mp4",
        resources: [
          {
            title: "Safety Equipment Guide PDF",
            description: "Complete reference guide for all safety equipment",
            type: "download",
            url: "https://example.com/resources/safety-guide.pdf"
          },
          {
            title: "Equipment Checklist",
            description: "Printable checklist for equipment inspection",
            type: "download",
            url: "https://example.com/resources/equipment-checklist.pdf"
          },
          {
            title: "Safety Standards Database",
            description: "Access to industry safety standards",
            type: "link",
            url: "https://example.com/safety-standards"
          }
        ]
      },
      {
        id: "2",
        title: "Equipment Operation Demo",
        description: "Interactive 3D demonstration of equipment operation. Practice with virtual machinery to understand proper handling techniques and safety procedures.",
        type: "3d",
        duration: "15 min",
        status: "in-progress",
        progress: 60,
        difficulty: "intermediate",
        estimatedTime: "15-20 min",
        thumbnail: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
        prerequisites: ["Introduction to Safety Equipment"],
        videoUrl: "https://example.com/videos/equipment-operation.mp4",
        resources: [
          {
            title: "Operation Manual",
            description: "Detailed equipment operation instructions",
            type: "download",
            url: "https://example.com/resources/operation-manual.pdf"
          },
          {
            title: "Interactive Tutorial",
            description: "Step-by-step interactive guide",
            type: "link",
            url: "https://example.com/interactive-tutorial"
          }
        ]
      },
      {
        id: "3",
        title: "Safety Protocols",
        description: "Detailed safety protocols and procedures for emergency situations. Learn how to respond to various workplace incidents and maintain a safe environment.",
        type: "text",
        duration: "20 min",
        status: "locked",
        progress: 0,
        difficulty: "advanced",
        estimatedTime: "20-25 min",
        thumbnail: "https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg",
        prerequisites: ["Equipment Operation Demo"],
        videoUrl: "https://example.com/videos/safety-protocols.mp4",
        resources: [
          {
            title: "Emergency Response Guide",
            description: "Comprehensive emergency response procedures",
            type: "download",
            url: "https://example.com/resources/emergency-guide.pdf"
          },
          {
            title: "Safety Protocol Database",
            description: "Access to all safety protocols",
            type: "link",
            url: "https://example.com/safety-protocols"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Machinery Operation Basics",
    description: "Master the essential skills needed to operate standard machinery in a safe and efficient manner.",
    duration: "1h 15min",
    image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "3d",
    completionRate: 65,
    prerequisites: ["Introduction to Equipment Safety"],
    skills: ["Machinery Operation", "Maintenance"],
    subModules: [
      {
        id: "1",
        title: "Machinery Overview",
        description: "Overview of machinery types and their uses.",
        type: "video",
        duration: "12 min",
        status: "completed",
        progress: 80,
        difficulty: "beginner",
        estimatedTime: "10-15 min",
        thumbnail: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
        prerequisites: [],
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        resources: [
          {
            title: "Machinery Types PDF",
            description: "Reference for all machinery types",
            type: "download",
            url: "https://example.com/resources/machinery-types.pdf"
          }
        ]
      },
      {
        id: "2",
        title: "Operation Safety",
        description: "Safety procedures for operating machinery.",
        type: "video",
        duration: "18 min",
        status: "in-progress",
        progress: 50,
        difficulty: "intermediate",
        estimatedTime: "15-20 min",
        thumbnail: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
        prerequisites: ["Machinery Overview"],
        videoUrl: "https://example.com/videos/operation-safety.mp4",
        resources: [
          {
            title: "Operation Safety Checklist",
            description: "Checklist for safe operation",
            type: "download",
            url: "https://example.com/resources/operation-safety-checklist.pdf"
          }
        ]
      }
    ]
  }
];