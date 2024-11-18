let points = 0;
let achievements = [];
let earnedSections = new Set();
let exp = 0;
const maxExp = 5;

function earnPoints(section) {
    const validSections = ['about', 'education', 'skills', 'projects', 'contact'];

    if (!validSections.includes(section)) {
        console.log(`Invalid section: ${section}`);
        return;
    }

    if (earnedSections.has(section)) {
        return;
    }

    points += 1;
    earnedSections.add(section);

    document.getElementById('points').textContent = points;

    if (!achievements.includes(capitalizeFirstLetter(section))) {
        achievements.push(capitalizeFirstLetter(section));
        document.getElementById('achievements').textContent = achievements.join(', ');

        triggerConfetti();
    }

    exp += 1;
    if (exp > maxExp) exp = maxExp;

    updateExpBar();

    displayAchievementMessage(section);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0a4d8c', '#f8b100', '#ffffff']
    });
}

function displayAchievementMessage(section) {
    const messageElement = document.getElementById('message-text');
    const message = `Achievement Unlocked: Explored ${capitalizeFirstLetter(section)}! +1 points`;
    messageElement.textContent = message;

    const achievementMessage = document.getElementById('achievement-message');
    achievementMessage.style.display = 'block';

    setTimeout(() => {
        achievementMessage.style.display = 'none';
    }, 3000);
}

function updateExpBar() {
    const expFill = document.getElementById('exp-fill');
    const expProgress = document.getElementById('exp-progress');

    const expPercentage = (exp / maxExp) * 100;
    expFill.style.width = `${expPercentage}%`;
    expProgress.textContent = `${exp}/${maxExp}`;

    if (expPercentage === 100) {
        expFill.style.backgroundColor = '#4CAF50';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
    updateExpBar();
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.skills-graph-container');
    const nodes = document.querySelectorAll('.skill-node');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.zIndex = '0';
    container.appendChild(svg);

    function getCenterPosition(node) {
        const rect = node.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
        };
    }

    nodes.forEach(node => {
        const connections = node.dataset.connections.split(',');
        const startPosition = getCenterPosition(node);

        connections.forEach(connId => {
            const targetNode = document.getElementById(connId);
            if (targetNode) {
                const endPosition = getCenterPosition(targetNode);

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', startPosition.x);
                line.setAttribute('y1', startPosition.y);
                line.setAttribute('x2', endPosition.x);
                line.setAttribute('y2', endPosition.y);
                line.setAttribute('class', 'line-glow');
                svg.appendChild(line);
            }
        });
    });
});
