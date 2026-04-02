function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// সংখ্যাগুলো অ্যানিমেট করুন
window.onload = () => {
    animateValue("project-count", 0, 58, 2000); // ২ সেকেন্ডে ০ থেকে ৫৮ হবে
    animateValue("area-count", 0, 18, 2000);
};
