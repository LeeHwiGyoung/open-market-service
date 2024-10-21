# 호두샵
## 1.목표와 기능

### 1.1목표
- 유저를 판매자와 구매자로 구분하여 상품을 판매,구매하는 서비스
- 바닐라 자바스크립트 멀티 페이지 어플리케이션 프로젝트
### 1.2 기능
- 완료된 기능
    - 메인 페이지 
    - 로그인 페이지
    - 회원가입 페이지
    - 상품 상세 페이지
    - 404 페이지
- 개발중인 기능
    - 장바구니 페이지
- 개발 예정 기능 
    - 판매자 페이지
    - 판매자 상품 등록 페이지
    - 판매자 센터 페이지
    - 주문 결제 페이지
    - 판매자 회원가입 기능
    - 판매자 로그인 기능

### 1.3 팀 구성
- 이휘경

## 2.기술 스택 및 배포
### 2.1 기술 스택 
<img src="https://img.shields.io/badge/javascript-yellow?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/HTML5-red?style=for-the-badge&logo=HTML5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=CSS3&logoColor=white">
<img src="https://img.shields.io/badge/sass-hotpink?style=for-the-badge&logo=sass&logoColor=white">

### 2.2 배포 환경 및 배포 URL
- 서비스 배포 환경
    - github pages
- 배포 URL
    - https://leehwigyoung.github.io/open-market-service/

### 2.3 URL 구조
- main
    |URL|HTML FILE NAME | NOTE|
    |---|---|---|
    |'/'|docs/index.html| 홈 화면|
- login
    |URL|HTML FILE NAME | NOTE|
    |---|---|---|
    |'/login'|docs/login.html| 로그인 화면|
- join
    |URL|HTML FILE NAME | NOTE|
    |---|---|---|
    |'/join'|docs/join.html| 회원가입 화면|
- detailProduct
    |URL|HTML FILE NAME | NOTE|
    |---|---|---|
    |'/detail?id=product_id'|docs/detail.html| 상품 상세 화면|
- shoppingcart
    |URL|HTML FILE NAME | NOTE|
    |---|---|---|
    |'/shoppingcart'|docs/shoppingcart.html| 장바구니 화면|

## 3 요구사항 명세
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)
![alt text](image-6.png)
![alt text](image-7.png)
![alt text](image-8.png)
![alt text](image-9.png)
![alt text](image-10.png)
## 4 프로젝트 구조

### 4.1 프로젝트 구조

docs<br>
┣ 📂assets<br>
┃ 📂js<br>
┃ ┣ 📜about404.js<br>
┃ ┣ 📜auth.js<br>
┃ ┣ 📜details.js<br>
┃ ┣ 📜header.js<br>
┃ ┣ 📜home.js<br>
┃ ┣ 📜image_slider.js<br>
┃ ┣ 📜join.js<br>
┃ ┣ 📜login.js<br>
┃ ┣ 📜modal.js<br>
┃ ┣ 📜shoppingcart_list.js<br>
┃ ┣ 📜shoppingcart_utils.js<br>
┃ ┣ 📜shoppingcart.js<br>
┃ 📂css<br>
┃ ┣ 📜about404.css<br>
┃ ┣ 📜detail.css<br>
┃ ┣ 📜home.css<br>
┃ ┣ 📜join.css<br>
┃ ┣ 📜login.css<br>
┃ ┣ 📜modal.css<br>
┃ ┣ 📜reset.css<br>
┃ ┣ 📜shoppingcart.css<br>
┣ 📜404.html<br>
┣ 📜detail.html<br>
┣ 📜index.html<br>
┣ 📜join.html<br>
┣ 📜login.html<br>
┣ 📜shoppingcart.html<br>
┃  📜README.md<br>
┃  📜requirement.pdf<br>
┃  📜requirement.hwpx<br>
## 5. 화면 구성
 - 메인 페이지
![alt text](메인페이지.gif)
 - 로그인 페이지
![alt text](로그인.gif)
 - 회원 가입 페이지
![alt text](회원가입.gif)
 - 상품 상세 페이지
![alt text](상품상세페이지.gif)
 - 장바구니 페이지

    -로그인 x

    ![alt text](장바구니로그인X.gif)
 
    -로그인 o

    ![alt text](장바구니로그인.gif)

 - 로그 아웃 기능
 ![alt text](로그아웃.gif)
## 6. 에러와 에러 해결
## 7. 개발하며 느낀점

## 8. 추후 개발
 - 도전과제인 장바구니 페이지 , 결제 페이지 , 판매자 회원, 판매자 로그인 , 판매자 센터 페이지를 MPA로 완성합니다.
 - 모바일을 지원하기 위해 반응형 웹으로 리팩토링 합니다.
 - SPA로 리팩토링을 진행합니다.
  
