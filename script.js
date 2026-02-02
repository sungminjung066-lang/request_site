// 요소
const form = document.getElementById("msgForm");
const sendBtn = document.getElementById("sendBtn");
const modal = document.getElementById("doneModal");
const closeModalBtn = document.getElementById("closeModalBtn");

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
// ✅ 키(EmailJS public key/service/template)는 프론트에 두지 않습니다.
// ✅ /api/send(서버리스 함수)로 보내고, 서버에서 EmailJS REST API를 호출합니다.
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // HTML input/textarea의 name을 그대로 서버에 전달 (현재는 title, message)
  const payload = Object.fromEntries(new FormData(form).entries());

  // 버튼 잠금/로딩
  sendBtn.disabled = true;
  const prevText = sendBtn.textContent;
  sendBtn.textContent = "전송 중…";

  try {
    const r = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      // 디버깅용 (운영에서는 콘솔만 확인하면 됨)
      const data = await r.json().catch(() => ({}));
      console.error("Send failed:", r.status, data);
      throw new Error("SEND_FAILED");
    }

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
