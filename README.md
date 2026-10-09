# Drishti AI Security

# PROJECT: CYBER DRISHTI AI

## See the Threat. Stop the Scam.

Act as a senior full-stack developer, AI engineer, cybersecurity specialist, UI/UX designer, accessibility expert, and software tester.

Build and improve my existing project into **Cyber Drishti AI**, a premium, intelligent, multilingual cybersecurity protection platform that helps people identify phishing links, malicious websites, scam messages, QR-code threats, fake shopping websites, and online fraud before they lose money or personal information.

## CRITICAL INSTRUCTIONS

1. First inspect the entire existing project, framework, folder structure, dependencies, and implemented features.
2. Preserve existing working code and integrate new features without unnecessarily deleting or duplicating anything.
3. Change the app branding everywhere from “PhishGuard AI” to “Cyber Drishti AI,” including page titles, navbar, dashboard, login pages, logos, metadata, documentation, and extension branding where applicable.
4. Implement functional features, not merely attractive UI mockups.
5. Build incrementally, test each major feature, and fix errors before continuing.
6. Never invent scan results, threat-intelligence responses, statistics, accuracy percentages, reviews, or security claims.
7. If a feature requires an API key, third-party service, browser extension, or native mobile integration, implement the available parts and clearly document the remaining setup.
8. Prioritize a working, secure core product before attempting every advanced feature.
9. Use maintainable, reusable components and a clean, professional architecture.
10. Do not stop after creating a plan or landing page. Continue implementing the features that can be completed in the existing environment.

# 1. PREMIUM CYBERSECURITY DESIGN

Create a visually stunning, modern, premium cybersecurity interface.

### Visual identity

* App name: Cyber Drishti AI
* Tagline: “See the Threat. Stop the Scam.”
* Dark midnight navy and black backgrounds.
* Electric cyan, blue, and violet accent colors.
* Premium glassmorphism cards with subtle borders and glow effects.
* Futuristic shield, digital-eye, network-node, and circuit-board visual elements.
* Smooth page transitions, hover effects, loading states, and progress animations.
* Clear typography, balanced spacing, and professional iconography.
* Responsive design for laptops, desktops, tablets, and mobile phones.
* Accessible contrast, keyboard navigation, and screen-reader labels.

### Animated background

Create a premium animated cybersecurity background using lightweight CSS, SVG, or canvas:

* Floating digital particles.
* Slowly moving network connections.
* Subtle circuit patterns.
* Gentle cyan and violet light effects.
* A futuristic digital shield or eye motif.
* Restrained animations that do not interfere with reading or scanning.

Provide a static or reduced-motion alternative for low-powered devices and users who prefer reduced motion.

### Optional background sound

* Add an optional, subtle futuristic ambient soundscape.
* Sound must be OFF by default.
* Never autoplay sound before explicit user interaction.
* Provide a visible sound toggle, mute control, and volume slider.
* Add an independent option for short security-alert sounds.
* Use licensed or original sound assets.
* Respect browser autoplay restrictions and save preferences only where appropriate.
* All features must work correctly when sound is disabled.
* Do not play loud, repetitive, or frightening sounds.

### Main navigation and pages

Create a polished landing page, dashboard, URL scanner, message analyzer, screenshot analyzer, QR scanner, fake-shopping detector, voice assistant, CyberShield Rewards, Cyber Safety Academy, scan history, reports, notifications, privacy settings, and help page.

Keep navigation simple and responsive.

# 2. USER AUTHENTICATION

Implement secure authentication.

* Support phone-number login with OTP using a legitimate provider such as Firebase Authentication, if suitable for the existing stack.
* Include phone-number validation, OTP verification, resend cooldown, loading states, and understandable error messages.
* Do not store or log OTP values.
* Add logout and secure session handling.
* Protect user-specific pages and data with proper authorization.
* Use environment variables for configuration and document setup steps.
* Do not pretend OTP works if provider configuration is missing.

If phone authentication cannot be fully enabled without credentials, create the integration structure and explain exactly how to configure it.

# 3. ADVANCED PHISHING AND MALICIOUS URL SCANNER

This is the core feature and must be implemented first.

Users should be able to paste or type a URL and scan it.

### Detection signals

Evaluate applicable signals such as:

* Suspicious URL structure and misleading subdomains.
* IP addresses used instead of recognizable domain names.
* URL shorteners and redirect chains, where safely inspectable.
* Misspellings and impersonation of known brands.
* Suspicious keywords and deceptive paths.
* Embedded usernames or passwords in URLs.
* Unusual ports and excessive subdomains.
* Unicode and Punycode domain tricks.
* HTTPS availability, while explaining that HTTPS alone does not prove a website is safe.
* Domain registration age, DNS, certificate, and reputation information only when a reliable source actually provides it.
* Results from a configured threat-intelligence provider.

