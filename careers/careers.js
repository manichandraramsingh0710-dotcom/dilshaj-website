
// Initialize AOS
AOS.init({ duration: 800, once: true });

window.onload = function () {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 500);
}

// Roles Slider Logic
const rolesData = [
    {
        title: "UI and UX Designer",
        desc: "Create beautiful, intuitive designs that provide a seamless user experience. Transform complex requirements into focus-driven wireframes and high-fidelity prototypes.",
        loc: "Hybrid",
        exp: "2+ years",
        img: "https://images.unsplash.com/photo-1581291518062-c9a79d7df7f0?auto=format&fit=crop&q=80&w=1600"
    },
    {
        title: "Backend Developer",
        desc: "Design and implement efficient server-side logic and database schemas. Optimize applications for maximum speed and scalability while ensuring security.",
        loc: "Remote",
        exp: "4+ years",
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600"
    },
    {
        title: "Senior Frontend Engineer",
        desc: "Build responsive and high-performance web interfaces using modern frameworks. Focus on clean code, user experience, and delivering scalable digital products.",
        loc: "Narsipatnam",
        exp: "4+ years",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600"
    },
    {
        title: "Full Stack Developer",
        desc: "Take ownership of end-to-end feature development. Work with both client-side and server-side technologies to build robust and scalable software solutions.",
        loc: "Vizag",
        exp: "3+ years",
        img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1600"
    },
    {
        title: "Project Manager",
        desc: "Lead cross-functional teams to deliver high-quality digital products on time. Manage project timelines, resources, and client expectations effectively.",
        loc: "Vizag",
        exp: "5+ years",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600"
    },
    {
        title: "iOS Developer",
        desc: "Build next-generation mobile applications for iOS devices. Experience with Swift and modern mobile architecture patterns is highly preferred.",
        loc: "Narsipatnam",
        exp: "3+ years",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1600"
    },
    {
        title: "SEO Specialist",
        desc: "Optimize website content and architecture to improve search engine rankings. Drive organic traffic through data-driven strategies and performance mapping.",
        loc: "Remote",
        exp: "2+ years",
        img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1600"
    }
];

let currentRoleIndex = 0;
const mainCard = document.getElementById('featured-role-card');
const mainBg = document.getElementById('main-card-bg');
const roleTitle = document.getElementById('active-role-title');
const roleDesc = document.getElementById('active-role-desc');
const roleLoc = document.getElementById('active-role-loc');
const roleExp = document.getElementById('active-role-exp');
const thumbGrid = document.getElementById('roles-thumb-grid');

// Function to create thumbnail tiles
function initializeThumbs() {
    if (!thumbGrid) return;
    thumbGrid.innerHTML = '';
    rolesData.forEach((role, index) => {
        const card = document.createElement('div');
        card.className = `role-thumb-card ${index === 0 ? 'active' : ''}`;
        card.dataset.role = index;
        card.innerHTML = `
            <h4>${role.title}</h4>
            <div class="role-thumb-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${role.loc}</span>
                <span><i class="fas fa-briefcase"></i> ${role.exp}</span>
            </div>
            <a href="../contact/contact.html" class="btn-apply-now">
                Apply Now
                <i class="fas fa-arrow-right"></i>
            </a>
        `;
        card.onclick = () => updateSlider(index);
        thumbGrid.appendChild(card);
    });
}

function updateSlider(index) {
    if (index === currentRoleIndex) return;
    currentRoleIndex = index;
    const data = rolesData[index];

    // 1. Fade out Background only
    if (mainBg) mainBg.classList.add('fade-out');

    // 2. Animate content softly
    if (roleTitle) {
        roleTitle.style.opacity = '0';
        roleTitle.style.transform = 'translateY(15px)';
    }
    if (roleDesc) roleDesc.style.opacity = '0';

    setTimeout(() => {
        // Change Data
        if (roleTitle) roleTitle.innerText = data.title;
        if (roleDesc) roleDesc.innerText = data.desc;
        if (roleLoc) roleLoc.innerText = data.loc;
        if (roleExp) roleExp.innerText = data.exp;

        // Preload and switch bg
        const img = new Image();
        img.src = data.img;

        const showContent = () => {
            if (mainBg) {
                mainBg.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0, 0, 0, 0.3)), url('${data.img}')`;
                mainBg.classList.remove('fade-out');
            }

            // Fade content back in
            if (roleTitle) {
                roleTitle.style.opacity = '1';
                roleTitle.style.transform = 'translateY(0)';
            }
            if (roleDesc) roleDesc.style.opacity = '1';
        };

        img.onload = showContent;
        img.onerror = showContent; // Fallback so content doesn't stay hidden if image fails

        // Backup timeout if network is very slow
        setTimeout(showContent, 1000);
    }, 350);

    // Update Thumbnails
    document.querySelectorAll('.role-thumb-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
        if (i === index) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    });
}

// Initialize grid on load
initializeThumbs();

// Fix for initial load state - set background and opacity
window.addEventListener('DOMContentLoaded', () => {
    if (rolesData.length > 0) {
        const firstRole = rolesData[0];
        if (mainBg) {
            mainBg.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0, 0, 0, 0.3)), url('${firstRole.img}')`;
            mainBg.classList.remove('fade-out');
        }

        // Sync initial content
        if (roleTitle) {
            roleTitle.innerText = firstRole.title;
            roleTitle.style.opacity = '1';
            roleTitle.style.transition = 'all 0.6s ease';
        }
        if (roleDesc) {
            roleDesc.innerText = firstRole.desc;
            roleDesc.style.opacity = '1';
            roleDesc.style.transition = 'all 0.8s ease';
        }
        if (roleLoc) roleLoc.innerText = firstRole.loc;
        if (roleExp) roleExp.innerText = firstRole.exp;
    }
});

const prevBtn = document.getElementById('role-prev');
if (prevBtn) {
    prevBtn.onclick = () => {
        let nextIndex = (currentRoleIndex - 1 + rolesData.length) % rolesData.length;
        updateSlider(nextIndex);
    };
}

const nextBtn = document.getElementById('role-next');
if (nextBtn) {
    nextBtn.onclick = () => {
        let nextIndex = (currentRoleIndex + 1) % rolesData.length;
        updateSlider(nextIndex);
    };
}
