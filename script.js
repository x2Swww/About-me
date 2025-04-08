document.documentElement.style.scrollBehavior = "smooth";

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in:not(#contact)");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

    elements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("visible");
            observer.unobserve(el);
        }
    });

    // Smooth scroll
    document.querySelectorAll(".nav-link, .btn-primary").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // เพิ่มขนาด navbar
                    behavior: "smooth"
                });
            }
        });
    });

    // เพิ่มขนาด Navbar ให้ใหญ่ขึ้นนิดนึง
    const navbar = document.querySelector("nav");
    if (navbar) {
        navbar.style.padding = "20px 0";
    }

    // อนิเมชั่นโปรไฟล์เด้งขึ้นลง
    const profileImage = document.querySelector("img[alt='uwu']");
    if (profileImage) {
        profileImage.style.animation = "bounce 2s infinite ease-in-out";
    }

    // อนิเมชั่น My Skills
    const skillsSection = document.querySelector("#skills");
    if (skillsSection) {
        skillsSection.classList.add("fade-in");
    }
});

// CSS animation
document.head.insertAdjacentHTML("beforeend", `
<style>
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s ease-out, transform 1s ease-out;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
`);

// ป้องกัน Inspect / Copy / View Source
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showToast("คลิกขวาไม่ได้นะครับ");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "F12") {
    e.preventDefault();
    showToast("ไม่อณุญาติให้ DevTools นะครับ");
  }

  if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
    e.preventDefault();
    showToast("อย่าคิด Inspect");
  }

  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
    showToast("ไม่ต้องมาส่องเลย");
  }

  if (e.ctrlKey && ["c", "x", "s", "a"].includes(e.key.toLowerCase())) {
    e.preventDefault();
    showToast("ไม่ให้ก็อปนะ อิอิ");
  }
});

// ป้องกัน XSS
function sanitizeText(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