### Results interface

Display:

* Risk score from 0 to 100.
* Risk category: Low, Medium, High, or Unknown.
* Clear explanations of the signals that affected the result.
* Recommended next actions.
* Scan timestamp.
* Threat-intelligence source and lookup status, when applicable.
* A clear distinction between confirmed threat matches, heuristic warnings, and unavailable information.

Do not describe the risk score as a calibrated probability unless it has been properly validated.

Do not guarantee that any website is safe. A clean result must mean only that no threat was identified by the available checks.

If evidence is insufficient or a service is unavailable, return an appropriate Unknown or Unable to Verify result instead of inventing a safe verdict.

# 4. REAL THREAT-INTELLIGENCE INTEGRATION

Integrate a legitimate threat-intelligence provider, such as Google Safe Browsing or another suitable service.

Requirements:

* Keep secret API keys on the server.
* Use the provider's official API and current documentation.
* Handle timeouts, quotas, errors, and unavailable services.
* Add appropriate rate limiting and caching.
* Validate and normalize URLs.
* Record source and lookup timestamp when available.
* Clearly distinguish actual provider results from local heuristic analysis.
* Never fabricate threat matches or API responses.
* Provide a documented configuration file such as `.env.example` without real secrets.
* Ensure the application still works in a clearly labelled limited mode when credentials are unavailable.

# 5. EMAIL, SMS, CHAT, AND SCAM MESSAGE ANALYZER

Create a tool where users can paste a suspicious email, SMS, chat message, or call transcript.

Detect and explain relevant warning signs, including:

* Urgent demands and threats.
* Requests for OTPs, passwords, banking details, or payments.
* Impersonation of banks, government agencies, delivery services, or well-known companies.
* Fake prizes, job offers, investment promises, and unrealistic discounts.
* Suspicious contact details and links.
* Attempts to move users to unfamiliar payment methods.
* Manipulative language and suspicious instructions.

Extract URLs from the submitted text and allow users to scan them separately.

Support multilingual input where the chosen detection services allow it.

Display suspicious phrases, reasons, risk category, and safe next steps. Explain that a warning is an indication, not definitive proof of fraud.

Never access private messages automatically or request unnecessary personal information.

# 6. SCREENSHOT SCAM DETECTOR

Allow users to upload screenshots of suspicious messages, payment requests, emails, advertisements, or shopping websites.

Implement:

* Image upload and preview.
* OCR text extraction using an appropriate library or service.
* Editable extracted text.
* Scam-pattern analysis of the extracted text.
* URL extraction and optional URL scanning.
* A report showing detected warning signs and recommendations.

Validate file types and file sizes. Handle blurry images and OCR failures gracefully.

Do not execute files, scripts, or links contained in uploaded images. Do not upload screenshots to external services without clearly explaining the processing and obtaining appropriate consent.

# 7. QR CODE SAFETY SCANNER

Implement QR-code scanning through image upload and, where supported, a camera.

Requirements:

* Decode the QR code without automatically opening its destination.
* Display the decoded content for inspection.
* If the content is a URL, offer to scan it using the URL scanner.
* Warn about suspicious domains, impersonation, and deceptive destinations where evidence exists.
* Handle unsupported QR content safely.
* Ask permission before camera access.
* Never automatically make a payment, submit credentials, or open a suspicious destination.

# 8. FAKE SHOPPING WEBSITE DETECTOR

Create a dedicated fake-shopping and online-store risk analyzer.

Evaluate available evidence such as:

* Domain spelling and brand impersonation.
* Suspicious domain patterns and redirects.
* Domain age or reputation only when verified information is available.
* HTTPS and certificate information, without treating HTTPS as proof of legitimacy.
* Unrealistic discounts and suspicious product claims.
* Missing or inconsistent contact, refund, shipping, and return information when the website can be safely inspected.
* Suspicious payment requests or unusual payment methods.
* Trustworthy threat-intelligence matches.
* Official store verification using reliable sources, where possible.

Provide:

* Shopping risk score and category.
* Evidence supporting the assessment.
* Positive, negative, and unavailable signals.
* Safe shopping recommendations.
* A warning to verify the seller through official channels.

Do not declare a store fraudulent based on one signal alone. Do not fabricate company registration, domain age, customer reviews, official verification, or website content.

If automated website inspection is implemented, isolate it securely and prevent server-side request forgery (SSRF). Never execute untrusted website scripts.

# 9. PROACTIVE PROTECTION BEFORE A USER CLICKS

