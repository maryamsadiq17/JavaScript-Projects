// Global State Management Object
const state = {
  stories: [],
  currentStoryIndex: 0,
  progressIntervalId: null,
  progressPercent: 0,
  storyDurationMs: 5000, // 5 seconds per story run
  touchStartX: 0,
  touchEndX: 0
};

// DOM Cache Elements
const fileInput = document.getElementById('fileInput');
const addStoryBtn = document.getElementById('addStoryBtn');
const dynamicStories = document.getElementById('dynamicStories');
const storyViewer = document.getElementById('storyViewer');
const closeViewerBtn = document.getElementById('closeViewerBtn');
const viewerImage = document.getElementById('viewerImage');
const progressContainer = document.getElementById('progressContainer');
const leftTap = document.getElementById('leftTap');
const rightTap = document.getElementById('rightTap');

/* --- Initialization --- */
document.addEventListener('DOMContentLoaded', () => {
  loadAndCleanStories();
  setupEventListeners();
});

function setupEventListeners() {
  // Trigger file manager on wrapper click
  addStoryBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleImageUpload);
  
  // Viewer Navigation Controls
  leftTap.addEventListener('click', showPreviousStory);
  rightTap.addEventListener('click', showNextStory);
  closeViewerBtn.addEventListener('click', closeStoryViewer);
  
  // Mobile Swiping Handlers
  storyViewer.addEventListener('touchstart', e => {
    state.touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  storyViewer.addEventListener('touchend', e => {
    state.touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  }, { passive: true });
}

/* --- Storage Mechanics & Upload Handling --- */
function loadAndCleanStories() {
  const stored = localStorage.getItem('ig_stories');
  if (stored) {
    try {
      const rawStories = JSON.parse(stored);
      const now = Date.now();
      // Drop any item that has outlived its expiration timestamp
      state.stories = rawStories.filter(story => now < story.expiresAt);
      
      // Update store with unexpired remaining items
      localStorage.setItem('ig_stories', JSON.stringify(state.stories));
    } catch (e) {
      state.stories = [];
    }
  }
  renderTrayThumbnails();
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // Apply aspect-ratio and size safety optimizations via Canvas
      const optimizedBase64 = resizeImageToMaxBounds(img, 1080, 1920);
      
      const newStory = {
        id: 'story_' + Date.now(),
        imageBase64: optimizedBase64,
        createdAt: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // Exactly 24 Hours later
      };

      state.stories.push(newStory);
      localStorage.setItem('ig_stories', JSON.stringify(state.stories));
      
      renderTrayThumbnails();
      fileInput.value = ''; // Reset file input string descriptor
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Canvas downscaling to stay within localStorage constraints
function resizeImageToMaxBounds(img, maxWidth, maxHeight) {
  const canvas = document.createElement('canvas');
  let width = img.width;
  let height = img.height;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = width * ratio;
    height = height * ratio;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.85); // 85% compression quality balanced lookup
}

/* --- UI Rendering Functions --- */
function renderTrayThumbnails() {
  dynamicStories.innerHTML = '';
  
  state.stories.forEach((story, index) => {
    const item = document.createElement('div');
    item.className = 'story-item';
    item.onclick = () => openStoryViewer(index);
    
    item.innerHTML = `
      <div class="thumb-wrapper">
        <img src="${story.imageBase64}" alt="User content thumbnail">
      </div>
      <span class="story-username">User_${story.id.slice(-4)}</span>
    `;
    dynamicStories.appendChild(item);
  });
}

function buildProgressBars() {
  progressContainer.innerHTML = '';
  state.stories.forEach((_, index) => {
    const track = document.createElement('div');
    track.className = 'progress-track';
    
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.id = `fill-${index}`;
    
    // Set static width if story index state is below or above active item
    if (index < state.currentStoryIndex) {
      fill.style.width = '100%';
    }
    
    track.appendChild(fill);
    progressContainer.appendChild(track);
  });
}

/* --- Viewer Engine Playback Control --- */
function openStoryViewer(startIndex) {
  if (state.stories.length === 0) return;
  state.currentStoryIndex = startIndex;
  storyViewer.classList.add('active');
  displayCurrentStory();
}

function displayCurrentStory() {
  clearInterval(state.progressIntervalId);
  state.progressPercent = 0;
  
  const story = state.stories[state.currentStoryIndex];
  viewerImage.src = story.imageBase64;
  
  buildProgressBars();
  startProgressTracker();
}

function startProgressTracker() {
  const stepTimeMs = 30; // Frequency step tick
  const incrementValue = (stepTimeMs / state.storyDurationMs) * 100;
  const activeFillElement = document.getElementById(`fill-${state.currentStoryIndex}`);
  
  state.progressIntervalId = setInterval(() => {
    state.progressPercent += incrementValue;
    
    if (activeFillElement) {
      activeFillElement.style.width = `${Math.min(state.progressPercent, 100)}%`;
    }

    if (state.progressPercent >= 100) {
      clearInterval(state.progressIntervalId);
      showNextStory();
    }
  }, stepTimeMs);
}

/* --- Interactive Navigation Handlers --- */
function showNextStory() {
  if (state.currentStoryIndex < state.stories.length - 1) {
    state.currentStoryIndex++;
    displayCurrentStory();
  } else {
    closeStoryViewer();
  }
}

function showPreviousStory() {
  if (state.currentStoryIndex > 0) {
    state.currentStoryIndex--;
    displayCurrentStory();
  } else {
    // If first item clicked, rerun it from 0%
    displayCurrentStory();
  }
}

function closeStoryViewer() {
  clearInterval(state.progressIntervalId);
  storyViewer.classList.remove('active');
  viewerImage.src = '';
}

function handleSwipeGesture() {
  const threshold = 50;
  const diffX = state.touchEndX - state.touchStartX;
  
  if (Math.abs(diffX) > threshold) {
    if (diffX < 0) {
      showNextStory(); // Swiped left
    } else {
      showPreviousStory(); // Swiped right
    }
  }
}