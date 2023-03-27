$(function(){


  ScrollTrigger.matchMedia({
 
  "(min-width: 1025px)": function() {

  },

  "(min-width: 768px) and (max-width: 1024px)": function() {
    

    /**
     * //parallax-img animation
     */
    const imgEl = document.querySelectorAll('.sub-content .img-box img')
    imgEl.forEach(element => {

      gsap.set(element,{yPercent:-100})
      gsap.to(element,{
        scrollTrigger:{
          trigger:element.parentElement,
          start:"0% 80%",
          end:"0% 80%",
          // markers:true,
        },
        stagger: 0.5,
        // delay:0.5,
        yPercent:0
      })
    });
  
  },

  "(max-width: 767px)": function() {
		
  },

  "all": function() {

    
    /**
     * header menu animation
     */
    gsap.set('.header .gnb .txt-oh',{yPercent:100})
    menuMotion = gsap.timeline({
      paused:true,
    })
    menuMotion
    .set('.header .group-menu',{ 'visibility': 'visible'})
    .set('.header .info',{ opacity:0,yPercent:10})

    .addLabel('f')
    .to('.group-menu .menu-bg',{height:'100%'},'f')
    .to('.header .gnb .txt-oh',{yPercent:0},'f')
    .to('.header .info',{ opacity:1,yPercent:0},'f')


    /**
     * header menu
     */

    $('.header .btn-menu').click(function(e){
        e.preventDefault();

        $('body').toggleClass('notScroll')
        
        if ($('.header .group-menu').hasClass('on')) { 

          menuMotion.reverse()
          $('.header .group-menu').removeClass('on')
          $('header').removeClass('on')

        }else{

          menuMotion.restart()
        $('.header .group-menu').addClass('on')
        $('header').addClass('on')

        }
    })

    $('.gnb .gnb-item').hover(function(){

      $(this).siblings('li').css('opacity','0.1')
      },function(){
      $(this).siblings('li').css('opacity','1')
      
    })


    /**
     * menu 앵커이동
     */
    $('.gnb .gnb-item a').click(function(e){
      e.preventDefault();
      link=$(this).data('target');
      window.open(`https://portfoliopr.github.io/portfolio/?section=${link}`,'_self');
    })


    /**
     * body theme mode
     */
    theme = gsap.timeline({
    scrollTrigger:{
        trigger:".theme",
        start:"-20% 50%",
        end:"-10% 50%",
        // markers:true,
        scrub:0,
    },
    })

    theme
    .addLabel('a')
    .to('body',{ background:'#000',color:'#fff'},'a')


    /**
     * //txt-oh animation
    */

    let visual = gsap.timeline()

    visual
    .set('.txt-oh .txt',{
      yPercent: 100,
      clipPath: "polygon(0 0,100% 0,100% 0,0 50%)"
    })

    .to('.dimd',{yPercent:'-100'})
    .to('.txt-oh .txt',{
      ease:'none',
      delay:0.3,
      yPercent: 0,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    })


    
    /**
     * footer
     */
    gsap.set('.footer.sub .inner',{ opacity:0,yPercent:-50})
    scrollMove = gsap.timeline({
      scrollTrigger:{
          trigger:".footer.sub",
          start:"0% 100%",
          end:"0% 30%",
          // markers:true,
          scrub:0.3,
        },
    })

    scrollMove
    .to('.footer.sub .inner',{ opacity:1,yPercent:0})

    /**
     * footer hover
     */
    $('.footer .contact').hover(function(){

        $('.footer .arrow').addClass('on')
        },function(){
        $('.footer .arrow').removeClass('on')
    })
	
  }
  
  });







})