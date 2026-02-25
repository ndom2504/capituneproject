const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
const profileToggle = document.getElementById('profileToggle');
const profileMenu = document.getElementById('profileMenu');
const saveProfile = document.getElementById('saveProfile');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');

function setActiveTab(tabName) {
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabName);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    setActiveTab(tab.dataset.tab);
  });
});

profileToggle.addEventListener('click', () => {
  const isHidden = profileMenu.hasAttribute('hidden');
  if (isHidden) {
    profileMenu.removeAttribute('hidden');
  } else {
    profileMenu.setAttribute('hidden', '');
  }
  profileToggle.setAttribute('aria-expanded', String(isHidden));
});

document.addEventListener('click', (event) => {
  if (!profileMenu.contains(event.target) && !profileToggle.contains(event.target)) {
    profileMenu.setAttribute('hidden', '');
    profileToggle.setAttribute('aria-expanded', 'false');
  }
});

saveProfile.addEventListener('click', () => {
  const profileName = nameInput.value.trim();
  const profileEmail = emailInput.value.trim();

  const nameNode = profileToggle.querySelector('strong');
  const emailNode = profileToggle.querySelector('span');

  nameNode.textContent = profileName || 'Client';
  emailNode.textContent = profileEmail || 'email@capitune.com';

  profileMenu.setAttribute('hidden', '');
  profileToggle.setAttribute('aria-expanded', 'false');
});

avatarInput.addEventListener('change', () => {
  const [file] = avatarInput.files;
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreview.src = e.target.result;
  };
  reader.readAsDataURL(file);
});