Build realistic protection features that help users avoid dangerous links.

### Browser extension

Where the project environment permits, create a separate Chrome extension using Manifest V3.

Include:

* Detection of navigation to URLs identified as dangerous by configured checks.
* A warning or interstitial before continuing to a known dangerous destination, where supported.
* Clear options to go back or continue after an informed warning, where appropriate.
* Minimal permissions.
* No collection of unrelated browsing history.
* No transmission of browsing data unless required, disclosed, and appropriately consented to.

Test and document the extension separately from the website.

### Mobile link sharing

Create a mobile-friendly “Share to Cyber Drishti AI” workflow:

* Users can share a link from supported apps to the scanner.
* The shared URL is displayed before scanning.
* Scanning starts only with appropriate user action or clearly explained consent.
* Provide a copy-and-paste fallback.

Document how a future Android share-sheet integration would work if native application development is outside the current stack.

### Important limitation

A normal website cannot automatically inspect every incoming WhatsApp, SMS, email, or other app message on a phone. Do not claim universal background protection unless a genuine, permission-based integration exists.

# 10. MULTILINGUAL VOICE ASSISTANT

Create an accessible voice assistant for users who prefer speaking instead of typing.

Target languages include:

* Telugu
* English
* Hindi
* Tamil
* Kannada
* Malayalam
* Bengali
* Marathi
* Other languages supported by the selected speech provider

### Features

* Voice input using a supported speech-recognition service.
* Automatic language identification where supported.
* Manual language selection as a fallback.
* Editable speech transcript before analysis.
* Text-to-speech responses in supported languages.
* Clear microphone permission and recording indicators.
* Loading, unsupported-language, and recognition-error states.
* Manual text input when speech recognition is unavailable.

### Voice commands

Support commands such as:

* “Scan this link.”
* “Explain this risk.”
* “Read my report.”
* “Change language.”
* “Stop speaking.”

Add play, pause, resume, and stop controls where supported.

Do not keep the microphone always active. Do not record calls or other people without appropriate consent. Avoid retaining audio by default. Clearly disclose external speech processing.

Never infer deception, trustworthiness, or criminal intent from a person's accent, voice, or language.

# 11. CYBERSHIELD REWARDS AND GAMIFICATION

Build a CyberShield Rewards system to encourage cybersecurity learning.

### Reward features

* CyberCoins or points for verified learning activities.
* Levels: Beginner Shield, Cyber Defender, Phishing Expert, and Cyber Guardian.
* Achievement badges.
* Daily security challenges.
* Learning streaks.
* A pseudonymous leaderboard with privacy controls.
* User avatar and theme customization.
* A rewards store for in-app cosmetic items.

### Rules

* Award points only after a genuine, verified action.
* Validate rewards on the server.
* Prevent duplicate submissions, replay attacks, and simple reward farming.
* Do not award points merely for labelling a legitimate website as malicious.
* Clearly distinguish virtual rewards from real-world prizes.
* Do not promise cash, gift cards, or other real rewards unless a real, configured reward system exists.

# 12. CYBER SAFETY ACADEMY

Create an interactive learning section with:

* Phishing awareness lessons.
* Fake shopping website examples.
* QR-code scam awareness.
* OTP and account takeover prevention.
* Password and account security.
* Social engineering and impersonation.
* Safe online payments.
* Practical scam-identification quizzes.
* Explanations for correct and incorrect answers.
* Progress tracking and verified rewards.

Use clearly labelled educational simulations. Do not use real credentials or collect sensitive information in simulated phishing exercises.

# 13. DASHBOARD, SCAN HISTORY, AND REPORTS

Build a useful dashboard containing real application data:

* Total scans.
* Risk categories and their counts.
* Recent scan history.
* Recent verified threat matches.
* Learning progress and earned badges.
* Notification preferences and relevant alerts.

Only show metrics derived from actual records. Clearly label sample data used in development.

Allow users to:

* View scan details.
* Search and filter history.
* Delete individual records or clear their history.
* Export available scan reports as PDF or CSV.
* Review evidence and recommendations.
* Access privacy and notification settings.

Do not expose one user's records to another user.

# 14. NOTIFICATIONS AND ALERTS

Implement opt-in notifications for relevant security events.

Examples:

* A scan has identified a known threat.
* A scan could not verify the destination.
* A saved scan has a new result, if supported by a real update mechanism.
* A user-requested scan has completed.

Requirements:

* Ask permission before enabling notifications.
* Provide enable, disable, and preference controls.
* Support quiet hours where applicable.
* Avoid duplicate, misleading, or excessive alerts.
* Do not claim to monitor incoming messages when the application has no such access.
* Ensure alerts are based on actual results.

