// ✅ EmailJS 설정값
const EMAILJS_PUBLIC_KEY = "***REMOVED***";
const EMAILJS_SERVICE_ID = "***REMOVED***";
const EMAILJS_TEMPLATE_ID = "***REMOVED***";

// 요소
const form = document.getElementById("msgForm");
const sendBtn = document.getElementById("sendBtn");
const modal = document.getElementById("doneModal");
const closeModalBtn = document.getElementById("closeModalBtn");

// EmailJS 초기화
emailjs.init(EMAILJS_PUBLIC_KEY);

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  closeModalBtn.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  sendBtn.focus();
}

// 모달 닫기 이벤트
closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

// 폼 전송
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const message = document.getElementById("message").value.trim();

  // 버튼 잠금/로딩
  sendBtn.disabled = true;
  const prevText = sendBtn.textContent;
  sendBtn.textContent = "전송 중…";

  try {
    // 템플릿 변수는 EmailJS 템플릿에 맞춰야 함
    // 너가 만든 템플릿에서 {{title}}, {{message}}를 쓰고 있으니 그대로 보냄
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      title,
      message,
    });

    // 성공: 폼 초기화 + 모달
    form.reset();
    openModal();
  } catch (err) {
    console.error(err);
    alert("전송에 실패했어요. 잠시 후 다시 시도해주세요!");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = prevText;
  }
});
