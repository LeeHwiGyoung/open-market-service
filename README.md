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
![image](https://github.com/user-attachments/assets/1869ea5e-ac48-4223-8966-8be1e6b07b07)
![image](https://github.com/user-attachments/assets/f839e4ec-5519-4b80-91ca-7fc865056684)
![image](https://github.com/user-attachments/assets/03040d67-a755-47ce-a6a8-0a7d8765a256)
![image](https://github.com/user-attachments/assets/309c380b-2b28-4ef8-b206-58128af5b5d2)
![image](https://github.com/user-attachments/assets/e931b766-b452-411d-a5a9-e8bc6752921c)
![image](https://github.com/user-attachments/assets/e0266b6d-0440-4c32-8e67-95a0f0578c75)
![image](https://github.com/user-attachments/assets/efd0c077-eaf9-4ef8-8ee3-345fd14cde4f)
![image](https://github.com/user-attachments/assets/05b8f7d6-6d85-4dad-a14a-4dda187a2fbf)
![image](https://github.com/user-attachments/assets/cb2c7179-a817-4d8c-9732-970ebcc1f928)
![image](https://github.com/user-attachments/assets/b959aed7-32e1-4e65-8339-ed6bdd36238a)
![image](https://github.com/user-attachments/assets/1631d8fb-2b8c-4270-92c9-f23d1410aaff)




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
  
![메인페이지](https://github.com/user-attachments/assets/a2ed5017-ecf3-4008-978b-56b5b6ee35ea)
- 로그인 페이지
  
![로그인](https://github.com/user-attachments/assets/352204dd-b25d-4a48-9e4d-79b89d106469)

- 회원 가입 페이지
  
 ![회원가입](https://github.com/user-attachments/assets/9a07f413-d14e-4c8b-817b-9201b2742199)

 - 상품 상세 페이지
   
 ![상품상세페이지](https://github.com/user-attachments/assets/f80d3465-d8cd-4100-b67b-b9a8afa9b1a5)

 - 장바구니 페이지 (로그인X)

![장바구니로그인X](https://github.com/user-attachments/assets/948925fc-25ee-4f8c-a38a-3adf0fadd161)

- 장바구니 페이지(로그인 O)
    
 ![장바구니로그인](https://github.com/user-attachments/assets/cd8d4d0d-44a3-42ae-82de-1d836cf29886)

 - 로그 아웃 기능
   
 ![로그아웃](https://github.com/user-attachments/assets/01fa7e37-632f-48ac-b858-2693dd50b919)

## 6. 에러와 에러 해결
## 7. 개발하며 느낀점

## 8. 추후 개발
 - 도전과제인 장바구니 페이지 , 결제 페이지 , 판매자 회원, 판매자 로그인 , 판매자 센터 페이지를 MPA로 완성합니다.
 - 모바일을 지원하기 위해 반응형 웹으로 리팩토링 합니다.
 - SPA로 리팩토링을 진행합니다.
  