# 15. SECURITY, PRIVACY, AND DATA PROTECTION

Apply security best practices throughout the project.

* Store secrets in server-side environment variables.
* Validate and normalize all user input.
* Use safe output rendering to prevent cross-site scripting.
* Use parameterized database queries or the appropriate secure ORM.
* Enforce authentication and authorization.
* Add rate limits and abuse protection.
* Secure file uploads and restrict file sizes and types.
* Use secure session and cookie settings where applicable.
* Apply appropriate security headers and a suitable Content Security Policy.
* Minimize collection and retention of personal data.
* Provide understandable privacy notices and deletion controls.
* Avoid logging passwords, OTPs, tokens, private messages, or unnecessary personal data.
* Obtain appropriate consent for third-party processing.

### SSRF and unsafe URL protection

If the backend fetches submitted URLs:

* Block loopback, private, link-local, and internal network destinations, including IPv6 equivalents.
* Validate DNS resolutions and re-check redirect destinations.
* Defend against DNS rebinding and redirects to internal resources.
* Restrict protocols to those explicitly required.
* Apply strict timeouts and response-size limits.
* Do not fetch arbitrary local files or internal services.
* Never execute downloaded HTML, JavaScript, or other untrusted content.

Use secure, documented defaults.

# 16. DETECTION QUALITY AND RELIABILITY

Reduce false positives and false negatives using explainable, evidence-based checks.

* Separate heuristic warnings from verified threat-intelligence matches.
* Avoid double-counting closely related signals.
* Treat missing data as unknown rather than proof of danger or safety.
* Use a labelled test dataset where available and appropriate.
* Report precision, recall, and other metrics only when they have actually been measured.
* Document detection limitations.
* Do not claim perfect detection or 100% accuracy.
* Ensure the application remains usable when APIs are unavailable.
* Provide clear errors and retry options without exposing sensitive implementation details.

# 17. TESTING REQUIREMENTS

Create and run suitable tests for:

* URL parsing and normalization.
* Unicode and Punycode domains.
* Risk scoring and classification.
* Known threats versus heuristic warnings.
* Unknown results and API failures.
* Rate limiting and caching.
* SSRF and redirect protections.
* Message analysis and URL extraction.
* Screenshot upload and OCR failures.
* QR decoding.
* Voice recognition fallback and text-to-speech controls.
* OTP authentication integration.
* Browser extension behavior.
* Notifications and user preferences.
* Rewards validation and duplicate prevention.
* User authorization and data deletion.
* PDF and CSV exports.
* Responsive UI and accessibility.

Fix errors introduced by the implementation and run the relevant tests again. Never report a test as passing unless it has actually been run successfully.

# 18. IMPLEMENTATION ORDER

Work in the following phases.

Phase 1: Inspect the existing project, preserve working features, update branding to Cyber Drishti AI, and fix current errors.

Phase 2: Build the responsive premium UI, dashboard, navigation, and URL scanner.

Phase 3: Implement explainable risk analysis and real threat-intelligence integration with safe fallback behavior.

Phase 4: Add the message analyzer, screenshot detector, QR scanner, and fake-shopping detector.

Phase 5: Add phone OTP authentication, scan history, reports, and opt-in notifications.

Phase 6: Implement multilingual voice features and the CyberShield Rewards and Cyber Safety Academy modules.

Phase 7: Build and document the browser extension and mobile sharing workflow where supported.

Phase 8: Add premium animations, the optional background sound controls, accessibility improvements, and final responsive styling.

Phase 9: Run tests, fix bugs, review security, and update documentation.

If time or environment constraints prevent completing every feature, finish the core scanner first, then continue with the highest-priority features. Do not replace unfinished functionality with fake success screens.

# 19. FINAL DELIVERY

When implementation is complete:

* Summarize what was actually built.
* List the files and major components changed.
* Provide exact setup and run commands for the existing stack.
* Document required environment variables without including real secrets.
* Explain how to configure external APIs and OTP authentication.
* Explain how to run tests.
* Clearly list features that are fully functional, partially implemented, or still require external setup.
* Document browser-extension and mobile-integration limitations.
* Report real test results and remaining known issues.
* Fix any obvious runtime errors before declaring completion.

The final result should feel like a premium, trustworthy, futuristic cybersecurity product named **Cyber Drishti AI — See the Threat. Stop the Scam.**

Start by auditing the existing project, then implement the working core features and proceed through the phases. Do not stop after producing a plan.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cyber-drishti-guard.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/17276f21-da51-459f-9d99-52a5e2d25b03).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
