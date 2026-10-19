const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");
const copyButton = document.querySelector("[data-copy-citation]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

copyButton?.addEventListener("click", async () => {
  const citation = document.querySelector("#bibtex")?.innerText;
  if (!citation) return;

  try {
    await navigator.clipboard.writeText(citation);
    const label = copyButton.querySelector("span");
    const original = label.textContent;
    label.textContent = "Copied";
    window.setTimeout(() => {
      label.textContent = original;
    }, 1800);
  } catch {
    window.getSelection()?.selectAllChildren(document.querySelector("#bibtex"));
  }
});

const demoCases = {
  camera: [
    {
      title: "Case 01",
      base: "assets/demos/camera/01",
      media: {
        ours: "ours.mp4",
        seedance: "seedance.mp4",
        camclone: "camclone.mp4",
        realcam: "realcam_i2v.mp4",
        gen3c: "gen3c.mp4",
        cameraCondition: "camera_condition.mp4",
      },
    },
    {
      title: "Case 02",
      base: "assets/demos/camera/02",
      media: {
        ours: "ours.mp4",
        seedance: "seedance.mp4",
        camclone: "camclone.mp4",
        realcam: "realcam_i2v.mp4",
        gen3c: "gen3c.mp4",
        cameraCondition: "camera_condition.mp4",
      },
    },
    {
      title: "Case 03",
      base: "assets/demos/camera/03",
      media: {
        ours: "ours.mp4",
        seedance: "seedance.mp4",
        camclone: "camclone.mp4",
        realcam: "realcam_i2v.mp4",
        gen3c: "gen3c.mp4",
        cameraCondition: "camera_condition.mp4",
      },
    },
  ],
  cameraObject: [
    {
      title: "Case 01",
      base: "assets/demos/camera-object/01",
      media: {
        ours: "ours.mp4",
        pac: "pac.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
      },
    },
    {
      title: "Case 02",
      base: "assets/demos/camera-object/02",
      media: {
        ours: "ours.mp4",
        pac: "pac.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
      },
    },
    {
      title: "Case 03",
      base: "assets/demos/camera-object/03",
      media: {
        ours: "ours.mp4",
        pac: "pac.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
      },
    },
    {
      title: "Case 04",
      base: "assets/demos/camera-object/04",
      media: {
        ours: "ours.mp4",
        pac: "pac.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
      },
    },
  ],
  bokeh: [
    {
      title: "Case 01",
      base: "assets/demos/bokeh/01",
      media: {
        ours: "ours.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
        bokehCondition: "bokeh_condition.mp4",
      },
    },
    {
      title: "Case 02",
      base: "assets/demos/bokeh/02",
      media: {
        ours: "ours.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
        bokehCondition: "bokeh_condition.mp4",
      },
    },
    {
      title: "Case 03",
      base: "assets/demos/bokeh/03",
      media: {
        ours: "ours.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
        bokehCondition: "bokeh_condition.mp4",
      },
    },
  ],
  hitchcock: [
    {
      title: "Case 01",
      base: "assets/demos/hitchcock/01",
      media: {
        ours: "ours.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
      },
    },
    {
      title: "Case 02",
      base: "assets/demos/hitchcock/02",
      media: {
        ours: "ours.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
      },
    },
  ],
  human: [
    {
      title: "Case 01",
      base: "assets/demos/human/01",
      media: {
        ours: "ours.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
      },
    },
    {
      title: "Case 02",
      base: "assets/demos/human/02",
      media: {
        ours: "ours.mp4",
        cameraCondition: "camera_condition.mp4",
        bboxCondition: "bbox_condition.mp4",
      },
    },
  ],
};

const setFeaturedResult = (suite, method, syncWithThumbnail = true) => {
  const category = suite.dataset.demoCategory;
  const caseIndex = Number(suite.dataset.demoIndex || 0);
  const selectedCase = demoCases[category]?.[caseIndex];
  const filename = selectedCase?.media[method];
  const featuredVideo = suite.querySelector("[data-featured-media]");
  const selectedButton = suite.querySelector(`[data-method-select="${method}"]`);
  if (!filename || !featuredVideo || !selectedButton) return;

  suite.dataset.featuredMedia = method;
  featuredVideo.dataset.featuredMedia = method;

  suite.querySelectorAll("[data-method-select]").forEach((button) => {
    const isActive = button.dataset.methodSelect === method;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const methodLabel = suite.querySelector("[data-featured-method]");
  const methodMeta = suite.querySelector("[data-featured-meta]");
  const methodInput = suite.querySelector("[data-featured-input]");
  if (methodLabel) methodLabel.textContent = selectedButton.dataset.methodLabel;
  if (methodMeta) methodMeta.textContent = selectedButton.dataset.methodMeta;
  if (methodInput) {
    methodInput.textContent = selectedButton.dataset.methodInput || "";
    methodInput.classList.toggle("is-video-input", selectedButton.dataset.methodInput === "Original video input");
  }

  const thumbnail = selectedButton.querySelector("[data-demo-media]");
  const resumeAt = syncWithThumbnail ? thumbnail?.currentTime || 0 : 0;
  const nextSource = `${selectedCase.base}/${filename}`;

  const playFeatured = () => {
    if (resumeAt > 0 && Number.isFinite(featuredVideo.duration)) {
      featuredVideo.currentTime = Math.min(resumeAt, Math.max(0, featuredVideo.duration - 0.05));
    }
    delete featuredVideo.dataset.userPaused;
    featuredVideo.classList.remove("is-paused");
    featuredVideo.play().catch(() => {});
  };

  if (featuredVideo.getAttribute("src") !== nextSource) {
    featuredVideo.addEventListener("loadedmetadata", playFeatured, { once: true });
    featuredVideo.src = nextSource;
    featuredVideo.load();
  } else {
    playFeatured();
  }
};

const setDemoCase = (suite, index) => {
  const category = suite.dataset.demoCategory;
  const selected = demoCases[category]?.[index];
  if (!selected) return;

  suite.dataset.demoIndex = String(index);

  suite.querySelectorAll("[data-demo-case]").forEach((button) => {
    const isActive = Number(button.dataset.demoCase) === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  suite.querySelectorAll("[data-demo-case-title]").forEach((label) => {
    label.textContent = selected.title;
  });

  suite.querySelectorAll("[data-demo-reference]").forEach((image) => {
    image.src = `${selected.base}/reference.jpg`;
    image.alt = `Reference image for ${selected.title.toLowerCase()}`;
  });

  suite.querySelectorAll("[data-demo-media]").forEach((video) => {
    const filename = selected.media[video.dataset.demoMedia];
    const card = video.closest("[data-demo-card]");

    if (!filename) {
      card.hidden = true;
      video.pause();
      video.removeAttribute("src");
      video.load();
      return;
    }

    card.hidden = false;
    const nextSource = `${selected.base}/${filename}`;
    if (video.getAttribute("src") !== nextSource) {
      video.src = nextSource;
      video.load();
    }
    delete video.dataset.userPaused;
    video.classList.remove("is-paused");
    video.play().catch(() => {});
  });

  if (suite.querySelector("[data-featured-media]")) {
    const requestedMethod = suite.dataset.featuredMedia || "ours";
    const nextMethod = selected.media[requestedMethod] ? requestedMethod : "ours";
    setFeaturedResult(suite, nextMethod, false);
  }
};

document.querySelectorAll(".demo-suite[data-demo-category]").forEach((suite) => {
  suite.dataset.demoIndex = suite.dataset.demoIndex || "0";

  suite.querySelectorAll("[data-demo-case]").forEach((button) => {
    button.addEventListener("click", () => {
      setDemoCase(suite, Number(button.dataset.demoCase));
    });
  });

  suite.querySelectorAll("[data-method-select]").forEach((button) => {
    button.addEventListener("click", () => {
      setFeaturedResult(suite, button.dataset.methodSelect);
    });
  });
});

document.querySelectorAll(".demo-video").forEach((video) => {
  video.addEventListener("click", () => {
    if (video.classList.contains("result-thumb-video")) return;

    if (video.paused) {
      delete video.dataset.userPaused;
      video.classList.remove("is-paused");
      video.play().catch(() => {});
    } else {
      video.dataset.userPaused = "true";
      video.classList.add("is-paused");
      video.pause();
    }
  });
});

if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && !video.dataset.userPaused) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      });
    },
    { rootMargin: "120px 0px", threshold: 0.05 }
  );

  document.querySelectorAll(".demo-video").forEach((video) => videoObserver.observe(video));
}
