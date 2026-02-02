# <img src="assets/Rinko.png" width="45" align="center" /> 용사의 그림 요청 사이트 <img src="assets/Mantaro.png" width="42" align="center" />

HTML + CSS + JavaScript 기반으로 제작한  
그림 요청 전송용 웹 페이지입니다.

EmailJS와 Vercel Serverless Function을 이용해,
API 키를 외부에 노출하지 않고 메일을 보낼 수 있도록 구성했습니다.

핑크 톤 UI와 카드형 레이아웃으로  
부드럽고 직관적인 요청 폼을 목표로 제작했습니다.

---

## 🌐 배포 주소

Vercel을 통해 배포되었습니다.

👉 https://request-site-lime.vercel.app/

---

## ✨ 주요 기능

### 메일 전송

- 제목 / 내용 입력 후 이메일 전송
- 전송 성공 / 실패 모달 알림
- 전송 중 버튼 비활성화 처리

### 보안

- EmailJS Private Key 서버 사이드 처리
- Vercel Environment Variables 사용
- 브라우저 Network 탭에서 키 노출 없음

### UX

- 체크박스 동의 후 전송 가능
- 전송 완료 모달 표시
- 반응형 카드 UI

---

## 🛠 사용 기술

- HTML
- CSS
- Vanilla JavaScript
- EmailJS
- Vercel (Serverless Function + Environment Variables)

---

## 📂 프로젝트 구조

```
request-site/
├─ api/
│ └─ send.js # 메일 전송 서버리스 함수
├─ public/
│ └─ assets/
├─ index.html
├─ style.css
├─ script.js
├─ package.json
└─ README.md
```

---

## 🚀 실행 방법 (로컬)

npm install
vercel dev
브라우저 접속:

http://localhost:3000

🔐 환경 변수
Vercel Environment Variables 사용:

EMAILJS_SERVICE_ID
EMAILJS_TEMPLATE_ID
EMAILJS_PUBLIC_KEY
EMAILJS_PRIVATE_KEY
Private Key는 서버에서만 사용되며
클라이언트에는 노출되지 않습니다.

🎨 UI 컨셉
카드형 요청 폼

핑크 톤 그라데이션

큰 버튼 중심 인터페이스

모달 기반 피드백

📌 앞으로 추가해보고 싶은 기능

스팸 방지 (rate limit / honeypot)

첨부파일 업로드

요청 내역 관리자 페이지

애니메이션 효과 강화

🙋‍♀️ 제작자
GitHub: https://github.com/sungminjung066-lang
