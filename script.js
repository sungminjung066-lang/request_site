// 너의 이메일로 바꿔줘!
const TO_EMAIL = "mary2000316@naver.com";

const form = document.getElementById("msgForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = `[그림 리퀘스트] ${title}`;

  const body = `
[제목]
${title}

[신청내용]
${message}

(이 메일은 웹사이트 폼에서 작성되었습니다.)
  `.trim();

  const mailtoUrl =
    `mailto:${encodeURIComponent(TO_EMAIL)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
});
