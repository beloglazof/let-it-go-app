const SOUND_SETTING_KEY = "withSound";
const storedSoundSetting = localStorage.getItem(SOUND_SETTING_KEY);
const soundCheckbox = document.getElementById("sound-checkbox");
soundCheckbox.checked = storedSoundSetting
  ? storedSoundSetting === "true"
  : true;
soundCheckbox.addEventListener("change", (event) => {
  localStorage.setItem(SOUND_SETTING_KEY, `${event.target.checked}`);
});

const HAPTIC_FEEDBACK_SETTING_KEY = "withHapticFeedback";
const storedHapticFeedbackSetting = localStorage.getItem(
  HAPTIC_FEEDBACK_SETTING_KEY,
);
const hapticFeedbackCheckbox = document.getElementById(
  "haptic-feedback-checkbox",
);
hapticFeedbackCheckbox.checked = storedHapticFeedbackSetting
  ? storedHapticFeedbackSetting === "true"
  : true;
hapticFeedbackCheckbox.addEventListener("change", (event) => {
  localStorage.setItem(HAPTIC_FEEDBACK_SETTING_KEY, `${event.target.checked}`);
});
