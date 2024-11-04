<template>
  <div class="content-container">
    <div class="content-box">
        <section>
            <div class="shell" id="shell">

                <!-- 标题 -->
                <div class="header">
                    <h2>2023年 网址大全年报</h2>
                </div>
                <div class="timeline">
                    <!-- 1 -->
                    <div class="tiem"> 
                        <div class="item">
                            <div class="content">
                                <img src="../assets/logo.png" alt="" class="img">
                                
                                <h2 class="content-title">
                                    标题
                                </h2>
                                <p class="content-desc">
                                    内容1111111111111111111111111111
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- 2 -->
                    <div class="tiem"> 
                        <div class="item">
                            <div class="content">
                                <img src="../assets/logo.png" alt="" class="img">
                                <h2 class="content-title">
                                    标题
                                </h2>
                                <p class="content-desc">
                                    内容
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- 3 -->
                    <div class="tiem"> 
                        <div class="item">
                            <div class="content">
                                <img src="../assets/logo.png" alt="" class="img">
                                <h2 class="content-title">
                                    标题
                                </h2>
                                <p class="content-desc">
                                    内容
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- 4 -->
                    <div class="tiem"> 
                        <div class="item">
                            <div class="content">
                                <img src="../assets/logo.png" alt="" class="img">
                                <h2 class="content-title"></h2>
                                <p class="content-desc"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
   <!-- <section>
		<div class="color"></div>
		<div class="color"></div>
		<div class="color"></div>
		<div class="box">
			<div class="square" style="--i:0"></div>
			<div class="square" style="--i:1"></div>
			<div class="square" style="--i:2"></div>
			<div class="square" style="--i:3"></div>
			<div class="square" style="--i:4"></div>
			<div class="container">
				<div class="form">
				</div>
			</div>
		</div>
	</section> -->
  </div>
</template>

<script>
export default {
    name: 'Content',
}
</script>


