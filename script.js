/* =====================================================
   HANIYA WAHABB — PREMIUM PORTFOLIO SCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    /* =====================================================
       TYPING EFFECT
       ===================================================== */

    const typedElement =
        document.querySelector(".typed-text") ||
        document.querySelector("#typed");

    if (typedElement) {

        const words = [
            "AI & Data Science Enthusiast",
            "Python Developer",
            "Machine Learning Enthusiast",
            "Deep Learning Developer",
            "Computer Vision Enthusiast",
            "AI Application Developer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {
                typedElement.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentWord.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1700);
                    return;
                }

            } else {

                typedElement.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 45 : 80
            );
        }

        typeEffect();
    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .fade-up, .project-card, .skill-card"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       ACTIVE NAV LINK
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        );

    if (sections.length && navigationLinks.length) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navigationLinks.forEach(link => {
                            link.classList.remove("active");
                        });

                        const activeLink =
                            document.querySelector(
                                `.nav-links a[href="#${entry.target.id}"]`
                            );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }
                    }

                });

            },
            {
                threshold: 0.35
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* =====================================================
       CURSOR GLOW
       ===================================================== */

    const cursorGlow =
        document.querySelector("#cursorGlow");

    if (cursorGlow) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;

        window.addEventListener("mousemove", event => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        function animateCursor() {

            currentX +=
                (mouseX - currentX) * 0.12;

            currentY +=
                (mouseY - currentY) * 0.12;

            cursorGlow.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }


    /* =====================================================
       HERO IMAGE PARALLAX
       ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image img, .profile-card img"
        );

    if (
        heroImage &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        document.addEventListener("mousemove", event => {

            const x =
                (window.innerWidth / 2 - event.clientX) / 45;

            const y =
                (window.innerHeight / 2 - event.clientY) / 45;

            heroImage.style.transform =
                `translate(${x}px, ${y}px) scale(1.03)`;
        });

    }


    /* =====================================================
       PROJECT CARD 3D TILT
       ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");

    if (
        window.matchMedia("(pointer:fine)").matches
    ) {

        projectCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -5;

                const rotateY =
                    ((x - centerX) / centerX) * 5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
            });

        });
    }


    /* =====================================================
       SKILL BAR ANIMATION
       ===================================================== */

    const skillBars =
        document.querySelectorAll(
            ".skill-fill, .progress-fill"
        );

    if (skillBars.length) {

        const skillObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            const bar =
                                entry.target;

                            const targetWidth =
                                bar.dataset.width ||
                                bar.getAttribute("data-progress") ||
                                bar.style.width;

                            if (targetWidth) {

                                bar.style.width = "0%";

                                requestAnimationFrame(() => {
                                    bar.style.width =
                                        targetWidth;
                                });
                            }

                            skillObserver.unobserve(bar);
                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            });

        });


    /* =====================================================
       RAIN EFFECT
       ===================================================== */

    const rainContainer =
        document.querySelector(".rain");

    if (rainContainer) {

        const numberOfDrops =
            window.innerWidth < 768 ? 45 : 90;

        rainContainer.innerHTML = "";

        for (let i = 0; i < numberOfDrops; i++) {

            const drop =
                document.createElement("span");

            drop.className = "rain-drop";

            drop.style.left =
                Math.random() * 100 + "%";

            drop.style.animationDuration =
                (0.7 + Math.random() * 1.5) + "s";

            drop.style.animationDelay =
                Math.random() * 2 + "s";

            drop.style.opacity =
                0.15 + Math.random() * 0.4;

            rainContainer.appendChild(drop);
        }
    }


    /* =====================================================
       CHATBOT
       ===================================================== */

    const chatButton =
        document.querySelector(
            "#chatButton, .chat-button, .chatbot-button"
        );

    const chatBox =
        document.querySelector(
            "#chatBox, .chatbot, .chat-window"
        );

    const chatClose =
        document.querySelector(
            "#chatClose, .chat-close"
        );

    const chatMessages =
        document.querySelector(
            "#chatMessages, .chat-messages"
        );

    const chatInput =
        document.querySelector(
            "#chatInput, .chat-input"
        );

    const sendButton =
        document.querySelector(
            "#sendMessage, .send-message"
        );


    function openChat() {

        if (!chatBox) return;

        chatBox.classList.add("active");
        chatBox.classList.add("open");

        if (chatInput) {
            setTimeout(() => {
                chatInput.focus();
            }, 250);
        }
    }


    function closeChat() {

        if (!chatBox) return;

        chatBox.classList.remove("active");
        chatBox.classList.remove("open");
    }


    if (chatButton) {
        chatButton.addEventListener(
            "click",
            openChat
        );
    }

    if (chatClose) {
        chatClose.addEventListener(
            "click",
            closeChat
        );
    }


    /* =====================================================
       CHATBOT KNOWLEDGE
       ===================================================== */

    const portfolioKnowledge = {

        hello: [
            "Hello! 👋 I'm Haniya's AI portfolio assistant. Ask me anything about her skills, projects, services or background."
        ],

        skills: [
            "Haniya works with Python, HTML, CSS, JavaScript, NumPy, Pandas, Matplotlib, Machine Learning, Deep Learning, Computer Vision, NLP, FastAPI and Docker basics."
        ],

        python: [
            "Python is one of Haniya's main programming languages. She uses it for Data Analysis, Machine Learning, Deep Learning, Computer Vision and AI applications."
        ],

        machinelearning: [
            "Haniya has worked with Linear Regression, Logistic Regression, KNN, Decision Tree and Random Forest, along with model training and evaluation."
        ],

        deeplearning: [
            "Her Deep Learning experience includes ANN, CNN, Transfer Learning and MobileNetV2."
        ],

        projects: [
            "Haniya's major projects include Facial Emotion Recognition, Plant Disease Detection, Fresh Fruit Classification, Car Sales Data Analysis and Nova AI Chatbot."
        ],

        emotion: [
            "Facial Emotion Recognition is a Computer Vision project built using Python, TensorFlow/Keras and MobileNetV2. It recognizes seven emotions: Angry, Disgust, Fear, Happy, Neutral, Sad and Surprise."
        ],

        plant: [
            "Plant Disease Detection uses Deep Learning, MobileNetV2 and Computer Vision to identify plant diseases from images."
        ],

        fruit: [
            "Fresh Fruit Classification is a CNN-based Computer Vision project developed in Python."
        ],

        car: [
            "Car Sales Data Analysis was created using Python, Pandas, NumPy and Matplotlib to analyze and visualize sales data."
        ],

        chatbot: [
            "Nova AI Chatbot is an AI-powered application built with Python, FastAPI, HTML, CSS and JavaScript."
        ],

        services: [
            "Haniya offers Python Development, Data Analysis, Data Visualization, Machine Learning Projects, Deep Learning Projects, Computer Vision, AI Chatbot Development and FastAPI/API Development."
        ],

        education: [
            "Haniya is a BS English graduate and has professional training/certification in Artificial Intelligence and Data Science."
        ],

        contact: [
            "You can contact Haniya at haniyawahab@gmail.com or 03700272600."
        ],

        github: [
            "You can explore Haniya's GitHub here: github.com/haniyawahabbye"
        ],

        interests: [
            "Haniya is interested in Artificial Intelligence, Data Science, Machine Learning, Deep Learning, Computer Vision, NLP and practical AI applications."
        ]

    };


    function getBotResponse(message) {

        const text =
            message
                .toLowerCase()
                .trim();


        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey") ||
            text.includes("salam")
        ) {
            return portfolioKnowledge.hello[0];
        }


        if (
            text.includes("skill") ||
            text.includes("technology") ||
            text.includes("tech stack")
        ) {
            return portfolioKnowledge.skills[0];
        }


        if (
            text.includes("python")
        ) {
            return portfolioKnowledge.python[0];
        }


        if (
            text.includes("machine learning") ||
            text.includes("ml")
        ) {
            return portfolioKnowledge.machinelearning[0];
        }


        if (
            text.includes("deep learning") ||
            text.includes("cnn") ||
            text.includes("ann")
        ) {
            return portfolioKnowledge.deeplearning[0];
        }


        if (
            text.includes("project") ||
            text.includes("projects")
        ) {
            return portfolioKnowledge.projects[0];
        }


        if (
            text.includes("emotion") ||
            text.includes("facial")
        ) {
            return portfolioKnowledge.emotion[0];
        }


        if (
            text.includes("plant") ||
            text.includes("disease")
        ) {
            return portfolioKnowledge.plant[0];
        }


        if (
            text.includes("fruit")
        ) {
            return portfolioKnowledge.fruit[0];
        }


        if (
            text.includes("car sales") ||
            text.includes("sales analysis")
        ) {
            return portfolioKnowledge.car[0];
        }


        if (
            text.includes("nova") ||
            text.includes("chatbot")
        ) {
            return portfolioKnowledge.chatbot[0];
        }


        if (
            text.includes("service") ||
            text.includes("hire") ||
            text.includes("offer")
        ) {
            return portfolioKnowledge.services[0];
        }


        if (
            text.includes("education") ||
            text.includes("degree") ||
            text.includes("qualification")
        ) {
            return portfolioKnowledge.education[0];
        }


        if (
            text.includes("contact") ||
            text.includes("email") ||
            text.includes("phone")
        ) {
            return portfolioKnowledge.contact[0];
        }


        if (
            text.includes("github")
        ) {
            return portfolioKnowledge.github[0];
        }


        if (
            text.includes("interest") ||
            text.includes("passion")
        ) {
            return portfolioKnowledge.interests[0];
        }


        return "I can tell you about Haniya's skills, projects, education, services, GitHub, contact details and AI/Data Science experience. 🤖";
    }


    /* =====================================================
       CHAT MESSAGE
       ===================================================== */

    function addMessage(
        message,
        sender = "bot"
    ) {

        if (!chatMessages) return;

        const messageElement =
            document.createElement("div");

        messageElement.className =
            `chat-message ${sender}`;

        messageElement.textContent =
            message;

        chatMessages.appendChild(
            messageElement
        );

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

        return messageElement;
    }


    /* =====================================================
       BOT TYPING
       ===================================================== */

    function showTyping() {

        if (!chatMessages) return;

        const typing =
            document.createElement("div");

        typing.className =
            "chat-message bot typing";

        typing.innerHTML =
            "<span></span><span></span><span></span>";

        typing.id =
            "typingIndicator";

        chatMessages.appendChild(typing);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }


    function removeTyping() {

        const typing =
            document.querySelector(
                "#typingIndicator"
            );

        if (typing) {
            typing.remove();
        }
    }


    /* =====================================================
       VOICE RESPONSE
       ===================================================== */

    function speak(text) {

        if (
            !("speechSynthesis" in window)
        ) {
            return;
        }

        window.speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.rate = 0.95;
        speech.pitch = 1;
        speech.volume = 1;

        const voices =
            window.speechSynthesis.getVoices();

        const preferredVoice =
            voices.find(
                voice =>
                    /en-US|en-GB/i.test(
                        voice.lang
                    )
            );

        if (preferredVoice) {
            speech.voice =
                preferredVoice;
        }

        window.speechSynthesis.speak(
            speech
        );
    }


    /* =====================================================
       SEND CHAT
       ===================================================== */

    function sendMessage() {

        if (!chatInput) return;

        const message =
            chatInput.value.trim();

        if (!message) return;

        addMessage(
            message,
            "user"
        );

        chatInput.value = "";

        showTyping();

        const response =
            getBotResponse(message);

        setTimeout(() => {

            removeTyping();

            addMessage(
                response,
                "bot"
            );

            speak(response);

        }, 650);
    }


    if (sendButton) {
        sendButton.addEventListener(
            "click",
            sendMessage
        );
    }


    if (chatInput) {

        chatInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendMessage();
                }

            }
        );
    }


    /* =====================================================
       QUICK CHAT PROMPTS
       ===================================================== */

    document
        .querySelectorAll(
            ".quick-prompt, .quick-btn, [data-prompt]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const prompt =
                        button.dataset.prompt ||
                        button.textContent.trim();

                    if (!chatInput) return;

                    chatInput.value =
                        prompt;

                    sendMessage();
                }
            );

        });


    /* =====================================================
       GITHUB LINKS
       ===================================================== */

    document
        .querySelectorAll(
            'a[href*="github.com/haniyawahabbye"]'
        )
        .forEach(link => {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        });


    /* =====================================================
       GRADIENT BUBBLE RANDOM MOVEMENT
       ===================================================== */

    const bubbles =
        document.querySelectorAll(
            ".gradient-bubbles .bubble"
        );

    bubbles.forEach((bubble, index) => {

        bubble.style.animationDelay =
            `${index * -1.7}s`;

    });


    /* =====================================================
       REDUCE MOTION ACCESSIBILITY
       ===================================================== */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reduceMotion.matches) {

        document
            .querySelectorAll(
                "*"
            )
            .forEach(element => {

                element.style.animationDuration =
                    "0.01ms";

                element.style.transitionDuration =
                    "0.01ms";
            });
    }


    console.log(
        "✨ Haniya Wahabb Premium Portfolio Loaded Successfully!"
    );

});
