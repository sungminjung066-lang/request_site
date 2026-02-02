# 용사의 리퀘스트 요청 사이트

주의사항 박스 + 리퀘스트 폼(메일 전송)

## 키 노출 방지(중요)

브라우저에서 EmailJS SDK를 직접 호출하면 `public key/service id/template id`가 그대로 노출될 수 있어,
`/api/send`(서버리스 함수)에서 EmailJS REST API를 호출하는 방식으로 변경했습니다.

### 배포(Vercel 기준)

1. 이 저장소를 Vercel에 배포
2. Vercel 프로젝트 Settings → Environment Variables에 아래 값을 추가

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

(선택) 내 사이트에서만 호출되게 하려면

- `ALLOWED_ORIGIN` = `https://내-도메인`

3. 배포 후, 페이지에서 폼을 제출하면 `/api/send`를 통해 메일이 전송됩니다.

### 이미 키가 공개된 적이 있다면

기존 키/ID는 악용될 수 있으니 EmailJS에서 **새로 발급(교체)** 한 뒤,
새 키를 위 환경변수에 넣어주세요.