<style scoped>
    .box{
        width: 200px;
        height: 700px;
        background: #ff359b;
    }

    /* 外层样式 */
    .content-container{
        position: absolute;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.05);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content-box{
        border-radius: 10px;
        position: absolute;
        width: 50vw;
        height: 90vh;
        background-color: #00d2ff;
        overflow: scroll;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    section{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    *{
        padding: 0;
        margin: 0;
    }
    .shell{
        width: 100%;
        position: relative;
        padding: 80px 0;
        transition: 0.3s ease 0s;
        background-attachment: fixed;
        background-size: cover;
    }
    .shell :before{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(99,99,99,0.08);
        content: "";
    }
    .title{
        color: #fff;
        font-size: 46px;
        font-weight: normal;
        margin: 0;
    }
    .timeline{
        display: flex;
        margin: 0 auto;
        flex-wrap: wrap;
        flex-direction: column;
        max-width: 700px;
        position: relative;
    }
    .content-title{
        font-weight: normal;
        font-size: 66px;
        margin: -10px 0 0 0;
        transition: 0.4s;
        padding: 0 10px;
        box-sizing: border-box;
        color: #fff;
    }
    .content-desc{
        margin: 0;
        font-size: 15px;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 0.7);
        line-height: 25px;
    }
    .timeline::before{
        position: absolute;
        left: 50%;
        width: 2px;
        height: 100%;
        margin-left: -1px;
        content: "";
        background: rgba(255, 255, 255, 0.7);
    }
    .item{
        padding: 40px 0;
        opacity: 0.3;
        filter: blur(2px);
        transition: 0.5s;
        box-sizing: border-box;
        width: calc(50% -40px);
        display: flex;
        position: relative;
        transform: translateX(-80px);
    }
    .item::before{
        content: attr(data-text);
        letter-spacing: 3px;
        width: 100%;
        position: absolute;
        color: rgba(255, 255, 255, 0.5);
        font-size: 13px;
        border-left: 2px solid rgba(255, 255, 255, 0.5);
        top: 70%;
        margin-top: -5px;
        padding-left: 15px;
        opacity: 0;
        right: calc(-100% - 56px);
        font: 900 20px;
        letter-spacing: 5px;
    }
    .item:nth-child(even){
        align-self: flex-end;
    }
    .item:nth-child(even) ::before{
        right: auto;
        text-align: right;
        left: calc(-100% -56px);
        padding-left: 0;
        border-left: none;
        border-right: 2px solid rgba(255, 255, 255, 0.5);
        padding-right: 15px;
    }
    .item--active{
        opacity: 1;
        transform: translateY(0);
        filter: blur(0px);
    }
    .item--active::before{
        top: 50%;
        transition: 0.3s all 0.2s;
        opacity: 1;
    }
    .item--active .content-title{
        margin: -50px 0 20px 0;
    }
    .img{
        max-width: 100%;
        box-shadow: 0 10px 15px rgba(0,0,0,0.4);
    }
    .subtitle{
        color: rgba(255, 255, 255, 0.5);
        font-size: 16px;
        letter-spacing: 5px;
        margin: 10px 0 0 0;
        font-weight: normal;
    }
    .footer{
        padding: 95px 0;
        text-align: center;
    }
    .footer a{
        color: #999;
        display: inline-block;
    }
    @media only screen and (max-width: 767px){
        .item{
            align-self: baseline !important;
            width: 100%;
            padding: 0 30px 150px 80px;
        }
        .item::before{

        }
    }

    





    /* 老的样式 */
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }
    body
    {
        overflow: hidden;
    }
    section
    {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(to bottom,#f1f4f9,#dff1ff);
        background-size: cover;
        background-position: center;
    }
    .color
    {
        position: absolute;
        filter: blur(150px);
    }
    .color:nth-child(1)
    {
        top: -350px;
        background: #ff359b;
        width: 600px;
        height: 600px;
    }
    .color:nth-child(2)
    {
        bottom: -150px;
        left: 100px;
        background: #fffd87;
        width: 500px;
        height: 500px;
    }
    .color:nth-child(3)
    {
        bottom: 50px;
        right: 0;
        background: #00d2ff;
        width: 300px;
        height: 300px;
    }
    .box
    {
        position: relative;
    }
    .container
    {
        position: relative;
        width: 400px;
        min-height: 400px;
        background: #000;
        border-radius: 10px;
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(255,255,255,0.5);
        border-right: 1px solid rgba(255,255,255,0.2);
        border-bottom: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    }
    .square
    {
        content: '';
        position: absolute;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.5);
        border-right: 1px solid rgba(255,255,255,0.2);
        border-bottom: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 25px 45px rgba(0,0,0,0.1);
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(5px);
        animation: animate 10s linear infinite;
        animation-delay: calc(-1s * var(--i));
    }
    .square:nth-child(1)
    {
        top: -50px;
        right: -60px;
        width: 100px;
        height: 100px;
    }
    .square:nth-child(2)
    {
        top: 150px;
        left: -100px;
        width: 120px;
        height: 120px;
        z-index: 2;
    }
    .square:nth-child(3)
    {
        bottom: 50px;
        right: -60px;
        width: 80px;
        height: 80px;
        z-index: 2;
    }
    .square:nth-child(4)
    {
        bottom: -80px;
        left: 100px;
        width: 50px;
        height: 50px;
    }
    .square:nth-child(5)
    {
        top: -80px;
        left: 140px;
        width: 60px;
        height: 60px;
        z-index: 2;
    }
    @keyframes animate
    {
        0%,100%
        {
            transform: translateY(-40px);
        }
        50%
        {
            transform: translateY(40px);
        }
    }
    .form
    {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 40px;
        box-sizing: border-box;
    }
    .form h2
    {
        position: relative;	
        margin: 0;
        padding: 0;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: 40px;
    }
    .form h2:before
    {
        content: '';
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 80px;
        height: 4px;
        background: #fff;
    }
    .inputBox
    {
        width: 100%;
        margin-top: 20px;
    }
    .inputBox input
    {
        width: 100%;
        background: transparent;
        border: none;
        padding: 10px 20px;
        border-radius: 35px;
        background: rgba(255,255,255,0.2);
        border-top: 1px solid rgba(255,255,255,0.5);
        border-left: 1px solid rgba(255,255,255,0.5);
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        outline: none;
        font-size: 16px;
        letter-spacing: 1px;
        color: #fff;
    }
    ::placeholder
    {
        color: #fff;
    }
    .inputBox input[type="submit"]
    {
        background: #fff;
        color: #666;
        border: none;
        font-weight: 600;
        max-width: 100px;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .forget
    {
        margin-top: 5px;
        color: #fff;
        padding: 2px;
    }
    .forget a
    {
        color: #fff;
        font-weight: 600;
    }
</style>