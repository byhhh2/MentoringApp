# Mentos
## Sejong Univ. Mentoring Matching Application 
### 세종대학교 멘토멘티 매칭 애플리케이션

--------------
### 개발 기술
React-Native, Redux, Socket.io

실행 방법
```
react-native run-android
```

-------------
### Mentos 기능 설명
#### 1. 세종대학교 대양휴머니티칼리지 크롤링 로그인
* 세종대학교 학생임을 인증하기 위하여 세종대학교 대양휴머니티칼리지 홈페이지를 크롤링하여 로그인
----------
#### 2. 게시물 관련 기능
* GET 
  * 인기멘토(멘토링 온도 높은 멘토). 멘토, 멘티 게시물 filtering 가능
  * 게시물 검색(Search) 가능
* POST
* DELETE
* UPDATE
----------
#### 3. 채팅 기능
* Socket.io를 이용하여 상대방과 실시간 채팅 가능
* 상대방 프로필 열람 가능
---------
#### 4. 멘토링 매칭 및 멘토링 일지 기능
* 채팅을 나눈 상대와 멘토링을 맺고 싶다면 멘토링 신청서 작성 -> 신청서 작성 완료 -> 멘토링 매칭 완료
* 멘토링 매칭이 완료되면 멘토링 일지 작성 가능
* 멘토링 기록 
  * GET
  * POST
  * UPDATE
  * DELETE
-----------
#### 5. 상대방 평가 기능
* 멘토링 기간이 지나면 상대방을 평가할 수 있음
* 평가내용은 상대방의 프로필에 있는 멘토링 온도에 반영됨 (POST)
------------
#### 6. 프로필 관련 기능
* 프로필 소개 
  * Update
  
* 멘토링 온도

* 포인트 : 멘토의 역할로 멘토링 3번 진행하면 100포인트 충전 -> 멘토 혜택

* 내 게시물 열람 가능