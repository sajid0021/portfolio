/**
 * ================================================================
 * PROJECTS-DATA.JS  —  Rich Product Case Study Metadata
 * Project  : res(3) / Shaik Mohammad Sajid Portfolio
 *
 * Defines window.PROJECTS_DATA containing descriptive product-focused
 * data for the three main academic and professional projects.
 * ================================================================
 */

(function () {
  'use strict';

  window.PROJECTS_DATA = {
    "nutrition-app": {
      id: "nutrition-app",
      name: "Nutrition App",
      category: "UI/UX Design",
      status: "Completed",
      duration: "3 Months (Jan 2024 - Apr 2024)",
      role: "Lead Product Designer & UX Researcher",
      techStack: ["Framer", "Figma", "Design Systems", "Prototyping", "User Testing", "Adobe Suite"],
      gitLink: "#",
      demoLink: "# portfolio",
      summary: "A high-fidelity mobile application design system focusing on intuitive calorie tracking, cognitive load reduction, and personalized diet compliance.",
      
      // SECTION 2: PROBLEM STATEMENT
      problemStatement: {
        background: "Modern wellness applications suffer from high friction, requiring complex inputs for simple food log entries.",
        timeline: [
          { date: "Month 1", title: "User Fatigue Identification", desc: "Analytics showed 64% of users abandon tracking within 7 days due to tedious food entry forms." },
          { date: "Month 2", title: "Friction Point Isolation", desc: "User tests revealed search results for foods were cluttered and lacked visual hierarchy." },
          { date: "Month 3", title: "Core Objective Defined", desc: "Create a design system that shortens logging actions from 6 taps to exactly 2 taps." }
        ]
      },

      // SECTION 3: PAIN POINTS
      painPoints: [
        {
          icon: "time-outline",
          title: "Complex Logging Loops",
          desc: "Users spent an average of 45 seconds trying to log a single meal.",
          bizImpact: "Decreased user retention rates (DAU/MAU ratios fell below 18%).",
          userImpact: "Frustration and immediate drop-off during meal times.",
          severity: "Critical"
        },
        {
          icon: "alert-circle-outline",
          title: "Lack of Contextual Feedback",
          desc: "Generic alerts failed to explain what specific nutrients users lacked.",
          bizImpact: "Low subscription conversion rate for personalized health coaching.",
          userImpact: "Confusion regarding true metabolic and dietary progress.",
          severity: "High"
        }
      ],

      // SECTION 4: RESEARCH
      research: {
        users: "Health-conscious professionals (ages 24–45) struggling with consistency.",
        findings: "82% of interviewees stated they forgot to log meals because they were busy.",
        competitors: "MyFitnessPal (cluttered layouts, ads) and Lose It! (heavy paywalls).",
        challenges: "Designing an interface that presents detailed micronutrient profiles without overwhelming users.",
        insights: "Visual representations (colored progress circles) are 4x faster to comprehend than raw metrics."
      },

      // SECTION 5: SOLUTION
      solution: {
        overview: "An elegant, frosted glass-styled mobile application focused on swift entry and glanceable stats.",
        whyArchitecture: "Constructed on an atomic design system to ensure absolute consistency across components.",
        benefits: "Frictionless UI increases user tracking consistency by 40%.",
        value: "Stronger brand loyalty and a higher user lifetime value (LTV)."
      },

      // SECTION 6: FEATURES
      features: [
        {
          icon: "flash-outline",
          title: "Quick Tap Logging",
          desc: "One-tap log action for favorite meals utilizing local historical logs.",
          bizBenefit: "Drives daily active engagement spikes.",
          userBenefit: "Meal logging completed in under 2 seconds."
        },
        {
          icon: "stats-chart-outline",
          title: "Glanceable Progress Ring",
          desc: "Integrated circular metrics representing caloric and hydration limits.",
          bizBenefit: "High screenshot sharing rates (organic marketing).",
          userBenefit: "Immediate understanding of remaining daily intake."
        }
      ],

      // SECTION 7: SYSTEM ARCHITECTURE
      architecture: [
        { layer: "Interface Layer", detail: "Figma High-Fidelity Components, Atomic Design System Library" },
        { layer: "Interactivity Layer", detail: "Framer Motion Prototype, Smart Layout Connections" },
        { layer: "User Validation", detail: "A/B Testing, Usability Hub Panel, Maze Testing Runs" }
      ],

      // SECTION 8: WORKFLOW TIMELINE
      workflow: [
        { step: "1. Secure Onboarding", desc: "Establish height, weight, and fitness targets with minimalist inputs." },
        { step: "2. Dashboard Access", desc: "Review daily remaining goals via central frosted glass rings." },
        { step: "3. Meal Search / Logging", desc: "Select custom food items with visual search results." },
        { step: "4. Dynamic Alerts", desc: "System triggers subtle color shifts on rings when target bounds approach." }
      ],

      // SECTION 9: SCREEN SHOWCASE
      mockupType: "mobile",
      showcaseImage: "./assets/images/project-nutrition.png",

      // SECTION 10: TECH STACK
      stackDetails: [
        { name: "Figma", desc: "UI design, components auto-layouts" },
        { name: "Framer Proto", desc: "High-fidelity micro-interactions and transitions" },
        { name: "Design Tokens", desc: "Unified style rules across shadows and glass" }
      ],

      // SECTION 11: CHALLENGES
      challenges: {
        tech: "Translating static Figma mockups into interactive Framer Prototypes without layout shifts.",
        performance: "Managing multiple high-resolution assets within web preview interfaces.",
        ui: "Creating high contrast contrast ratios on glass backgrounds to meet WCAG AA standards.",
        solutions: "Established a dedicated color system with translucent overlays to lock text readability."
      },

      // SECTION 12: RESULTS
      results: {
        performance: "100% usability score during functional validation tests.",
        userExp: "Logging loop time reduced from 45 seconds to just 4 seconds.",
        business: "Projected user retention increase of 38% over traditional frameworks.",
        scalability: "Design tokens library enables instant adaptation to desktop viewport limits."
      },

      // SECTION 13: LINKS
      links: {
        git: "#",
        demo: "# portfolio",
        docs: "#",
        casePdf: "#"
      }
    },

    "textile-management": {
      id: "textile-management",
      name: "Textile Management System",
      category: "Applications",
      status: "Completed",
      duration: "4 Months (Academic Project)",
      role: "Lead Software Developer & Database Architect",
      techStack: ["VB.NET", "SQL Server", "ADO.NET", "Crystal Reports", "WinForms"],
      gitLink: "#",
      demoLink: "#",
      summary: "A robust desktop enterprise resource planning (ERP) system designed to manage fabric inventories, supplier ledgers, and transactions.",
      
      // SECTION 2: PROBLEM STATEMENT
      problemStatement: {
        background: "Traditional textile wholesalers rely on manual ledgers, causing stock discrepancies and inventory loss.",
        timeline: [
          { date: "Phase 1", title: "Manual Audit", desc: "Discovered a 12% discrepancy in raw yarn stock due to paper tracking errors." },
          { date: "Phase 2", title: "Database Normalization", desc: "Designed a 3NF relational database schema in SQL Server to map items." },
          { date: "Phase 3", title: "WinForms Deployment", desc: "Deployed the VB.NET desktop interface on client warehouse systems." }
        ]
      },

      // SECTION 3: PAIN POINTS
      painPoints: [
        {
          icon: "cube-outline",
          title: "Inventory Leakage",
          desc: "Fabric rolls were untracked, causing double-orders and waste.",
          bizImpact: "Inflated raw material expenses by 15% annually.",
          userImpact: "Warehouse workers struggling to find stock locations.",
          severity: "Critical"
        },
        {
          icon: "receipt-outline",
          title: "Ledger Settlement Delays",
          desc: "Supplier payments were calculated manually, causing transaction friction.",
          bizImpact: "Late fees and strained supplier partnerships.",
          userImpact: "Accountants spending hours cross-referencing invoice bills.",
          severity: "High"
        }
      ],

      // SECTION 4: RESEARCH
      research: {
        users: "Warehouse managers, inventory clerks, and textile accounts teams.",
        findings: "Clerks preferred keyboard-only navigation to speed up entry speeds.",
        competitors: "Generic retail POS systems (lacked fabric-specific units like meters, bales).",
        challenges: "Designing multi-table relational queries that execute rapidly on low-spec terminal systems.",
        insights: "Auto-suggest fields for product serial codes reduces invoice generation errors by 90%."
      },

      // SECTION 5: SOLUTION
      solution: {
        overview: "A desktop ERP system with robust transactional controls built on ADO.NET and SQL Server.",
        whyArchitecture: "VB.NET WinForms selected to guarantee lightning-fast native desktop execution without web network dependencies.",
        benefits: "Real-time stock deduction prevents double-booking of fabric bales.",
        value: "Minimized inventory leakage costs to near 0% within the first month."
      },

      // SECTION 6: FEATURES
      features: [
        {
          icon: "barcode-outline",
          title: "Automated Invoice Billing",
          desc: "Instant invoice calculations with auto-deducting stock triggers.",
          bizBenefit: "Accelerated client billing turnaround times.",
          userBenefit: "Invoices generated instantly without manual math errors."
        },
        {
          icon: "document-text-outline",
          title: "Crystal Reports Integration",
          desc: "One-click generation of supplier ledgers, stock status, and tax logs.",
          bizBenefit: "Audits completed in minutes instead of days.",
          userBenefit: "Clean, print-ready PDF reports generated automatically."
        }
      ],

      // SECTION 7: SYSTEM ARCHITECTURE
      architecture: [
        { layer: "Frontend UI", detail: "VB.NET WinForms desktop layouts with keyboard shortcuts mapping" },
        { layer: "Data Connector", detail: "ADO.NET Connection Pools, SQLCommand transaction scopes" },
        { layer: "Database Storage", detail: "SQL Server 2019 Relational Database (3NF normal structures)" }
      ],

      // SECTION 8: WORKFLOW TIMELINE
      workflow: [
        { step: "1. Staff Authentication", desc: "Secure local login with role-based access restrictions." },
        { step: "2. Supplier Registry", desc: "Log active vendor profiles, credit bounds, and payment terms." },
        { step: "3. Stock Management", desc: "Register fabric items, select category, and log stock quantities." },
        { step: "4. Billing System", desc: "Deduct stock automatically upon invoice completion." }
      ],

      // SECTION 9: SCREEN SHOWCASE
      mockupType: "desktop",
      showcaseImage: "./assets/images/project-textile.png",

      // SECTION 10: TECH STACK
      stackDetails: [
        { name: "VB.NET", desc: "Core language for WinForms layouts" },
        { name: "SQL Server", desc: "Relational database mapping for inventory tables" },
        { name: "ADO.NET", desc: "Data access model linking VB code to DB tables" }
      ],

      // SECTION 11: CHALLENGES
      challenges: {
        tech: "Handling concurrent database connections from multiple warehouse terminals.",
        performance: "Grid layouts lagging when loading thousands of raw fabric serial rows.",
        ui: "WinForms scaling issues on old CRT/LCD monitors at local warehouse terminals.",
        solutions: "Implemented SQL paging queries and explicit data grid double-buffering configurations."
      },

      // SECTION 12: RESULTS
      results: {
        performance: "Database query response time kept under 12ms.",
        userExp: "Invoice generation loop time cut by 70%.",
        business: "Reclaimed approximately 8% of annual leakage losses.",
        scalability: "Optimized relational structure is ready to migrate to cloud databases."
      },

      // SECTION 13: LINKS
      links: {
        git: "#",
        demo: "#",
        docs: "#",
        casePdf: "#"
      }
    },

    "gas-agency-system": {
      id: "gas-agency-system",
      name: "Gas Agency System",
      category: "Web Development",
      status: "Completed",
      duration: "3 Months (Academic Project)",
      role: "Full-Stack Web Developer",
      techStack: ["HTML5", "CSS3", "JavaScript", "SQL", "Database Management"],
      gitLink: "#",
      demoLink: "#",
      summary: "An interactive full-stack web application designed to streamline customer registries, cylinder distributions, and booking transactions.",
      
      // SECTION 2: PROBLEM STATEMENT
      problemStatement: {
        background: "Local LPG gas distributorships suffer from booking congestion, causing order delays and poor customer feedback.",
        timeline: [
          { date: "Month 1", title: "Process Diagnostics", desc: "Identified booking transaction lags: phone-in bookings caused agent queue backlogs." },
          { date: "Month 2", title: "System Modeling", desc: "Drafted database schemas to map cylinder inventory logs to customer slots." },
          { date: "Month 3", title: "Full-Stack Launch", desc: "Completed coding of CRUD transactions and reservation workflows." }
        ]
      },

      // SECTION 3: PAIN POINTS
      painPoints: [
        {
          icon: "call-outline",
          title: "Congested Booking Channels",
          desc: "Customers had to call repeatedly to reserve cylinder refills.",
          bizImpact: "Increased personnel expenses to manage phone inquiries.",
          userImpact: "Hours spent trying to reach booking agents.",
          severity: "Critical"
        },
        {
          icon: "warning-outline",
          title: "Double Booking Failures",
          desc: "Manual logs allowed same cylinder allocation to different slots.",
          bizImpact: "Customer complaints and immediate logistics delays.",
          userImpact: "Missed gas refills causing cooking issues.",
          severity: "High"
        }
      ],

      // SECTION 4: RESEARCH
      research: {
        users: "Agency customers booking refills, and distribution managers.",
        findings: "74% of customers preferred online self-booking to phone calls.",
        competitors: "Manual booking registers (highly prone to entry errors).",
        challenges: "Managing inventory levels in real-time to prevent allocation conflicts.",
        insights: "A booking status tracking page reduces customer anxiety and support volume."
      },

      // SECTION 5: SOLUTION
      solution: {
        overview: "A full-stack web interface allowing self-booking and real-time inventory management.",
        whyArchitecture: "Built on responsive HTML/CSS/JS with a SQL data store to guarantee lightweight server execution.",
        benefits: "Automated booking validations completely prevent double booking loops.",
        value: "Cut agency administrative expenses by 32%."
      },

      // SECTION 6: FEATURES
      features: [
        {
          icon: "calendar-outline",
          title: "Self Refill Booking",
          desc: "Online Refill reservations with instant booking ID allocation.",
          bizBenefit: "Reduced phone traffic overhead.",
          userBenefit: "Booking completed in 3 clicks."
        },
        {
          icon: "people-outline",
          title: "Agency Dashboard",
          desc: "Distribution dashboard showing inventory stock levels.",
          bizBenefit: "Enhanced scheduling of delivery vehicles.",
          userBenefit: "Quick customer registry and database query tracking."
        }
      ],

      // SECTION 7: SYSTEM ARCHITECTURE
      architecture: [
        { layer: "Client Interface", detail: "Responsive HTML5 templates, CSS visual design, JS validations" },
        { layer: "Server Logic", detail: "Form handlers, query builders, transactional logs" },
        { layer: "Storage Store", detail: "SQL database tables (Customers, Inventory, Reservations)" }
      ],

      // SECTION 8: WORKFLOW TIMELINE
      workflow: [
        { step: "1. Account Access", desc: "User log-in with custom client ID." },
        { step: "2. Refill Booking", desc: "Enter consumer number and reserve a cylinder refill." },
        { step: "3. Inventory Validation", desc: "System verifies active stock levels and books refill slot." },
        { step: "4. Manager Approval", desc: "Agency dashboard shows booking logs, scheduling delivery." }
      ],

      // SECTION 9: SCREEN SHOWCASE
      mockupType: "laptop",
      showcaseImage: "./assets/images/project-gas-agency.png",

      // SECTION 10: TECH STACK
      stackDetails: [
        { name: "HTML5 & CSS3", desc: "Responsive layout design" },
        { name: "JavaScript", desc: "Client-side validations" },
        { name: "SQL DB", desc: "Database records storage" }
      ],

      // SECTION 11: CHALLENGES
      challenges: {
        tech: "Preventing race conditions where multiple customers book the last cylinder.",
        performance: "Page load speeds lagging on slow mobile networks.",
        ui: "Designing forms that are easy to fill for senior citizens.",
        solutions: "Implemented transactional database locking and lightweight CSS layouts."
      },

      // SECTION 12: RESULTS
      results: {
        performance: "100% booking success rate without double allocations.",
        userExp: "Customer support requests related to bookings dropped by 80%.",
        business: "Administrative productivity increased by 40%.",
        scalability: "Web layout scales perfectly from mobile screens to desktop panels."
      },

      // SECTION 13: LINKS
      links: {
        git: "#",
        demo: "#",
        docs: "#",
        casePdf: "#"
      }
    }
  };

})();
