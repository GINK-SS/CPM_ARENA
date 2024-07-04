# 컴프매 아레나 도우미에 기여하기

어떤 것이라도 좋습니다. <br />기여하려는 마음에 깊은 감사를 드립니다.

> 이 서비스는 [IMFlow](https://github.com/iml1111/IMFlow)를 참고하여 진행하였습니다.
> <br />아래 규칙을 따라주시면 감사하겠습니다.

<br />

## 1. Issues

먼저 Issues 탭에서 이슈를 생성해주세요.

제목과 내용을 상세히 작성해주신 뒤에 라벨을 달아주세요.

### 1-1. Labels

- <span style="color:#a2eeef">Feat</span> - 새로운 기능 추가
- <span style="color:#d73a4a">Fix</span> - 새로운 기능을 추가하지 않는 버그 수정
- <span style="color:#cfd3d7">Refac</span> - 더 나은 코드 구현
- <span style="color:#0075ca">Docs</span> - 문서 변경
- <span style="color:#d876e3">Chore</span> - 그 외 모든 것

## 2. Pull Requests

PR의 제목은 다음 형식과 일치해야 합니다.

```text
[<type>-<issue-id>] <description>
```

> 모든 PR은 develop 브랜치로 squash merge하기 때문에, 커밋의 수나 스타일을 신경쓰지 않아도 됩니다.
> <br/>편하게 커밋해주세요.

### 2.1 Type

이슈 생성 시 달았던 라벨을 작성해주세요.

### 2.2 Issue-Id

생성된 이슈 번호를 작성해주세요.

### 2.3 Description

PR에 대한 간략 한글 설명를 작성해주세요.

### 2.4 Close Issue

`close #<issue-id>`를 이용하여 해당 PR을 머지함과 동시에 이슈를 종료할 수 있습니다.

내부 내용 최하단에 추가해주세요.

### 예시)

```text
# 제목
[feat-16] 선수 선택 및 팀 전력 확인 기능 구현

# 내용
.
.
.

---
- close #16
```

## 3. Convention

최대한 코드 스타일을 따라주시면 좋지만, 엄격하게 규정된 컨벤션은 존재하지 않습니다.

또한, 완벽한 것은 아니기에 더 나은 코드나 방향성이 있다면 제시해주세요.
